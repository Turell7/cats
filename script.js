const CONFIG_API = {
  url: 'https://sb-cats.herokuapp.com/api/2/turell7',
  headers: {
    "Content-type": 'application/json'
  }
}

const $wr = document.querySelector('[data-wr]');
const $openModalBtn = document.querySelector('[data-open_modal]');
const $modalsWr = document.querySelector('[data-modals_wr]');

const $openModalCat = document.querySelector('[data-open_modal-cat]');
const $modalsCat = document.querySelector('[data-modals_cat]');

const $modalCat = document.querySelector('[data-modals_cat-wr]');

$wr.innerHTML = "";
$modalCat.innerHTML = "";

const generateCardsHTML = (el) => {
  return `
  <div data-card_id="${el.id}" class="card mx-3 my-3" style="width: 18rem;">
    <div class="scale">
      <img data-open_modal-cat data-action="show" src="${el.img_link}" class="cat_img card-img-top" alt="${el.name}">
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

const generateCardHTML = (el) => {
  return `
    <div class="card mb-3"style="width: 28rem;">
      <img class="card-img-top" src="${el.img_link}" alt="Card image cap">
      <div data-info-cat class="card-body">
        <h5 class="card-title">${el.name}</h5>
        <p class="card-text">${el.description}</p>
        <p class="card-text">Age: ${el.age}</p>
        <p class="card-text">Rate: ${el.rate}</p>
        <p class="card-text">Like: ${el.favourite}</p>
        
        <button data-action="change" class="btn btn-warning">
            Change
            <i data-action="change" class="fa-solid fa-cat"></i>
        </button>
      </div>
      <form data-form_change-cat name="change_cat" class="hidden">
      <div class="mb-3">
          <input
          placeholder="Id"
          name="id"
          type="text"
          class="form-control"
          required
          value="${el.id}"
          readonly
          >
        </div>
        <div class="mb-3">
          <input
          placeholder="New Name"
          name="name"
          type="text"
          class="form-control"
          required
          value="${el.name}"
          >
        </div>
        <div class="mb-3">
          <input
          placeholder="New Rate"
          name="rate"
          type="number"
          class="form-control"
          min="0"
          max="10"
          value="${el.rate}"
          >
        </div>
        <div class="mb-3">
          <input
          placeholder="New Age"
          name="age"
          type="number"
          class="form-control"
          min="0"
          value="${el.age}"
          >
        </div>
        <div class="mb-3 form-check">
          <input
          class="form-check-input"
          type="checkbox"
          name="favourite"
          id="flexRadioDefault1">
          <label
            class="form-check-label"
            for="flexRadioDefault1"
            >favorite</label>
        </div>
        <div class="mb-3">
          <input
          placeholder="New Pic link"
          name="img_link"
          type="text"
          class="form-control"
          value="${el.img_link}"
          >
        </div>
        <div class="mb-3">
          <textarea
            placeholder="New Description"
            name="description"
            type="text"
            class="form-control"
            value="${el.description}"
          ></textarea>
          
        </div>
        <button data-action="update" class="btn btn-success">Update</button>
      </form>
    </div>
  `
}
class Api {
  constructor(config) {
    this.url = config.url;
    this.headers = config.headers;
  }

  async getAllCats() {
    const response = await fetch(`${this.url}/show`);
    
    return response.json();
  }

  getAllCatsIds() {
    fetch(`${this.url}/ids`);
  }

  async getCatById(id) {
    const response = await fetch(`${this.url}/show/${id}`);

      return response.json();
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

  async updateCat(id, updateCat) {
    try {
      const response = await fetch(`${this.url}/update/${id}`, {
        method: "PUT",
        headers: this.headers,
        body: JSON.stringify(updateCat),
      });  
    } catch (Error) {
      throw new Error(Error);
    }
  }

  async deleteCat(id) {
    try {
      const response = await fetch(`${this.url}/delete/${id}`, {
        method: "DELETE", 
      });
      if (response.status !== 200) {
        throw new Error(Error);
      }
    } catch (Error) {
      throw new Error(Error);
    } 
  }
}

const api = new Api(CONFIG_API);

api.getAllCats().then((responseFromBackend) => {
  responseFromBackend.data.forEach((cat) => $wr.insertAdjacentHTML('beforeend', generateCardsHTML(cat)));
});
let dataCat = {};
$wr.addEventListener('click', (event) => {
  switch (event.target.dataset.action) {
    case 'delete': {
      const $cardWr = event.target.closest('[data-card_id]');
      const catId = $cardWr.dataset.card_id;
      api.deleteCat(catId).then(() => {
        $cardWr.remove()
      }).catch(alert)
      break
    }
    case 'show': {
      const $cardWr = event.target.closest('[data-card_id]');
      const catId = $cardWr.dataset.card_id;
      console.log(catId);
      

      api.getCatById(catId).then((response) =>  {
        dataCat = response.data;
        $modalCat.insertAdjacentHTML('beforeend', generateCardHTML(dataCat));
      })
      $modalsCat.classList.remove('hidden');
      break
    }
    default:
      break
  }
})
$modalCat.addEventListener('click', (event) => {
  switch (event.target.dataset.action) {
    case 'change': {
      document.querySelector('[data-info-cat]').classList.toggle('hidden');
      document.querySelector('[data-form_change-cat]').classList.toggle('hidden');
      break
    }
    case 'update': {
      event.preventDefault();
      const data = Object.fromEntries(new FormData(document.forms.change_cat).entries());

      data.id = +data.id;
      data.rate = +data.rate;
      data.favourite = data.favourite === 'on';
     
      api.updateCat(data.id, data).then(() => {
        $modalsCat.classList.add('hidden');
      })
    }
  }
})

document.forms.add_cat.addEventListener('submit', (event) => {
  event.preventDefault();

  const data = Object.fromEntries(new FormData(event.target).entries())

  data.id = +data.id;
  data.rate = +data.rate;
  data.favourite = data.favourite === 'on';

  api.createCat(data).then(() => {
    $wr.insertAdjacentHTML('beforeend', generateCardsHTML(data))
    $modalsWr.classList.add('hidden');
    event.target.reset();
  }).catch(alert);
  console.log(data);
});

$openModalBtn.addEventListener('click', () => {
  $modalsWr.classList.remove('hidden');
  console.log($openModalBtn);
});

document.querySelector('[data-close-modal-add-cat]').addEventListener('click', () => {
  $modalsWr.classList.add('hidden');
});

document.querySelector('[data-close-modal-cat]').addEventListener('click', () => {
  $modalCat.innerHTML = "";
  $modalsCat.classList.add('hidden');
});

