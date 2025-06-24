let currentUser = null;

function login() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        currentUser = user;
        document.getElementById("login-section").style.display = "none";
        document.getElementById("main-section").style.display = "block";
        document.getElementById("user-name").innerText = `Welcome, ${user.name}`;
        playWelcomeVoice(user.name);
    } else {
        document.getElementById("login-error").innerText = "Invalid credentials!";
    }
}

function processUID() {
    const uidText = document.getElementById("uid-input").value.trim();
    const uids = uidText.split("\n").filter(Boolean);

    const total = uids.length;
    const ok = Math.floor(Math.random() * total);
    const returned = total - ok;

    document.getElementById("total-uid").innerText = total;
    document.getElementById("ok-uid").innerText = ok;
    document.getElementById("return-uid").innerText = returned;

    const memberRate = parseFloat(document.getElementById("member-rate").innerText);
    const bulkRate = parseFloat(document.getElementById("bulk-rate").innerText);
    const rate = total >= 100 ? bulkRate : memberRate;
    const totalAmount = total * rate;

    animateAmount(totalAmount);

    const tableBody = document.querySelector("#result-table tbody");
    tableBody.innerHTML = "";
    uids.forEach(uid => {
        const status = Math.random() < 0.5 ? "✅ OK" : "🚫 Return";
        const row = `<tr><td>${uid}</td><td>${status}</td></tr>`;
        tableBody.innerHTML += row;
    });
}

function animateAmount(amount) {
    const amountEl = document.getElementById("amount");
    let current = 0;
    const step = Math.ceil(amount / 50);

    const interval = setInterval(() => {
        current += step;
        if (current >= amount) {
            current = amount;
            clearInterval(interval);
        }
        amountEl.innerText = current;
    }, 20);
}

function playWelcomeVoice(name) {
    const msg = new SpeechSynthesisUtterance(`শুভজিৎ এর ওয়ার্কার ইনফরমেশন সেক্টরে আপনাকে স্বাগতম ${name}`);
    msg.lang = 'bn-BD';
    window.speechSynthesis.speak(msg);
}