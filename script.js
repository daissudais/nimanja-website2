// 1. Your Endpoint
const apiURL = "https://v1.nocodeapi.com/daissudais/google_sheets/dKlDkUlArupwLiiv?tabId=Sheet1";
const myWhatsAppNumber = "60123456789"; 

async function loadProducts() {
    try {
        // 2. The Fetch Request (Standard JavaScript - Fetch)
        const response = await fetch(apiURL);
        const result = await response.json();
        
        // NoCodeAPI puts the rows in 'data'
        const products = result.data; 
        const container = document.getElementById('catalog-container');
        
        if (!container) return;
        container.innerHTML = ''; 

        products.forEach(product => {
            // 3. Mapping your Sheet headers
            const name = product.Name;
            const price = product.Price || product['# Price'];
            const category = product.Category;
            const image = product.ImageURL;
            const description = product.Description;

            if (name) {
                const card = document.createElement('div');
                card.className = 'product-card';
                card.innerHTML = `
                    <img src="${image}" alt="${name}" onerror="this.src='https://via.placeholder.com/150'">
                    <h3>${name}</h3>
                    <p class="price">RM ${price}</p>
                    <span class="tag">${category}</span>
                `;

                card.onclick = () => {
                    showModal(name, price, category, image, description);
                };

                container.appendChild(card);
            }
        });
    } catch (error) {
        console.error("Error with Fetch:", error);
    }
}

// Helper function to handle the modal display
function showModal(name, price, category, image, description) {
    const modal = document.getElementById('product-modal');
    const details = document.getElementById('modal-details');
    
    details.innerHTML = `
        <img src="${image}" style="width:100%; border-radius:8px;" onerror="this.src='https://via.placeholder.com/300'">
        <h2>${name}</h2>
        <p><strong>Category:</strong> ${category}</p>
        <p>${description || 'No description available.'}</p>
        <h3 class="price">RM ${price}</h3>
        <a href="https://wa.me/${myWhatsAppNumber}?text=I am interested in: ${encodeURIComponent(name)}" 
           target="_blank" class="whatsapp-btn">
           Order via WhatsApp
        </a>
    `;
    modal.style.display = "block";
}

// Close Modal logic
document.querySelector('.close-button').onclick = () => {
    document.getElementById('product-modal').style.display = "none";
};

window.onclick = (event) => {
    if (event.target == document.getElementById('product-modal')) {
        document.getElementById('product-modal').style.display = "none";
    }
};

loadProducts();
