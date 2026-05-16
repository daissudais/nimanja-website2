// 1. CONFIGURATION
const apiURL = "https://v1.nocodeapi.com/daissudais/google_sheets/dKlDkUlArupwLiiv?tabId=Sheet1";
const myWhatsAppNumber = "60123456789"; // Replace with your actual WhatsApp number

// 2. WAIT FOR HTML TO BE READY
window.addEventListener('DOMContentLoaded', () => {
    // Start loading products
    loadProducts();

    // Setup Modal Close Logic
    const modal = document.getElementById('product-modal');
    const closeBtn = document.querySelector('.close-button');

    if (closeBtn) {
        closeBtn.onclick = () => {
            modal.style.display = "none";
        };
    }

    // Close modal if user clicks outside the box
    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };
});

// 3. FETCH DATA FROM GOOGLE SHEETS
async function loadProducts() {
    try {
        const response = await fetch(apiURL);
        const result = await response.json();
        
        // NoCodeAPI stores your sheet rows in the .data property
        const products = result.data; 
        const container = document.getElementById('catalog-container');
        
        if (!container) {
            console.error("Error: Could not find 'catalog-container' in your HTML.");
            return;
        }

        container.innerHTML = ''; // Clear any existing content

        products.forEach(product => {
            // Mapped to your exact Google Sheet headers
            const name = product.Name;
            const price = product.Price || product['# Price']; // Handles both naming styles
            const category = product.Category;
            const image = product.ImageURL;
            const description = product.Description;

            if (name) {
                const card = document.createElement('div');
                card.className = 'product-card';
                card.innerHTML = `
                    <img src="${image}" alt="${name}" onerror="this.src='https://via.placeholder.com/150'">
                    <div class="product-info">
                        <h3>${name}</h3>
                        <p class="price">RM ${price}</p>
                        <span class="tag">${category || 'Pet Care'}</span>
                    </div>
                `;

                // When user clicks the card, open the modal
                card.onclick = () => {
                    openProductModal(name, price, category, image, description);
                };

                container.appendChild(card);
            }
        });

    } catch (error) {
        console.error("API Fetch Error:", error);
    }
}

// 4. MODAL POPUP LOGIC
function openProductModal(name, price, category, image, description) {
    const modal = document.getElementById('product-modal');
    const details = document.getElementById('modal-details');
    
    if (!modal || !details) return;

    details.innerHTML = `
        <img src="${image}" style="width:100%; border-radius:12px; margin-bottom:15px;" onerror="this.src='https://via.placeholder.com/300'">
        <div class="modal-text">
            <h2>${name}</h2>
            <span class="tag">${category || 'General'}</span>
            <p style="margin: 15px 0;">${description || 'No description available for this item.'}</p>
            <h3 class="price">RM ${price}</h3>
            
            <a href="https://wa.me/${myWhatsAppNumber}?text=Hi, I am interested in ordering: ${encodeURIComponent(name)}" 
               target="_blank" class="whatsapp-btn">
               Order via WhatsApp
            </a>
        </div>
    `;
    
    modal.style.display = "block";
}
