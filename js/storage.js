
const DEFAULT_STATE = {
    name: "",
    happiness: 80,
    cleanliness: 80,
    energy: 80,
    accessories: {
        head: null,
        face: null,
        neck: null
    },
    days: 1,
    lastLogin: Date.now()
};

function loadState() {
    try {
        const data = localStorage.getItem('miPerritoState');
        if (data) {
            let state = JSON.parse(data);
            // Calculate time difference for energy/needs
            const now = Date.now();
            const hoursPassed = (now - state.lastLogin) / (1000 * 60 * 60);
            
            if (hoursPassed > 24) {
                state.days += Math.floor(hoursPassed / 24);
            }
            
            // Decrease stats slightly based on time away
            if (hoursPassed > 1) {
                state.happiness = Math.max(0, state.happiness - Math.floor(hoursPassed * 2));
                state.cleanliness = Math.max(0, state.cleanliness - Math.floor(hoursPassed * 2));
                state.energy = Math.max(0, state.energy - Math.floor(hoursPassed * 1));
            }
            
            state.lastLogin = now;
            return state;
        }
    } catch (e) {
        console.error("Error loading state", e);
    }
    return JSON.parse(JSON.stringify(DEFAULT_STATE));
}

function saveState(state) {
    state.lastLogin = Date.now();
    localStorage.setItem('miPerritoState', JSON.stringify(state));
}
