const apiURL = 'https://v1.nocodeapi.com/daissudais/google_sheets/dKlDkUlArupwLiiv?tabId=Sheet1';

// If your WhatsApp number is the same for all products, change it here:
const myWhatsAppNumber = "60105958353"; // Use format: country code + number (no + or spaces)

async function loadProducts() {
    try {
        const response = await fetch(apiURL);
        const jsonResponse = await response.json();
        
        // NoCodeAPI returns data inside the 'data' array
        const products = jsonResponse.data; 
        
        const container = document.getElementById('catalog-container');
        container.innerHTML = ''; 

        products.forEach(product => {
            // Mapped exactly to your Google Sheet screenshot headers
            const name = product.Name;
            const price = product.Price;
            const category = product.Category;
            const image = product.ImageURL; // Matched to your header "ImageURL"
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
                    const modal = document.getElementById('product-modal');
                    const details = document.getElementById('modal-details');
                    
                    details.innerHTML = `
                        <img src="${image}" style="width:100%; border-radius:8px;" onerror="this.src='https://via.placeholder.com/300'">
                        <h2>${name}</h2>
                        <p><strong>Category:</strong> ${category || 'General'}</p>
                        <p>${description || 'No description available.'}</p>
                        <h3 class="price">RM ${price}</h3>
                        <a href="https://wa.me/${myWhatsAppNumber}?text=Hi, I am interested in ordering: ${encodeURIComponent(name)}" 
                           target="_blank" class="whatsapp-btn">
                           Order via WhatsApp
                        </a>
                    `;
                    modal.style.display = "block";
                };

                container.appendChild(card);
            }
        });
    } catch (error) {
        console.error("Error loading products:", error);
    }
}

// Modal closing logic
document.querySelector('.close-button').onclick = () => {
    document.getElementById('product-modal').style.display = "none";
};

window.onclick = (event) => {
    if (event.target == document.getElementById('product-modal')) {
        document.getElementById('product-modal').style.display = "none";
    }
};

loadProducts();
