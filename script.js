const okUIDs = ["111", "222", "333", "444"];  // এখানে আগে থেকে দেওয়া OK UID গুলো থাকবে

function login() {
    const u = document.getElementById("username").value.trim();
    const p = document.getElementById("password").value.trim();
    const user = users.find(x => x.username === u && x.password === p);
    
    if (user) {
        document.getElementById("login-section").style.display = "none";
        document.getElementById("main-section").style.display = "block";
        document.getElementById("welcome-text").innerText = `Welcome, ${user.name}`;
        document.getElementById("welcome-audio").play();
    } else {
        document.getElementById("login-error").innerText = "Invalid credentials!";
    }
}

function processUID() {
    const input = document.getElementById("uid-input").value.trim();
    if (!input) return;

    let uidList = input.split(/\s+/);
    
    const totalUIDs = uidList.length;
    const uniqueUIDs = [...new Set(uidList)];
    const duplicateCount = totalUIDs - uniqueUIDs.length;
    
    let okCount = 0;
    let backCount = 0;
    const tbody = document.querySelector("#result-table tbody");
    tbody.innerHTML = "";

    uniqueUIDs.forEach(uid => {
        const row = document.createElement("tr");
        const uidCell = document.createElement("td");
        const statusCell = document.createElement("td");

        uidCell.innerText = uid;
        
        if (okUIDs.includes(uid)) {
            statusCell.innerText = "✅ OK";
            statusCell.className = "ok";
            okCount++;
        } else {
            statusCell.innerText = "🚫 Back";
            statusCell.className = "back";
            backCount++;
        }
        
        row.appendChild(uidCell);
        row.appendChild(statusCell);
        tbody.appendChild(row);
    });

    document.getElementById("total-uid").innerText = uniqueUIDs.length;
    document.getElementById("ok-uid").innerText = okCount;
    document.getElementById("back-uid").innerText = backCount;
    document.getElementById("duplicate-count").innerText = duplicateCount;

    const memberRate = parseFloat(document.getElementById("member-rate").innerText);
    const bulkRate = parseFloat(document.getElementById("bulk-rate").innerText);
    const rate = okCount >= 100 ? bulkRate : memberRate;
    
    animateAmount(okCount * rate);
}

function animateAmount(targetAmount) {
    let current = 0;
    const amountEl = document.getElementById("amount");
    const interval = setInterval(() => {
        current += Math.ceil(targetAmount / 50);
        if (current >= targetAmount) {
            current = targetAmount;
            clearInterval(interval);
        }
        amountEl.innerText = current.toFixed(2);
    }, 20);
}
