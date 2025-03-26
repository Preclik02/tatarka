let number = 0;
let curency = 0;
let autoTatarkaCount = 0;
let autoTatarkaCost = 500; // Initial cost set to 500
let clickBoost = 1;
let tatarkaBoostCost = 50;
let goldenTatarkaPurchased = false;  // To track if Golden Tatarka has been purchased

window.onload = function () {
    let savedNumber = localStorage.getItem("number");
    let savedCurency = localStorage.getItem("curency");
    let savedAutoTatarkaCount = localStorage.getItem("autoTatarkaCount");
    let savedAutoTatarkaCost = localStorage.getItem("autoTatarkaCost");
    let savedClickBoost = localStorage.getItem("clickBoost");
    let savedTatarkaBoostCost = localStorage.getItem("tatarkaBoostCost");
    let savedGoldenTatarkaPurchased = localStorage.getItem("goldenTatarkaPurchased");

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

    if (savedGoldenTatarkaPurchased !== null) {
        goldenTatarkaPurchased = savedGoldenTatarkaPurchased === 'true';  // Convert to boolean
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
    localStorage.setItem("goldenTatarkaPurchased", goldenTatarkaPurchased);
}

document.getElementById("add").onclick = function () {
    number += clickBoost;
    curency += clickBoost;
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
        autoTatarkaCost *= 3;  // Increase the cost by multiplying by 3

        document.getElementById("tatarka").textContent = "Tatarek: " + curency;
        saveProgress();
        startAutoTatarka();
        updateButtonText();
    }
};

document.getElementById("tatarka_boost").onclick = function () {
    if (curency >= tatarkaBoostCost) {
        curency -= tatarkaBoostCost;
        clickBoost *= 2;
        tatarkaBoostCost = Math.floor(tatarkaBoostCost * 2.5);

        document.getElementById("tatarka").textContent = "Tatarek: " + curency;
        saveProgress();
        updateButtonText();
    }
};

document.getElementById("golden_tataka").onclick = function () {
    if (curency >= 1000000000000 && !goldenTatarkaPurchased) { // Check if Golden Tatarka is affordable and not yet purchased
        curency -= 1000000000000; // Deduct 1 trillion Tatarek
        goldenTatarkaPurchased = true;

        // Reset everything and apply 100x boost
        number = 0;
        autoTatarkaCount = 0;
        autoTatarkaCost = 500;
        clickBoost = 100;  // Set clickBoost to 100x
        tatarkaBoostCost = 50;  // Reset tatarkaBoostCost

        document.getElementById("cislo").textContent = "Pocet: " + number;
        document.getElementById("tatarka").textContent = "Tatarek: " + curency;

        saveProgress();
        updateButtonText();
        alert("Congratulations! You've purchased Golden Tatarka. All your progress has reset, but you now have a 100x boost!");
    } else if (goldenTatarkaPurchased) {
        alert("You already purchased the Golden Tatarka!");
    } else {
        alert("You need 1 trillion Tatarek to purchase Golden Tatarka!");
    }
};

function updateButtonText() {
    document.getElementById("auto_tatarka").textContent = `Auto Tatarka (Cost: ${autoTatarkaCost})`;
    document.getElementById("tatarka_boost").textContent = `Tatarka Booster (Cost: ${tatarkaBoostCost})`;
    document.getElementById("golden_tataka").textContent = `GOLDEN TATARKA (Cost: 1 Trillion)`;
}

