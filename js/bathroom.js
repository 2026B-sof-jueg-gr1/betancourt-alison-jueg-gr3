
let isBathing = false;
let bathProgress = 0;
let spongeClicks = 0;

function initBathroom() {
    const btnStart = document.getElementById('btn-start-bath');
    const btnSponge = document.getElementById('btn-sponge');
    const btnDry = document.getElementById('btn-dry');
    const bubbles = document.getElementById('bath-bubbles');
    const progressContainer = document.getElementById('bath-progress');
    const bathBar = document.getElementById('bath-bar');
    
    btnStart.addEventListener('click', () => {
        if (window.gameState.cleanliness >= 100) {
            showPuppyMessage("¡Ya estoy muy limpio!");
            return;
        }
        isBathing = true;
        bathProgress = 0;
        spongeClicks = 0;
        bathBar.style.width = '0%';
        
        btnStart.classList.add('hidden');
        btnSponge.classList.remove('hidden');
        bubbles.classList.remove('hidden');
        progressContainer.classList.remove('hidden');
        showPuppyMessage("¡Hora del baño!");
    });
    
    btnSponge.addEventListener('click', () => {
        if (!isBathing) return;
        spongeClicks++;
        bathProgress = Math.min(100, spongeClicks * 20); // 5 clicks to finish
        bathBar.style.width = `${bathProgress}%`;
        
        const puppy = document.getElementById('puppy-sprite-bath');
        puppy.style.transform = `rotate(${spongeClicks % 2 === 0 ? 5 : -5}deg)`;
        
        if (bathProgress >= 100) {
            isBathing = false;
            btnSponge.classList.add('hidden');
            btnDry.classList.remove('hidden');
            showPuppyMessage("¡Qué limpio quedé!");
            puppy.style.transform = 'rotate(0deg)';
        }
    });
    
    btnDry.addEventListener('click', () => {
        btnDry.classList.add('hidden');
        bubbles.classList.add('hidden');
        progressContainer.classList.add('hidden');
        btnStart.classList.remove('hidden');
        
        updateStat('cleanliness', 100, true);
        updateStat('happiness', 10);
        showPuppyMessage("¡Qué rico baño!");
    });
}
