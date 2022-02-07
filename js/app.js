const searcForm = document.querySelector('form.search');
const items = document.querySelector('.row');

const APP_id = '906e5225';
const API_key = 'f4c65a1aa39943bef1daade8c18841b7';


const getResult = async query => {
    const baseURL = `https://api.edamam.com/search?q=${query}&app_id=${APP_id}&app_key=${API_key}`;
    const response = await fetch(baseURL);
    const data = await response.json();
    passToHTML(data.hits);
};

const passToHTML = data => {
    let html = '';
    data.forEach(data => {
        html += 
        `
        <div class="col-md-3 pt-2 items">
                <div class="item">
                    <img src="${data.recipe.image}" alt="">
                </div>
                <div class="item-content">
                    <h4>${data.recipe.label}</h4>
                </div>
                <p><b>Source: </b>${data.recipe.source} <br> <b>Weight: </b>${Math.round(data.recipe.totalWeight)}</p>
            </div>
        `;
        items.innerHTML = html; 
    });
}

searcForm.addEventListener('submit', e => {
    e.preventDefault();

    const query = searcForm.query.value.trim();
    getResult(query);
    searcForm.reset();
});