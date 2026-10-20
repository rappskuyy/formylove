let currentPage = 1;
let musicPlaying = false;
const bgMusic = document.getElementById('bgMusic');
const musicToggle = document.getElementById('musicToggle');
const btnNo = document.getElementById('btnNo');
const birthdayIntro = document.getElementById('birthdayIntro');
const pinGate = document.getElementById('pinGate');
const pinForm = document.getElementById('pinForm');
const pinInput = document.getElementById('pinInput');
const pinError = document.getElementById('pinError');
let birthdayFinished = false;
let countdownInterval;
const invitationDate = new Date('2026-10-24T12:00:00+07:00').getTime();

function updateInvitationCountdown() {
    const remaining = Math.max(0, invitationDate - Date.now());
    const values = {
        countdownDays: Math.floor(remaining / 86400000),
        countdownHours: Math.floor((remaining % 86400000) / 3600000),
        countdownMinutes: Math.floor((remaining % 3600000) / 60000),
        countdownSeconds: Math.floor((remaining % 60000) / 1000)
    };

    Object.entries(values).forEach(([id, value]) => {
        document.getElementById(id).textContent = String(value).padStart(2, '0');
    });

    if (remaining === 0) {
        document.getElementById('countdownStatus').textContent = 'Waktunya sudah tiba! Aku tunggu, ya ♡';
        window.clearInterval(countdownInterval);
    }
}

updateInvitationCountdown();
countdownInterval = window.setInterval(updateInvitationCountdown, 1000);


//  musik
function tryAutoPlay() {
    if (!birthdayFinished) {
        return;
    }

    bgMusic.play().then(() => {
        musicPlaying = true;
        musicToggle.textContent = '🔊';
    }).catch(() => {
        // 
        musicPlaying = false;
        musicToggle.textContent = '🔇';
    });
}

// Mulai 
document.addEventListener('click', function initMusic() {
    if (!musicPlaying) {
        tryAutoPlay();
    }
}, { once: true });

//  autoplay
window.addEventListener('load', tryAutoPlay);

// Toggle musik 
musicToggle.addEventListener('click', function(e) {
    e.stopPropagation();
    if (!birthdayFinished) {
        return;
    }

    if (musicPlaying) {
        bgMusic.pause();
        musicToggle.textContent = '🔇';
        musicPlaying = false;
    } else {
        bgMusic.play();
        musicToggle.textContent = '🔊';
        musicPlaying = true;
    }
});

pinForm.addEventListener('submit', function(e) {
    e.preventDefault();

    if (pinInput.value !== '211010') {
        pinError.textContent = 'PIN belum tepat. Coba sekali lagi, ya.';
        pinInput.value = '';
        pinInput.focus();
        return;
    }

    pinError.textContent = '';
    pinGate.hidden = true;
    birthdayIntro.src = 'PROJECT%20HBD/index.html';
    birthdayIntro.classList.add('is-visible');
});

document.getElementById('joinInvitation').addEventListener('click', function() {
    const message = encodeURIComponent('Aku mau ikut hari Sabtu, 24 Oktober jam 12.00 WIB ♡');
    window.open(`https://wa.me/628577048522?text=${message}`, '_blank', 'noopener,noreferrer');
});

window.addEventListener('message', function(e) {
    if (e.source !== birthdayIntro.contentWindow || e.data !== 'birthday-finished') {
        return;
    }

    e.source.postMessage('stop-birthday-audio', '*');
    birthdayFinished = true;
    birthdayIntro.classList.remove('is-visible');
    tryAutoPlay();
});

// ==================== TOMBOL  ====================
btnNo.addEventListener('mouseenter', moveButton);
btnNo.addEventListener('click', function(e) {
    e.preventDefault();
    moveButton();
});

function moveButton() {
   
    const maxX = window.innerWidth - 180;
    const maxY = window.innerHeight - 60;
    
    // Posisi 
    const randomX = Math.random() * (maxX - 50);
    const randomY = Math.random() * (maxY - 50);
    
    
    btnNo.style.position = 'fixed';
    btnNo.style.left = randomX + 'px';
    btnNo.style.top = randomY + 'px';
    btnNo.style.transition = 'all 0.3s ease';
}

// ==================== NAV ====================
function goToPage(pageNum) {
    const currentPageEl = document.getElementById(`page${currentPage}`);
    const nextPageEl = document.getElementById(`page${pageNum}`);
    
    
    currentPageEl.classList.remove('active');
    
    
    setTimeout(() => {
        window.scrollTo(0, 0); 
        nextPageEl.classList.add('active');
        currentPage = pageNum;
    }, 300);
}
