
// Add hovered class to selected list item
let listItems = document.querySelectorAll('.navigation li');

function activeLink() {
  listItems.forEach((item) => {
    item.classList.remove('hovered');
  });
  this.classList.add('hovered');
}

listItems.forEach((item) => item.addEventListener('mouseover', activeLink));

// Menu Toggle
let toggleButton = document.querySelector('.toggle');
let navigation = document.querySelector('.navigation');
let main = document.querySelector('.main');

if (toggleButton) {
  toggleButton.onclick = function () {
    navigation.classList.toggle('active');
    main.classList.toggle('active');
  };
}

// add the products details in admin dashboard
      document.addEventListener('DOMContentLoaded', function () {
    // Fetch top products data
    fetch('/api/getproducts')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Populate the "Top Products" table
        const topProductsTableBody = document.querySelector('#productTable tbody');
        data.forEach(product => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${product.productName}</td>
            <td>${product.price}</td>
          `;
          topProductsTableBody.appendChild(row);
        });

        // Update total number of products
        const totalProductsCount = data.length;
        const totalProductsElement = document.getElementById('totalProductsCount');
        totalProductsElement.textContent = totalProductsCount;
      })
      .catch(error => {
        console.error('Error fetching top products:', error);
      });
  });
