
const ACCESSORIES = [
    { id: 'hat_cap', name: 'Gorra', type: 'head', icon: '🧢' },
    { id: 'hat_party', name: 'Gorro Fiesta', type: 'head', icon: '🥳' },
    { id: 'glasses_sun', name: 'Gafas Sol', type: 'face', icon: '🕶️' },
    { id: 'glasses_nerd', name: 'Lentes', type: 'face', icon: '🤓' },
    { id: 'neck_bowtie', name: 'Corbatín', type: 'neck', icon: '👔' },
    { id: 'neck_scarf', name: 'Pañoleta', type: 'neck', icon: '🧣' }
];

function initWardrobe() {
    const grid = document.getElementById('accessories-grid');
    
    ACCESSORIES.forEach(acc => {
        const card = document.createElement('div');
        card.className = 'item-card';
        card.innerHTML = `
            <div style="font-size: 2rem;">${acc.icon}</div>
            <p>${acc.name}</p>
        `;
        card.addEventListener('click', () => equipAccessory(acc.type, acc.id));
        grid.appendChild(card);
    });
    
    document.getElementById('btn-remove-clothes').addEventListener('click', () => {
        window.gameState.accessories = { head: null, face: null, neck: null };
        applyAccessoriesToAll();
        saveState(window.gameState);
    });
}

function equipAccessory(type, id) {
    if (window.gameState.accessories[type] === id) {
        window.gameState.accessories[type] = null; // unequip if already equipped
    } else {
        window.gameState.accessories[type] = id;
    }
    applyAccessoriesToAll();
    saveState(window.gameState);
}
