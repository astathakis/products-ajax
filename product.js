const productDOM = document.querySelector('.product');

const url = 'https://course-api.com/javascript-store-single-product';

const fetchProduct = async () => {
  try {
    productDOM.innerHTML = `<h4 class="product-loading">loading...</h4>`;
    // console.log(window.location.search);
    //using methods to grab only id
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    console.log(id);
    const response = await fetch(`${url}?id=${id}`);
    // console.log(response);
    const data = response.json();

    return data;
  } catch (error) {
    productDOM.innerHTML = `<h4 class="error">error try again later..</h4>`;
  }
};

const displayProduct = (product) => {
  console.log(product);
  //   company,colors,description,name:title,price,image(url:img)
  const {
    company,
    colors,
    description,
    name: title,
    price,
    image,
  } = product.fields;
  //from image pull out the url
  const { url: img } = image[0];
  //change title
  document.title = title.toUpperCase();
  //colors
  console.log(colors);
  const colorsList = colors
    .map((color) => {
      return `  <span class="product-color" style="background: ${color}"></span>`;
    })
    .join('');

  productDOM.innerHTML = `<div class="product-wrapper">
        <img src="${img}" class="img" alt="${title}" />
        <div class="product-info">
          <h3>${title}</h3>
          <h5>${company}</h5>
          <span>$${price / 100}</span>
          <div class="colors">
    ${colorsList}
           
          </div>
          <p>
            ${description}
          </p>
          <button class="btn">add to cart</button>
        </div>
      </div>`;
};

const start = async () => {
  const data = await fetchProduct();
  displayProduct(data);
};

start();
