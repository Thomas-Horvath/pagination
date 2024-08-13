const component = document.querySelector(".component");
const selector = document.getElementById("selector");




const state = {
    selectedPageIndex: 0,
    products: [],
    slicedProducts: [],
    itemsPerPage: 10,
};



function navigate(selectedPageIndex) {
    state.selectedPageIndex = selectedPageIndex;
    const start = state.itemsPerPage * selectedPageIndex;
    const end = start + state.itemsPerPage;
    state.slicedProducts = state.products.slice(start, end);
    render();
};




function render() {
    const numberOfPages = Math.ceil(state.products.length / state.itemsPerPage);

    let indexes = [];

    for (let i = 0; i < numberOfPages; i++) {
        indexes.push(i)
    }

    const buttons = indexes.map((num, i) => `
    <li class="page-item ${state.selectedPageIndex === i ? "active" : ""}" )"  id="page-${num}">
        <span class="page-link">${num + 1}</span>
    </li>`
    ).join("");

    component.innerHTML = `
        <nav>
            <ul class="pagination">
            ${buttons}</ul>
        </nav>

  
        <div class="card-container" >
            ${state.slicedProducts.map(product => `
        <div class="card">
            <img src="${product.ProductPhotoURL}" alt="kép"/>
            <p>${product.BrandName}</p>
            <h2>${product.Name}</h2>
            <p>${product.Price} FT</p>
            </div>`).join("")}
        </div>`;


    indexes.forEach(num => {
        const pageButton = document.getElementById(`page-${num}`);
        pageButton.addEventListener('click', () => navigate(num));
    });
};



window.onload = async () => {
    const res = await fetch("https://thomasapi.eu/api/products");
    const data = await res.json();
    state.products = data;
    state.slicedProducts = state.products.slice(0, state.itemsPerPage);
    render()
};

selector.addEventListener("change", function () {
    const selectedValue = selector.value; // A kiválasztott érték lekérdezése
    state.itemsPerPage = Number(selectedValue);
    state.slicedProducts = state.products.slice(0, state.itemsPerPage);
    render();
});