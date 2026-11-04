
// Global state
window.gameState = loadState();
window.messageTimeout = null;

document.addEventListener('DOMContentLoaded', () => {
    // Check if new user
    if (!window.gameState.name) {
        document.getElementById('start-screen').classList.add('active');
        document.getElementById('game-container').classList.add('hidden');
    } else {
        startGame();
    }
    
    // Start Screen Buttons
    document.getElementById('btn-start').addEventListener('click', () => {
        document.getElementById('name-modal').classList.remove('hidden');
    });
    
    document.getElementById('btn-how-to').addEventListener('click', () => {
        alert("Cuida a tu perrito: dale de comer, báñalo, juega con él y vístele con accesorios. ¡Mantén sus estadísticas altas!");
    });
    
    // Name Modal
    document.getElementById('btn-save-name').addEventListener('click', () => {
        const nameInput = document.getElementById('pet-name-input').value.trim();
        if (nameInput) {
            window.gameState.name = nameInput;
            saveState(window.gameState);
            document.getElementById('start-screen').classList.remove('active');
            document.getElementById('name-modal').classList.add('hidden');
            startGame();
            showPuppyMessage(`¡Hola! Soy ${nameInput}`);
        }
    });
    
    // Navigation
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const target = btn.getAttribute('data-target');
            
            // Switch active button
            navButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Switch screen
            document.querySelectorAll('.game-screen').forEach(s => s.classList.add('hidden'));
            document.querySelectorAll('.game-screen').forEach(s => s.classList.remove('active'));
            
            const targetScreen = document.getElementById(target);
            targetScreen.classList.remove('hidden');
            targetScreen.classList.add('active');
        });
    });
    
    // Room interaction
    document.getElementById('screen-room').querySelector('.puppy-container').addEventListener('click', () => {
        if (typeof interactWithPuppy === 'function') interactWithPuppy();
    });
    
    // Init modules
    if (typeof initBathroom === 'function') initBathroom();
    if (typeof initWardrobe === 'function') initWardrobe();
    if (typeof initActivities === 'function') initActivities();
    
    // Set interval for natural decay
    setInterval(() => {
        if (!isSleeping) {
            updateStat('energy', -1);
            updateStat('happiness', -1);
            updateStat('cleanliness', -0.5);
        }
    }, 15000);
});

function startGame() {
    document.getElementById('game-container').classList.remove('hidden');
    document.getElementById('start-screen').classList.remove('active');
    updateAllBars();
    document.getElementById('day-num').textContent = window.gameState.days;
    applyAccessoriesToAll();
}

window.updateStat = function(stat, amount, setExact = false) {
    if (setExact) {
        window.gameState[stat] = amount;
    } else {
        window.gameState[stat] += amount;
    }
    
    // clamp between 0 and 100
    if (window.gameState[stat] > 100) window.gameState[stat] = 100;
    if (window.gameState[stat] < 0) window.gameState[stat] = 0;
    
    updateAllBars();
    saveState(window.gameState);
}

function updateAllBars() {
    document.getElementById('bar-happiness').style.width = window.gameState.happiness + '%';
    document.getElementById('bar-cleanliness').style.width = window.gameState.cleanliness + '%';
    document.getElementById('bar-energy').style.width = window.gameState.energy + '%';
}
