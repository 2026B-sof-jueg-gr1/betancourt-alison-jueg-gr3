
let isSleeping = false;
let sleepInterval;

function initActivities() {
    // Play
    const btnThrow = document.getElementById('btn-throw-ball');
    const ball = document.getElementById('ball');
    const playPuppy = document.getElementById('play-puppy');
    
    btnThrow.addEventListener('click', () => {
        if (window.gameState.energy < 15) {
            showPuppyMessage("Estoy muy cansado para jugar...");
            return;
        }
        
        btnThrow.disabled = true;
        ball.classList.remove('hidden');
        
        // Ball goes up and right
        ball.style.bottom = '200px';
        ball.style.left = '80%';
        
        setTimeout(() => {
            // Puppy follows
            playPuppy.style.left = '80%';
            playPuppy.style.bottom = '180px';
            
            setTimeout(() => {
                // Ball and puppy return
                ball.classList.add('hidden');
                ball.style.bottom = '20px';
                ball.style.left = '50%';
                
                playPuppy.style.left = '50%';
                playPuppy.style.bottom = '20px';
                
                updateStat('happiness', 15);
                updateStat('energy', -10);
                updateStat('cleanliness', -5);
                
                showPuppyMessage("¡Qué divertido!");
                btnThrow.disabled = false;
            }, 1000);
        }, 500);
    });
    
    // Sleep
    const btnSleep = document.getElementById('btn-sleep');
    const btnWake = document.getElementById('btn-wake');
    const zzz = document.getElementById('zzz-anim');
    const screenSleep = document.getElementById('screen-sleep');
    
    btnSleep.addEventListener('click', () => {
        isSleeping = true;
        btnSleep.classList.add('hidden');
        btnWake.classList.remove('hidden');
        zzz.classList.remove('hidden');
        
        // Dim screen
        screenSleep.style.background = '#1a252f';
        
        // Start energy recovery
        sleepInterval = setInterval(() => {
            if (window.gameState.energy < 100) {
                updateStat('energy', 5);
            }
        }, 2000);
    });
    
    btnWake.addEventListener('click', () => {
        isSleeping = false;
        btnWake.classList.add('hidden');
        btnSleep.classList.remove('hidden');
        zzz.classList.add('hidden');
        
        screenSleep.style.background = '#2c3e50';
        clearInterval(sleepInterval);
        showPuppyMessage("¡Buenos días!");
    });
}
