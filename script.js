const CONFIG_API = {
  url: 'https://sb-cats.herokuapp.com/api/2/turell7',
  headers: {
    "Content-type": 'application/json'
  }
}

const $wr = document.querySelector("[data-wr]");
const $openModalBtn = document.querySelector(`[data-open_modal]`);
const $modalsWr = document.querySelector('[data-modals_wr]');

$wr.innerHTML = "";

const generateCardHTML = (el) => {
  return `
  <div data-card_id="${el.id}" class="card mx-3 my-3" style="width: 18rem;">
    <div class="scale">
      <img data-action="show" src="${el.img_link}" class="cat_img card-img-top" alt="${el.name}">
    </div>
    <div class="card-body">
        <h5 class="card-title">${el.name}</h5>
        <p class="card-text">Возраст: ${el.age}</p>
        <button data-action="delete" class="btn btn-danger">
            X
            <i data-action="delete" class="fa-solid fa-cat"></i>
        </button>            
    </div>
  </div>
  `
}

class Api {
  constructor(config) {
    this.url = config.url;
    this.headers = config.headers;
  }

  async getAllCats() {
    const response = await fetch(`${this.url}/show`)
    
    return response.json();
  }

  getAllCatsIds() {
    fetch(`${this.url}/ids`);
  }

  getCatById(id) {
    fetch(`${this.url}/show/${id}`);
  }

  async createCat(cat) {
    try {
      const response = await fetch(`${this.url}/add`, {
        method: "POST",
        headers: this.headers,
        body: JSON.stringify(cat),
      });
      // Добавить отработку ошибки по сообщению с бека (2:41:20)
    } catch (Error) {
      throw new Error(Error);
    }
  }

  updateCat(id, updateCat) {
    fetch(`${this.url}/update/${id}`, {
      method: "PUT",
      headers: this.headers,
      body: JSON.stringify(updateCat),
      });    
  }

  async deleteCat(id) {
    try {
      const response = await fetch(`${this.url}/delete/${id}`, {
        method: "DELETE", 
      });
      if (response.status !== 200) {
        throw new Error(Error)
      }
    } catch (Error) {
      throw new Error(Error)
    } 
  }
}

const api = new Api(CONFIG_API);

api.getAllCats().then((responseFromBackend) => {
  responseFromBackend.data.forEach((cat) => $wr.insertAdjacentHTML('beforeend', generateCardHTML(cat)))
})

$wr.addEventListener('click', (event) => {
  switch (event.target.dataset.action) {
    case 'delete': {
      const $cardWr = event.target.closest('[data-card_id');
      const catId = $cardWr.dataset.card_id;
      api.deleteCat(catId).then(() => {
        $cardWr.remove()
      }).catch(alert)
      break
    }
    default:

      break
  }
})

document.forms.add_cat.addEventListener('submit', (event) => {
  event.preventDefault();

  const data = Object.fromEntries(new FormData(event.target).entries())

  data.id = +data.id;
  data.rate = +data.rate;
  data.favourite = data.favourite === 'on';

  api.createCat(data).then(() => {
    $wr.insertAdjacentHTML('beforeend', generateCardHTML(data))
    $modalsWr.classList.add('hidden');
    event.target.reset();
  }).catch(alert);
  console.log(data);
})

$openModalBtn.addEventListener('click', () => {
  $modalsWr.classList.remove('hidden');
  console.log($openModalBtn);
})