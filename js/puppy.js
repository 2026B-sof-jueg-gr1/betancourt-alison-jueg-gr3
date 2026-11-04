
const MESSAGES = [
    "¡Guau, guau!",
    "¡Hola, humano!",
    "¡Me gusta que me acaricies!",
    "¿Jugamos?",
    "¡Estoy feliz!",
    "¡Eres el mejor!"
];

function interactWithPuppy() {
    if (window.gameState.energy < 20) {
        showPuppyMessage("Estoy muy cansado... zZz");
        return;
    }
    
    // Random animation
    const container = document.querySelector('#screen-room .puppy-container');
    container.style.animation = 'none';
    container.offsetHeight; // trigger reflow
    container.style.animation = 'bounce 0.5s';
    
    // Increase happiness slightly
    updateStat('happiness', 5);
    
    // Show random message
    const msg = MESSAGES[Math.floor(Math.random() * MESSAGES.length)];
    let petName = window.gameState.name;
    if (petName) {
        showPuppyMessage(msg.replace("humano", "mi dueño favorito").replace("Guau", "Guau soy " + petName));
    } else {
        showPuppyMessage(msg);
    }
}

function showPuppyMessage(text) {
    const bubble = document.getElementById('puppy-message');
    bubble.textContent = text;
    bubble.classList.remove('hidden');
    
    // clear previous timeout
    if (window.messageTimeout) clearTimeout(window.messageTimeout);
    
    window.messageTimeout = setTimeout(() => {
        bubble.classList.add('hidden');
    }, 3000);
}

function applyAccessoriesToAll() {
    const state = window.gameState;
    const layers = document.querySelectorAll('.accessories-layer');
    
    layers.forEach(layer => {
        layer.innerHTML = ''; // clear
        
        Object.values(state.accessories).forEach(accId => {
            if (accId) {
                const img = document.createElement('img');
                img.src = `assets/clothes/${accId}.svg`;
                img.className = 'accessory-img';
                layer.appendChild(img);
            }
        });
    });
}
