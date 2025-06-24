let currentUser = null;

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
    const uidList = uidText.split(/\s+/).filter(uid => uid);

    let okCount = 0;
    let returnCount = 0;
    const tbody = document.querySelector("#result-table tbody");
    tbody.innerHTML = '';

    uidList.forEach(uid => {
        const status = Math.random() < 0.7 ? '✅ OK' : '🚫 Return';

        if (status === '✅ OK') okCount++;
        else returnCount++;

        const row = `<tr>
                        <td>${uid}</td>
                        <td>${status}</td>
                    </tr>`;
        tbody.insertAdjacentHTML('beforeend', row);
    });

    document.getElementById('total-uid').innerText = uidList.length;
    document.getElementById('ok-uid').innerText = okCount;
    document.getElementById('return-uid').innerText = returnCount;

    const memberRate = 5; // Member Rate
    const id100Rate = 4;  // 100+ ID Rate

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
