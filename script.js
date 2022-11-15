const CONFIG_API = {
  url: 'https://sb-cats.herokuapp.com/api/2/turell7',
  headers: {
    "Content-type": 'application/json'
  }
}

const $wr = document.querySelector("[data-wr]");
$wr.innerHTML = "";

const generateCardHTML = (el) => {
    return `
    <div class="card mx-2 my-3" style="width: 18rem;">
        <img src="${el.img_link}" class="card-img-top" alt="${el.name}">
        <div class="card-body">
            <h5 class="card-title">${el.name}</h5>
            <p class="card-text">Возраст: ${el.age}</p>
            <button type="button"  class="btn btn-secondary">
                Подробнее
            </button>
            <button type="button"  class="btn btn-danger">
                Удалить
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
    
    return response.json()
  }

  getAllCatsIds() {
    fetch(`${this.url}/ids`);
  }

  getCatById(id) {
    fetch(`${this.url}/show/${id}`);
  }

  createCat(cat) {
    fetch(`${this.url}/add`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(cat),
  });
  }

  updateCat(id, updateCat) {
    fetch(`${this.url}/update/${id}`, {
      method: "PUT",
      headers: this.headers,
      body: JSON.stringify(updateCat),
      });    
  }

  deleteCat(id) {
    fetch(`${this.url}/delete/${id}`, {
      method: "DELLETE",
    });
  }
}

const api = new Api(CONFIG_API);

api.getAllCats().then((responseFromBackend) => {
  responseFromBackend.data.forEach((cat) => $wr.insertAdjacentHTML('beforeend', generateCardHTML(cat)))
})

$wr.addEventListener('click', (event) => {
  console.log(event.target.dataset)
})




















// class Api {
//   constructor(config) {
//     this.url = config.url;
//     this.headers = config.headers;
//   }

//   getAllCats() {
//     fetch(`${this.url}/show`)
//     .then(response => response.json())
//     .then(json => {
//         const cardHTML = json.data.map(el => generateCardHTML(el))

//         $wr.insertAdjacentHTML('beforeend', cardHTML)
//     });
//   }

//   getAllCatsIds() {
//     fetch(`${this.url}/ids`);
//   }

//   getCatById(id) {
//     fetch(`${this.url}/show/${id}`);
//   }

//   createCat(cat) {
//     fetch(`${this.url}/add`, {
//       method: "POST",
//       headers: this.headers,
//       body: JSON.stringify(cat),
//   });
//   }

//   updateCat(id, updateCat) {
//     fetch(`${this.url}/update/${id}`, {
//       method: "PUT",
//       headers: this.headers,
//       body: JSON.stringify(updateCat),
//       });    
//   }

//   deleteCat(id) {
//     fetch(`${this.url}/delete/${id}`, {
//       method: "DELLETE",
//     });
//   }
// }

// const api = new Api(CONFIG_API);

// api.getAllCats();

// api.getAllCats();

// console.log(api);
// api.getAllCats();
// api.getAllCatsIds();
// api.getCatById(2);
// api.createCat({id: 37, 'name': "Ululu"});
// api.updateCat(37, {'name': "Plux", 'age': 3});
// api.deleteCat(37);









// fetch("https://sb-cats.herokuapp.com/api/2/turell7/show")
// .then(response => response.json())



// const modal = $modal({
//     title: 'Имя котика',
//     content: 'Содержимое окна'
// });











