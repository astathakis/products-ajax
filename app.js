const url = 'https://course-api.com/javascript-store-products';

//used for three states of ajax(loading,success,error)
const productsDom = document.querySelector('.products-center');

const fetchProducts = async () => {
  productsDom.innerHTML = `<div class='loading'></div>`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    //mind that async returns promise
    return data;
  } catch (error) {
    // console.log(error);
    productsDom.innerHTML = `<p class="error">there was an error</p>`;
  }
};

const displayProducts = (list) => {
  console.log(list);
  //dynamically add this list in the of the f()
  const productList = list
    .map((product) => {
      // pull out id,title price and image with destructuring
      const { id } = product;
      //use alias for name
      const { name: title, price } = product.fields;
      //use alias for img
      const { url: img } = product.fields.image[0];
      //price coming in cents
      const formatPrice = price / 100;
      return `<a class="single-product" href="product.html?id=${id}&name=john">
            <img src="${img}" class="single-product-img img" alt="${title}" />
            <footer>
              <h5 class="name">${title}</h5>
              <span class="price">$${formatPrice}</span>
            </footer>
          </a>`;
    })
    .join('');
  //overwrites loading state
  productsDom.innerHTML = ` <div class="products-container">
  ${productList}
  </div>`;
};

const start = async () => {
  const data = await fetchProducts();
  displayProducts(data);
};

start();
