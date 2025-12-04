let number = 0;
let curency = 0;
let autoTatarkaCount = 0;
let autoTatarkaCost = 500;
let clickBoost = 1;
let tatarkaBoostCost = 50;
let goldenTatarkaCost = 1000000000000; // Initial rebirth cost

window.onload = function () {
    let savedNumber = localStorage.getItem("number");
    let savedCurency = localStorage.getItem("curency");
    let savedAutoTatarkaCount = localStorage.getItem("autoTatarkaCount");
    let savedAutoTatarkaCost = localStorage.getItem("autoTatarkaCost");
    let savedClickBoost = localStorage.getItem("clickBoost");
    let savedTatarkaBoostCost = localStorage.getItem("tatarkaBoostCost");
    let savedGoldenTatarkaCost = localStorage.getItem("goldenTatarkaCost");

    if (savedNumber !== null) number = parseInt(savedNumber);
    if (savedCurency !== null) curency = parseInt(savedCurency);
    if (savedAutoTatarkaCount !== null) autoTatarkaCount = parseInt(savedAutoTatarkaCount);
    if (savedAutoTatarkaCost !== null) autoTatarkaCost = parseInt(savedAutoTatarkaCost);
    if (savedClickBoost !== null) clickBoost = parseInt(savedClickBoost);
    if (savedTatarkaBoostCost !== null) tatarkaBoostCost = parseInt(savedTatarkaBoostCost);
    if (savedGoldenTatarkaCost !== null) goldenTatarkaCost = parseInt(savedGoldenTatarkaCost);

    for (let i = 0; i < autoTatarkaCount; i++) {
        startAutoTatarka();
    }

    updateUI();
};

function saveProgress() {
    localStorage.setItem("number", number);
    localStorage.setItem("curency", curency);
    localStorage.setItem("autoTatarkaCount", autoTatarkaCount);
    localStorage.setItem("autoTatarkaCost", autoTatarkaCost);
    localStorage.setItem("clickBoost", clickBoost);
    localStorage.setItem("tatarkaBoostCost", tatarkaBoostCost);
    localStorage.setItem("goldenTatarkaCost", goldenTatarkaCost);
}

document.getElementById("add").onclick = function () {
    number += clickBoost;
    curency += clickBoost;
    updateUI();
    saveProgress();
};

// Auto Tatarka now gives +10 per second instead of +1
function startAutoTatarka() {
    setInterval(function () {
        curency += 25; // Increased auto value from 1 to 10
        updateUI();
        saveProgress();
    }, 1000);
}

document.getElementById("auto_tatarka").onclick = function () {
    if (curency >= autoTatarkaCost) {
        curency -= autoTatarkaCost;
        autoTatarkaCount++;
        autoTatarkaCost *= 3; // Cost increases

        startAutoTatarka();
        updateUI();
        saveProgress();
    }
};

document.getElementById("tatarka_boost").onclick = function () {
    if (curency >= tatarkaBoostCost) {
        curency -= tatarkaBoostCost;
        clickBoost *= 2;
        tatarkaBoostCost = Math.floor(tatarkaBoostCost * 3);

        updateUI();
        saveProgress();
    }
};

// Golden Tatarka (Rebirth) - Can be rebought, cost increases by 1 trillion each time
document.getElementById("golden_tataka").onclick = function () {
    if (curency >= goldenTatarkaCost) {
        curency -= goldenTatarkaCost;
        goldenTatarkaCost += 100000000000000; // Increase cost by 1 trillion

        // Reset all values but keep increasing click power
        number = 0;
        autoTatarkaCount = 0;
        autoTatarkaCost = 500;
        clickBoost *= 10;
        tatarkaBoostCost = 50;
        curency = 0;

        updateUI();
        saveProgress();
        location.reload();
        alert(`You've purchased Golden Tatarka! Your click boost is now ${clickBoost}×, and the next one costs ${goldenTatarkaCost}!`);
    } else {
        alert(`You need ${goldenTatarkaCost} Tatarek to purchase Golden Tatarka!`);
    }
};

// Reset Button: Clears **everything** including rebirths
document.getElementById("reset").onclick = function () {
    number = 0;
    curency = 0;
    autoTatarkaCount = 0;
    autoTatarkaCost = 500;
    clickBoost = 1;
    tatarkaBoostCost = 50;
    goldenTatarkaCost = 1000000000000; // Reset rebirth cost

    localStorage.clear(); // Clear all saved progress

    updateUI();
    alert("Game progress has been reset!");
};

function updateUI() {
    document.getElementById("cislo").textContent = "Pocet: " + number;
    document.getElementById("tatarka").textContent = "Tatarek: " + curency;
    document.getElementById("auto_tatarka").textContent = `Auto Tatarka (Cost: ${autoTatarkaCost})`;
    document.getElementById("tatarka_boost").textContent = `Tatarka Booster (Cost: ${tatarkaBoostCost})`;
    document.getElementById("golden_tataka").textContent = `GOLDEN TATARKA (Cost: ${goldenTatarkaCost})`;
}

