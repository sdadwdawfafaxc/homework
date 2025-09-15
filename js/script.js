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

// Reset countdown (if needed)
function resetCountdown() {
    document.getElementById('days').textContent = '0';
    document.getElementById('hours').textContent = '0';
    document.getElementById('minutes').textContent = '0';
    document.getElementById('seconds').textContent = '0';
    document.getElementById('countdown').style.display = 'none';
    document.getElementById('birthdayMessage').style.display = 'block';
}

// Toggle countdown visibility
function toggleCountdown() {
    const countdown = document.getElementById('countdown');
    if (countdown.style.display === 'none') {
        countdown.style.display = 'grid';
        document.getElementById('birthdayMessage').style.display = 'none';
    } else {
        countdown.style.display = 'none';
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
    const deg = ((hours % 12) * 30) + (minutes * 0.5) - 80;
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
    const btn1 = document.getElementById('f1');
    const lockMsg = document.getElementById('formLockMsg');
    const lockMsg1 = document.getElementById('f2')
    const now = new Date();
    const isBirthday = now.getDate() === 27  && now.getMonth() === 8; // กันยายน = 8

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

// Age calculation
function updateAge() {
    // กำหนดวันเกิด (ปีที่ต้องการ เช่น 2010)
    const birthYear = 2010; // เปลี่ยนเป็นปีเกิดจริง
    const birthMonth = 8;   // กันยายน = 8
    const birthDay = 27;

    const now = new Date();
    let age = now.getFullYear() - birthYear;
    // ถ้ายังไม่ถึงวันเกิดปีนี้ ให้ลบอายุลง 1
    if (
        now.getMonth() < birthMonth ||
        (now.getMonth() === birthMonth && now.getDate() < birthDay)
    ) {
        age--;
    }
    document.getElementById('ageValue').textContent = age;
}

//age calculation on load
updateAge();

// Special messages
const birthdayMessage = "วันเกิดเธอปีนี้ ขอให้มีความสุขมากๆ พบเจอแต่สิ่งดีๆ สมหวังกับทุกสิ่ง ที่เธอปรารถนา ไม่มีเรื่องอะไรที่ทำให้ต้องทุกข์ใจ มีแต่ความสุข ความสดใสในทุกๆ วันนะ 🌸✨";
const normalMessage = "ข้อความนี้ยังไม่ใช่ข้อความจริง 😊";
const normalTitle = "";
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
        subtitleEl.textContent = isBirthday ? "ขอให้ปีนี้เต็มไปด้วยรอยยิ้ม ความสุข และความรัก" : normalTitle;
    }
}

setInterval(updateCountdown, 1000);
setInterval(updateCurrentTime, 1000);
setInterval(updateSpecialMessage, 1000);
setInterval(updateAge, 1000);
window.addEventListener('load', () => {
    updateCountdown();
    updateCurrentTime();
    updateFormAccess();
    updateSpecialMessage();
    updateAge();

    // Hide loading overlay with animation
    const overlay = document.getElementById('loading-overlay');
    if (overlay) {
        overlay.style.opacity = '0';
        setTimeout(() => {
            overlay.style.display = 'none';

            // หลังจาก loading overlay หายแล้ว ค่อยเช็ควันเกิดและแสดงเอฟเฟกต์
            checkBirthday();
        }, 700);
    } else {
        // ถ้าไม่มี overlay ให้เช็ควันเกิดทันที
        checkBirthday();
    }
});

// Theme mode (ก่อนถึงเวลา = ขาวดำ, ถึงเวลา = ปกติ)
function updateTheme() {
    const now = new Date();
    const currentYear = now.getFullYear();
    const birthday = new Date(currentYear, 8, 27); // 27 กันยายน

    // ถ้าเลยวันเกิดปีนี้ไปแล้ว ให้ถือว่าเป็นโหมดปกติ
    const isBeforeBirthday = now < birthday;

    if (isBeforeBirthday) {
        // โหมดขาวดำ
        document.body.classList.add('grayscale-mode');
        document.body.classList.remove('normal-mode');
    } else {
        // โหมดปกติ
        document.body.classList.remove('grayscale-mode');
        document.body.classList.add('normal-mode');
    }
}

// เรียกใช้งานทุก ๆ 1 วิ
setInterval(updateTheme, 1000);
updateTheme();



// เก็บสถานะว่าแสดง Happy Birthday แล้วหรือยัง
let hasCelebrated = false;

function checkBirthday() {
    const now = new Date();
    const isBirthday = (now.getDate() === 27 && now.getMonth() === 8); // ก.ย. = 8

    if (isBirthday) {
        document.body.classList.remove('grayscale-mode');
        document.body.classList.add('normal-mode');

        if (!hasCelebrated) {
            playBirthdayEffect();
            hasCelebrated = true;
        }
    } else {
        document.body.classList.add('grayscale-mode');
        document.body.classList.remove('normal-mode');
    }
}

// ฟังก์ชันแสดงเอฟเฟกต์ Happy Birthday
function playBirthdayEffect() {
    // ข้อความ Happy Birthday
    const msg = document.createElement('div');
    msg.className = 'birthday-effect';
    msg.innerHTML = '🎉 สุขสันต์วันเกิดนะคนเก่ง! 🎂<br>ขอให้มีความสุขมากๆ💖';
    document.body.appendChild(msg);

    // โปรย confetti
    if (typeof confetti === "function") {
        confetti({ particleCount: 200, spread: 90, origin: { y: 0.6 } });

        // ยิงเพิ่มอีก 3 รอบ
        let count = 0;
        const interval = setInterval(() => {
            confetti({ particleCount: 270, spread: 120, origin: { y: 0.6 } });
            count++;
            if (count > 2) clearInterval(interval);
        }, 1000);
    }
}

// เมื่อโหลดเว็บเสร็จ
window.addEventListener('load', () => {
    checkBirthday();
});
