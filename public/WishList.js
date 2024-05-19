document.addEventListener('DOMContentLoaded', function() {
    // Selecting elements
    const addToWishlistButtons = document.querySelectorAll('.product-btn');
    const wishlistPanel = document.querySelector('[data-side-panel="whishlist"]');
    const wishlistHeader = document.querySelector('.header-action-btn[data-panel-btn="whishlist"]');
    const wishlistBadge = wishlistHeader.querySelector('.btn-badge');
    const scrollBtn = document.querySelector('.scroll-btn');

    // Load wishlist items from local storage on page load
    loadWishlist();

    // Event listener for adding items to wishlist
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

    // Event listener for removing items from wishlist
    wishlistPanel.addEventListener('click', function(event) {
        if (event.target.closest('.item-close-btn')) {
            event.preventDefault();
            const itemToRemove = event.target.closest('.panel-item');
            removeFromWishlist(itemToRemove);
            updateSubtotal();
            updateBadgeCount();
        }
    });

    // Function to add item to wishlist
    function addToWishlist(title, price) {
        let wishlistItems = JSON.parse(localStorage.getItem('wishlist')) || [];
        wishlistItems.push({ title, price });
        localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
        renderWishlist();
    }

    // Function to remove item from wishlist
    function removeFromWishlist(itemToRemove) {
        let wishlistItems = JSON.parse(localStorage.getItem('wishlist')) || [];
        const index = Array.from(itemToRemove.parentNode.children).indexOf(itemToRemove);
        wishlistItems.splice(index, 1);
        localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
        renderWishlist();
    }

    // Function to update subtotal
    function updateSubtotal() {
        let subtotalValue = 0;
        const wishlistItems = JSON.parse(localStorage.getItem('wishlist')) || [];

        wishlistItems.forEach(function(item) {
            subtotalValue += parseFloat(item.price) || 0;
        });

        const subtotalElement = wishlistPanel.querySelector('.subtotal-value');
        if (subtotalValue > 0) {
            subtotalElement.innerText = 'Rs ' + subtotalValue.toFixed(2);
        } else {
            subtotalElement.innerText = 'Rs 0.00';
        }
    }

    // Function to render wishlist
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
                        <span class="item-value">Rs ${item.price}</span>
                    </div>
                    <button class="item-close-btn" aria-label="Remove item">
                        <ion-icon name="close-outline"></ion-icon>
                    </button>
                </div>
            `;
            wishlistPanel.querySelector('.panel-list').appendChild(newItem);
        });

        // Update the subtotal after rendering the wishlist
        updateSubtotal();
    }

    // Function to load wishlist on page load
    function loadWishlist() {
        renderWishlist();
        updateBadgeCount();
    }

    // Function to update wishlist badge count
    function updateBadgeCount() {
        const wishlistItems = JSON.parse(localStorage.getItem('wishlist')) || [];
        wishlistBadge.innerText = wishlistItems.length.toString().padStart(2, '0');
    }

    // Function to toggle scroll button based on panel list height
    function toggleScrollButton() {
        if (wishlistPanel.querySelector('.panel-list').scrollHeight > 1200) {
            scrollBtn.style.display = 'block';
        } else {
            scrollBtn.style.display = 'none';
        }
    }

    // Call toggleScrollButton initially and on window resize
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
