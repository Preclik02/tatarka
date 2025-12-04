let number = 0;
let curency = 0;
let autoTatarkaCount = 0;
let autoTatarkaCost = 500;
let clickBoost = 1;
let tatarkaBoostCost = 50;
let goldenTatarkaCost = 1000000000000; // Initial rebirth cost

let autoTatarkaInterval;

window.onload = function () {
    let savedNumber = localStorage.getItem("number");
    let savedCurency = localStorage.getItem("curency");
    let savedAutoTatarkaCount = localStorage.getItem("autoTatarkaCount");
    let savedAutoTatarkaCost = localStorage.getItem("autoTatarkaCost");
    let savedClickBoost = localStorage.getItem("clickBoost");
    let savedTatarkaBoostCost = localStorage.getItem("tatarkaBoostCost");
    let savedGoldenTatarkaCost = localStorage.getItem("goldenTatarkaCost");

    if (savedNumber !== null) number = Number(savedNumber);
    if (savedCurency !== null) curency = Number(savedCurency);
    if (savedAutoTatarkaCount !== null) autoTatarkaCount = Number(savedAutoTatarkaCount);
    if (savedAutoTatarkaCost !== null) autoTatarkaCost = Number(savedAutoTatarkaCost);
    if (savedClickBoost !== null) clickBoost = Number(savedClickBoost);
    if (savedTatarkaBoostCost !== null) tatarkaBoostCost = Number(savedTatarkaBoostCost);
    if (savedGoldenTatarkaCost !== null) goldenTatarkaCost = Number(savedGoldenTatarkaCost);

    startAutoTatarka();
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

// Single interval, adds total autoTatarkaCount * 25 per second
function startAutoTatarka() {
    if (autoTatarkaInterval) clearInterval(autoTatarkaInterval);

    autoTatarkaInterval = setInterval(function () {
        curency += autoTatarkaCount * 25;
        updateUI();
        saveProgress();
    }, 1000);
}

document.getElementById("auto_tatarka").onclick = function () {
    if (curency >= autoTatarkaCost) {
        curency -= autoTatarkaCost;
        autoTatarkaCount++;
        autoTatarkaCost *= 3;

        startAutoTatarka(); // Restart interval with new count
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

document.getElementById("golden_tataka").onclick = function () {
    if (curency >= goldenTatarkaCost) {
        curency -= goldenTatarkaCost;
        goldenTatarkaCost += 100000000000000; // Increase cost by 100 trillion

        // Reset all except clickBoost (which increases)
        number = 0;
        autoTatarkaCount = 0;
        autoTatarkaCost = 500;
        clickBoost *= 10;
        tatarkaBoostCost = 50;
        curency = 0;

        startAutoTatarka(); // Reset auto interval with zero count
        updateUI();
        saveProgress();

        alert(`You've purchased Golden Tatarka! Your click boost is now ${clickBoost}×, and the next one costs ${goldenTatarkaCost}!`);
        // No reload needed
    } else {
        alert(`You need ${goldenTatarkaCost} Tatarek to purchase Golden Tatarka!`);
    }
};

document.getElementById("reset").onclick = function () {
    number = 0;
    curency = 0;
    autoTatarkaCount = 0;
    autoTatarkaCost = 500;
    clickBoost = 1;
    tatarkaBoostCost = 50;
    goldenTatarkaCost = 1000000000000;

    localStorage.clear();

    startAutoTatarka(); // Reset auto interval
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
