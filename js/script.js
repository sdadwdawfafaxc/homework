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

// Lock special form button except 27 September
function updateFormAccess() {
    const btn = document.getElementById('specialFormBtn');
    const lockMsg = document.getElementById('formLockMsg');
    const now = new Date();
    const isBirthday = now.getDate() === 27 && now.getMonth() === 8; // กันยายน = 8

    if (!isBirthday) {
        btn.classList.add('disabled');
        btn.setAttribute('tabindex', '-1');
        btn.setAttribute('aria-disabled', 'true');
        btn.style.pointerEvents = 'none';
        btn.style.opacity = '0.5';
        lockMsg.style.display = 'block';
    } else {
        btn.classList.remove('disabled');
        btn.removeAttribute('tabindex');
        btn.removeAttribute('aria-disabled');
        btn.style.pointerEvents = 'auto';
        btn.style.opacity = '1';
        lockMsg.style.display = 'none';
    }
}

// Special messages
const birthdayMessage = "วันเกิดเธอปีนี้ ขอให้มีความสุขมากๆ พบเจอแต่สิ่งดีๆ สมหวังกับทุกสิ่ง ที่เธอปรารถนา ไม่มีเรื่องอะไรที่ทำให้ต้องทุกข์ใจ มีแต่ความสุข ความสดใสในทุกๆ วันนะ 🌸✨";
const normalMessage = "ข้อความนี้ยังไม่ใช่ข้อความจริง 😊";
const normalTitle = "ขอให้ปีนี้เต็มไปด้วยรอยยิ้ม ความสุข และความรัก";
const birthdayTitle = "สุขสันต์วันเกิดนะคนเก่ง 💖";

// เปลี่ยนข้อความพิเศษและหัวข้อหลักตามวันที่
function updateSpecialMessage() {
    const msgEl = document.getElementById('specialMessage');
    const titleEl = document.querySelector('.main-title h1');
    const subtitleEl = document.querySelector('.main-title .subtitle');
    const now = new Date();
    const isBirthday = now.getDate() === 27 && now.getMonth() === 8; // กันยายน = 8

    if (msgEl) {
        msgEl.textContent = isBirthday ? birthdayMessage : normalMessage;
    }
    if (titleEl) {
        titleEl.textContent = isBirthday ? birthdayTitle : "ข้อความนี้ยังไม่ใช่ข้อความจริง";
    }
    if (subtitleEl) {
        subtitleEl.textContent = isBirthday ? "" : normalTitle;
    }
}

setInterval(updateCountdown, 1000);
setInterval(updateCurrentTime, 1000);
setInterval(updateSpecialMessage, 1000);
window.addEventListener('load', () => {
    updateCountdown();
    updateCurrentTime();
    updateFormAccess();
    updateSpecialMessage();

    // Hide loading overlay with animation
    const overlay = document.getElementById('loading-overlay');
    if (overlay) {
        overlay.style.opacity = '0';
        setTimeout(() => {
            overlay.style.display = 'none';
        }, 700);
    }
});