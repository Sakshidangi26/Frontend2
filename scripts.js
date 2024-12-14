const loadProductsBtn = document.getElementById('load-products-btn');
const productGrid = document.getElementById('product-grid');
const filterBtn = document.getElementById('filter-price');

let productData = []; 


const fetchData = async () => {
  try {
    const response = await fetch('https://interveiw-mock-api.vercel.app/api/getProducts');
    const { data } = await response.json();

    if (data && data.length > 0) {
      productData = data;
      renderData(data);
    } else {
      productGrid.innerHTML = '<p>No products available.</p>';
    }
  } catch (error) {
    productGrid.innerHTML = '<p>Failed to load products. Please try again later.</p>';
    console.error('Error fetching data:', error);
  }
};


const renderData = (data) => {
  productGrid.innerHTML = ''; 

  data.forEach((product, index) => {

    
    
    const productCard = document.createElement('div');
    productCard.className = 'product-card';

    setTimeout(() => {
      productCard.classList.add('visible');
    }, index * 100);

    productCard.innerHTML = `
      <img src="${product.product.image.src}" alt="${product.product.title}">
      <h3>${product.product.title}</h3>
      <span>₹${parseFloat(product.product.variants[0].price)}</span>
      <p>Tags: ${product.product.tags}</p>
    `;

    productGrid.appendChild(productCard);
  });
};


const filterProducts = (filter) => {
  let sortedData = [...productData];
  
  if (filter === 'low-to-high') {
    sortedData.sort((a, b) => 
      parseFloat(a.product.variants[0].price) - parseFloat(b.product.variants[0].price)
    );
  } else if (filter === 'high-to-low') {
    sortedData.sort((a, b) => 
      parseFloat(b.product.variants[0].price) - parseFloat(a.product.variants[0].price)
    );
  }

  renderData(sortedData);
};


loadProductsBtn.addEventListener('click', fetchData);


filterBtn.addEventListener('change', (e) => {
  const filterValue = e.target.value;
  if (filterValue === 'low-to-high' || filterValue === 'high-to-low') {
    filterProducts(filterValue);
  } else {
    renderData(productData);
  }
});