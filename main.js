// переписать на промис (!!!!!!!не fetch !!!!!!!!!!)
// Далее НЕ ИСПОЛЬЗОВАТЬ В КОДЕ!
// let getRequest = (url, cb) => {
//   let xhr = new XMLHttpRequest();
//   xhr.open('GET', url, true);
//   xhr.onreadystatechange = () => {
//     if (xhr.readyState === 4) {
//       if (xhr.status !== 200) {
//         console.log('Error');
//       } else {
//         cb(xhr.responseText);
//       }
//     }
//   };
//   xhr.send();
// };
// ---------------------------------
const getRequest = (url) => {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status == 200) {
          resolve(xhr.responseText);
        } else {
          reject(console.log('Error'));
        }
      }
    };
    xhr.send();
  })
};


// const getRequest = (url) => {
//   
//   return new Promise((resolve, reject) => { // resolve -> then, reject -> catch
//       setTimeout(() => {
//           if (a) resolve(20);
//           else reject('No data');
//       }, 1500);
//   });
// };

// num()
//     .then((data) => { // resolve
//         console.log(data);
//     })
//     .catch((err) => { // reject
//         console.log(err);
//     });

class ProductList {
  constructor(container = '.products', api = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses') {
    this.container = document.querySelector(container);
    this.goods = [];
    this.productObjects = [];
    this.api = api;
    this.fetchGoods();
    this.render();

    // this.getProducts()
    //     .then((data) => {
    //       this.goods = data;
    //       this.render();
    //     });
  }

  fetchGoods() {
    getRequest(`${this.api}/catalogData.json`)
      .then((data) => {
        this.goods = JSON.parse(data);
        this.render();
    })
    .catch((err) => {
      console.log('произошла ошибка при загрузке данных')
    });
  }

  // getProducts() {
  //   return fetch(`${API}/catalogData.json`)
  //       .then(response => response.json())
  //       .catch(err => console.log(err));
  // }

  render() {
    for (const good of this.goods) {
      const productObject = new ProductItem(good);
      console.log(productObject);
      this.productObjects.push(productObject);

      this.container.insertAdjacentHTML('beforeend', productObject.getHTMLString());
    }
  }
}

class ProductItem {
  constructor(product, img = 'https://via.placeholder.com/200x150') {
    this.id_product = product.id_product;
    this.product_name = product.product_name;
    this.price = product.price;
    this.img = img;
  }

  getHTMLString() {
    return `<div class="product-item" data-id="${this.id_product}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.product_name}</h3>
                    <p>${this.price} \u20bd</p>
                    <button class="buy-btn">Купить</button>
                </div>
            </div>`;
  }
}

new ProductList();
