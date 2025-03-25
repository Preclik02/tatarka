let number = 0;
let curency = 0;
let autoTatarkaCount = 0;
let autoTatarkaCost = 100; // Initial cost
let clickBoost = 1; // Default click power
let tatarkaBoostCost = 50; // Initial cost of boost

window.onload = function () {
    let savedNumber = localStorage.getItem("number");
    let savedCurency = localStorage.getItem("curency");
    let savedAutoTatarkaCount = localStorage.getItem("autoTatarkaCount");
    let savedAutoTatarkaCost = localStorage.getItem("autoTatarkaCost");
    let savedClickBoost = localStorage.getItem("clickBoost");
    let savedTatarkaBoostCost = localStorage.getItem("tatarkaBoostCost");

    if (savedNumber !== null) {
        number = parseInt(savedNumber);
        document.getElementById("cislo").textContent = "Pocet: " + number;
    }
    
    if (savedCurency !== null) {
        curency = parseInt(savedCurency);
        document.getElementById("tatarka").textContent = "Tatarek: " + curency;
    }

    if (savedAutoTatarkaCount !== null) {
        autoTatarkaCount = parseInt(savedAutoTatarkaCount);
        for (let i = 0; i < autoTatarkaCount; i++) {
            startAutoTatarka();
        }
    }

    if (savedAutoTatarkaCost !== null) {
        autoTatarkaCost = parseInt(savedAutoTatarkaCost);
    }

    if (savedClickBoost !== null) {
        clickBoost = parseInt(savedClickBoost);
    }

    if (savedTatarkaBoostCost !== null) {
        tatarkaBoostCost = parseInt(savedTatarkaBoostCost);
    }

    updateButtonText();
};

function saveProgress() {
    localStorage.setItem("number", number);
    localStorage.setItem("curency", curency);
    localStorage.setItem("autoTatarkaCount", autoTatarkaCount);
    localStorage.setItem("autoTatarkaCost", autoTatarkaCost);
    localStorage.setItem("clickBoost", clickBoost);
    localStorage.setItem("tatarkaBoostCost", tatarkaBoostCost);
}

document.getElementById("add").onclick = function () {
    number += 1 * clickBoost; // Apply click boost here
    curency += 1 * clickBoost;
    document.getElementById("cislo").textContent = "Pocet: " + number;
    document.getElementById("tatarka").textContent = "Tatarek: " + curency;
    saveProgress();
};

function startAutoTatarka() {
    setInterval(function () {
        curency += 1;
        document.getElementById("tatarka").textContent = "Tatarek: " + curency;
        saveProgress();
    }, 1000);
}

document.getElementById("auto_tatarka").onclick = function () {
    if (curency >= autoTatarkaCost) {
        curency -= autoTatarkaCost;
        autoTatarkaCount++;
        autoTatarkaCost += 25; // Increase cost by 25

        document.getElementById("tatarka").textContent = "Tatarek: " + curency;
        saveProgress();
        startAutoTatarka();
        updateButtonText();
    }
};

// Implement the Tatarka Booster functionality
document.getElementById("tatarka_boost").onclick = function () {
    if (curency >= tatarkaBoostCost) {
        curency -= tatarkaBoostCost;
        clickBoost += 1; // Increase the click power by 1
        tatarkaBoostCost += 50; // Increase cost by 50 for next boost

        document.getElementById("tatarka").textContent = "Tatarek: " + curency;
        saveProgress();
        updateButtonText();
    }
};

function updateButtonText() {
    document.getElementById("auto_tatarka").textContent = `Auto Tatarka (Cost: ${autoTatarkaCost})`;
    document.getElementById("tatarka_boost").textContent = `Tatarka Booster (Cost: ${tatarkaBoostCost})`;
}
