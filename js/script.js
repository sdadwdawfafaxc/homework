// Countdown Timer
function updateCountdown() {
    const now = new Date().getTime();
    const currentYear = new Date().getFullYear();
    let birthday = new Date(currentYear, 8, 27).getTime(); // 27 กันยายน (month 0-indexed)
    if (now > birthday) {
        birthday = new Date(currentYear + 1, 8, 27).getTime();
    }
    const distance = birthday - now;
    if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        document.getElementById('days').textContent = days;
        document.getElementById('hours').textContent = hours;
        document.getElementById('minutes').textContent = minutes;
        document.getElementById('seconds').textContent = seconds;
        document.getElementById('countdown').style.display = 'grid';
        document.getElementById('birthdayMessage').style.display = 'none';
    } else {
        document.getElementById('countdown').style.display = 'none';
        document.getElementById('birthdayMessage').style.display = 'block';
    }
}

// Current Time Display
function updateCurrentTime() {
    const now = new Date();
    const options = {
        timeZone: 'Asia/Bangkok',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    };
    const formatter = new Intl.DateTimeFormat('th-TH', options);
    document.getElementById('currentTime').textContent = formatter.format(now);
}

// Music Controls
const audio1 = document.getElementById('birthdayAudio1');
const audio2 = document.getElementById('birthdayAudio2');
const audio3 = document.getElementById('birthdayAudio3');
const playBtn1 = document.getElementById('playBtn1');
const playBtn2 = document.getElementById('playBtn2');
const playBtn3 = document.getElementById('playBtn3');
const lowVolumeBtn = document.getElementById('lowVolume');
const normalVolumeBtn = document.getElementById('normalVolume');
const highVolumeBtn = document.getElementById('highVolume');
let currentAudio = null;

// Set default volume
[audio1, audio2, audio3].forEach(audio => { if(audio) audio.volume = 0.7; });

function stopAllAudio() {
    [audio1, audio2, audio3].forEach(audio => {
        if(audio) {
            audio.pause();
            audio.currentTime = 0;
        }
    });
    [playBtn1, playBtn2, playBtn3].forEach(btn => {
        if(btn) btn.textContent = btn.getAttribute('data-label') || btn.textContent;
    });
    currentAudio = null;
}

function handlePlayPause(audio, button, songName) {
    if (currentAudio && currentAudio !== audio) {
        stopAllAudio();
    }
    if (audio.paused) {
        audio.play().then(() => {
            button.textContent = `⏸️ หยุด${songName}`;
            currentAudio = audio;
        }).catch(error => {
            alert(`กรุณาใส่ไฟล์ ${songName.toLowerCase().replace('เพลงที่ ', 'song')}.mp3 ในโฟลเดอร์เดียวกัน`);
        });
    } else {
        audio.pause();
        button.textContent = button.getAttribute('data-label') || `▶️ เล่น${songName}`;
        currentAudio = null;
    }
}

if(playBtn1) playBtn1.addEventListener('click', () => handlePlayPause(audio1, playBtn1, 'เพลงที่ 1'));
if(playBtn2) playBtn2.addEventListener('click', () => handlePlayPause(audio2, playBtn2, 'เพลงที่ 2'));
if(playBtn3) playBtn3.addEventListener('click', () => handlePlayPause(audio3, playBtn3, 'เพลงที่ 3'));

if(lowVolumeBtn) lowVolumeBtn.addEventListener('click', () => {
    [audio1, audio2, audio3].forEach(audio => { if(audio) audio.volume = 0.3; });
});
if(normalVolumeBtn) normalVolumeBtn.addEventListener('click', () => {
    [audio1, audio2, audio3].forEach(audio => { if(audio) audio.volume = 0.7; });
});
if(highVolumeBtn) highVolumeBtn.addEventListener('click', () => {
    [audio1, audio2, audio3].forEach(audio => { if(audio) audio.volume = 1.0; });
});

if(audio1) audio1.addEventListener('ended', () => {
    playBtn1.textContent = playBtn1.getAttribute('data-label') || '🎤 เพลงที่ 1';
    currentAudio = null;
});
if(audio2) audio2.addEventListener('ended', () => {
    playBtn2.textContent = playBtn2.getAttribute('data-label') || '🎶 เพลงที่ 2';
    currentAudio = null;
});
if(audio3) audio3.addEventListener('ended', () => {
    playBtn3.textContent = playBtn3.getAttribute('data-label') || '🎵 เพลงที่ 3';
    currentAudio = null;
});

// Neumorphic Clock
function updateNeumorphicClock() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    // Analog hand (minute-based)
    const deg = ((hours % 12) * 30) + (minutes * 0.5) - 90;
    const hand = document.getElementById('clock-hand');
    if (hand) hand.style.transform = `rotate(${deg}deg) translate(-50%, -50%)`;

    // Digital time
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const timeStr = `${String(hours % 12 || 12).padStart(2, '0')}.${String(minutes).padStart(2, '0')} <span>${ampm}</span>`;
    const timeEl = document.getElementById('clock-time');
    if (timeEl) timeEl.innerHTML = timeStr;

    // Date
    const dayEl = document.getElementById('clock-day');
    const monthEl = document.getElementById('clock-month');
    const months = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
    if (dayEl) dayEl.textContent = now.getDate();
    if (monthEl) monthEl.textContent = months[now.getMonth()];
}
setInterval(updateNeumorphicClock, 1000);
updateNeumorphicClock();

// Start timers
setInterval(updateCountdown, 1000);
setInterval(updateCurrentTime, 1000);
window.addEventListener('load', () => {
    updateCountdown();
    updateCurrentTime();
});