const sheetURL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRRe476Q6ntGtSXrRN4FyWRsdtb_nlTC4zcxKER2AZqKssyiclKA4IQlKH_3GqhDFm-rpj9-zUBJm62/pub?output=csv';

async function loadProducts() {
    const response = await fetch(sheetURL);
    const data = await response.text();
    
    // Use PapaParse or split strings to turn CSV into an Array
    const rows = data.split('\n').slice(1); // Skip header row
    
    const container = document.getElementById('catalog-container');
    
   // ... existing fetch code ...

rows.forEach(row => {
    // Assuming CSV columns: Name, Price, Category, Image, Description, WhatsAppLink
    const [name, price, category, image, description, whatsapp] = row.split(',');

    if (name) {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${image}" alt="${name}">
            <h3>${name}</h3>
            <p class="price">RM ${price}</p>
            <span class="tag">${category}</span>
        `;

        // Click event to open modal
        card.onclick = () => {
            const modal = document.getElementById('product-modal');
            const details = document.getElementById('modal-details');
            
            details.innerHTML = `
                <img src="${image}" style="width:100%; border-radius:8px;">
                <h2>${name}</h2>
                <p><strong>Category:</strong> ${category}</p>
                <p>${description}</p>
                <h3 class="price">RM ${price}</h3>
                <a href="https://wa.me/60105958353?text=I am interested in ${name}" 
                   target="_blank" class="whatsapp-btn">
                   Order via WhatsApp
                </a>
            `;
            modal.style.display = "block";
        };

        container.appendChild(card);
    }
});

// Close modal logic
document.querySelector('.close-button').onclick = () => {
    document.getElementById('product-modal').style.display = "none";
};

window.onclick = (event) => {
    if (event.target == document.getElementById('product-modal')) {
        document.getElementById('product-modal').style.display = "none";
    }
};
}

loadProducts();
