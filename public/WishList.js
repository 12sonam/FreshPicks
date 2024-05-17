document.addEventListener('DOMContentLoaded', function() {
    const addToWishlistButtons = document.querySelectorAll('.product-btn');
    const wishlistPanel = document.querySelector('[data-side-panel="whishlist"]');
    const wishlistHeader = document.querySelector('.header-action-btn[data-panel-btn="whishlist"]');
    const wishlistBadge = wishlistHeader.querySelector('.btn-badge');
    const scrollBtn = document.querySelector('.scroll-btn');
  
    // Load wishlist items from local storage on page load
    loadWishlist();
  
    addToWishlistButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            const productCard = button.closest('.product-card');
            const productTitle = productCard.querySelector('.card-title a').innerText;
            const productPrice = productCard.querySelector('.price').getAttribute('value');
  
            // Add the item to the wishlist
            addToWishlist(productTitle, productPrice);
  
            // Update the subtotal
            updateSubtotal();
  
            // Update wishlist badge count
            updateBadgeCount();
        });
    });
  
    // Event listener for removing items from the wishlist
    wishlistPanel.addEventListener('click', function(event) {
        if (event.target.closest('.item-close-btn')) {
            event.preventDefault();
            const itemToRemove = event.target.closest('.panel-item');
            removeFromWishlist(itemToRemove);
            updateSubtotal();
            updateBadgeCount();
        }
    });
  
    function addToWishlist(title, price) {
        // Ensure price is a number before storing
        price = parseFloat(price);
        if (isNaN(price)) {
            console.error('Invalid price:', price);
            return;
        }
    
        let wishlistItems = JSON.parse(localStorage.getItem('wishlist')) || [];
        wishlistItems.push({ title, price });
        localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
        renderWishlist();
    }
  
    function removeFromWishlist(itemToRemove) {
        let wishlistItems = JSON.parse(localStorage.getItem('wishlist')) || [];
        const index = Array.from(itemToRemove.parentNode.children).indexOf(itemToRemove);
        wishlistItems.splice(index, 1);
        localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
        renderWishlist();
    }
  
    function updateSubtotal() {
        let subtotalValue = 0;
        const wishlistItems = JSON.parse(localStorage.getItem('wishlist')) || [];
        wishlistItems.forEach(function(item) {
            if (!isNaN(item.price)) {
                subtotalValue += item.price;
            }
        });
    
        // Update the subtotal value in the panel
        wishlistPanel.querySelector('.subtotal-value').innerText = 'Rs ' + subtotalValue.toFixed(2);
    }
    
    function renderWishlist() {
        wishlistPanel.querySelector('.panel-list').innerHTML = '';
        const wishlistItems = JSON.parse(localStorage.getItem('wishlist')) || [];
        wishlistItems.forEach(function(item) {
            const newItem = document.createElement('li');
            newItem.classList.add('panel-item');
            newItem.innerHTML = `
                <div class="panel-card">
                    <div>
                        <p class="item-title">${item.title}</p>
                        <span class="item-value">Rs ${item.price.toFixed(2)}</span>
                    </div>
                    <button class="item-close-btn" aria-label="Remove item">
                        <ion-icon name="close-outline"></ion-icon>
                    </button>
                </div>
            `;
            wishlistPanel.querySelector('.panel-list').appendChild(newItem);
        });
        // Update the subtotal and badge count after rendering
        updateSubtotal();
        updateBadgeCount();
    }
    
    function loadWishlist() {
        renderWishlist();
    }
  
    function updateBadgeCount() {
        const wishlistItems = JSON.parse(localStorage.getItem('wishlist')) || [];
        wishlistBadge.innerText = wishlistItems.length.toString().padStart(2, '0');
    } 

     // Check the height of the panel list and toggle the scroll button
    function toggleScrollButton() {
        if (wishlistPanel.querySelector('.panel-list').scrollHeight > 1200) {
            scrollBtn.style.display = 'block';
        } else {
            scrollBtn.style.display = 'none';
        }
    }

    // Call the function initially and on window resize
    toggleScrollButton();
    window.addEventListener('resize', toggleScrollButton);

    // Smooth scroll to the bottom of the panel list when scroll button is clicked
    scrollBtn.addEventListener('click', function() {
        wishlistPanel.querySelector('.panel-list').scrollTo({
            top: wishlistPanel.querySelector('.panel-list').scrollHeight,
            behavior: 'smooth'
        });
    });
});
