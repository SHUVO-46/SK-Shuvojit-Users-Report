let currentUser = null;

// আগেই নির্দিষ্ট OK UID লিস্ট
const okUidList = [
    "12345",
    "67890",
    "11111",
    "22222",
    "33333"
    // এখানেই তুমি যত UID ঠিক করতে চাও বসিয়ে রাখো
];

function login() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    if (users[username] && users[username].password === password) {
        currentUser = users[username];
        document.getElementById('login-section').style.display = 'none';
        document.getElementById('main-section').style.display = 'block';
        document.getElementById('main-section').insertAdjacentHTML('afterbegin', `<h2>Welcome, ${currentUser.name}</h2>`);
    } else {
        document.getElementById('login-error').innerText = 'Invalid username or password!';
    }
}

function processUID() {
    const uidText = document.getElementById('uid-input').value.trim();
    let uidList = uidText.split(/\s+/).filter(uid => uid);

    const originalCount = uidList.length;
    // ডুপ্লিকেট বাদ দিয়ে ইউনিক লিস্ট
    uidList = [...new Set(uidList)];
    const duplicateCount = originalCount - uidList.length;

    let okCount = 0;
    let returnCount = 0;
    const tbody = document.querySelector("#result-table tbody");
    tbody.innerHTML = '';

    uidList.forEach(uid => {
        const status = okUidList.includes(uid) ? '✅ OK' : '🚫 Back';

        if (status === '✅ OK') okCount++;
        else returnCount++;

        const row = `<tr style="color: ${status === '✅ OK' ? 'green' : 'red'}">
                        <td>${uid}</td>
                        <td>${status}</td>
                    </tr>`;
        tbody.insertAdjacentHTML('beforeend', row);
    });

    document.getElementById('total-uid').innerText = uidList.length;
    document.getElementById('ok-uid').innerText = okCount;
    document.getElementById('return-uid').innerText = returnCount;
    document.getElementById('duplicate-count').innerText = duplicateCount;

    const memberRate = 5;
    const id100Rate = 4;

    let totalAmount = 0;
    if (uidList.length >= 100) {
        totalAmount = okCount * id100Rate;
    } else {
        totalAmount = okCount * memberRate;
    }

    animateAmount(totalAmount);
}

function animateAmount(targetAmount) {
    const amountEl = document.getElementById('amount');
    let currentAmount = 0;
    const increment = Math.max(1, Math.floor(targetAmount / 100));

    const interval = setInterval(() => {
        currentAmount += increment;
        if (currentAmount >= targetAmount) {
            currentAmount = targetAmount;
            clearInterval(interval);
        }
        amountEl.innerText = currentAmount;
    }, 10);
}
