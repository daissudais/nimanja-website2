const apiURL = 'https://v1.nocodeapi.com/daissudais/google_sheets/dKlDkUlArupwLiiv?tabId=Sheet1';
const myWhatsAppNumber = "60123456789"; 

async function loadProducts() {
    try {
        console.log("1. Fetching data...");
        const response = await fetch(apiURL);
        const jsonResponse = await response.json();
        
        console.log("2. Data received:", jsonResponse);

        // NoCodeAPI sometimes puts data in .data, sometimes it is the top-level array
        const products = jsonResponse.data || jsonResponse; 
        
        if (!Array.isArray(products)) {
            console.error("Data is not an array! Check NoCodeAPI settings.");
            return;
        }

        const container = document.getElementById('catalog-container');
        if (!container) {
            console.error("HTML Error: Could not find an element with id='catalog-container'");
            return;
        }
        
        container.innerHTML = ''; 

        products.forEach((product, index) => {
            console.log(`3. Processing item ${index}:`, product);

            // Using bracket notation to handle any hidden spaces or special characters
            const name = product['Name'];
            const price = product['Price'];
            const category = product['Category'];
            const image = product['ImageURL']; 
            const description = product['Description'];

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
                        <a href="https://wa.me/${myWhatsAppNumber}?text=Hi, I am interested in: ${encodeURIComponent(name)}" 
                           target="_blank" class="whatsapp-btn">Order via WhatsApp</a>
                    `;
                    modal.style.display = "block";
                };
                container.appendChild(card);
            }
        });
        
        console.log("4. Finished rendering products.");

    } catch (error) {
        console.error("FETCH ERROR:", error);
    }
}

// Keep your modal close logic at the bottom
loadProducts();
