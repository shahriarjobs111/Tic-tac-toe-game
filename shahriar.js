const cells = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const winnerMessage = document.getElementById("winner-message");
const restartButton = document.getElementById("restartButton");

let isPlayerTwoTurn = false;

// List of all countries and their capitals (You can add more if needed)
const countriesAndCapitals = [
    { country: "Afghanistan", capital: "Kabul" },
{ country: "Armenia", capital: "Yerevan" },
{ country: "Azerbaijan", capital: "Baku" },
{ country: "Bahrain", capital: "Manama" },
{ country: "Bangladesh", capital: "Dhaka" },
{ country: "Bhutan", capital: "Thimphu" },
{ country: "Brunei", capital: "Bandar Seri Begawan" },
{ country: "Cambodia", capital: "Phnom Penh" },
{ country: "China", capital: "Beijing" },
{ country: "Cyprus", capital: "Nicosia" },
{ country: "Georgia", capital: "Tbilisi" },
{ country: "India", capital: "New Delhi" },
{ country: "Indonesia", capital: "Jakarta" },
{ country: "Iran", capital: "Tehran" },
{ country: "Iraq", capital: "Baghdad" },
{ country: "Israel", capital: "Jerusalem" },
{ country: "Japan", capital: "Tokyo" },
{ country: "Jordan", capital: "Amman" },
{ country: "Kazakhstan", capital: "Nur-Sultan" },
{ country: "Kuwait", capital: "Kuwait City" },
{ country: "Kyrgyzstan", capital: "Bishkek" },
{ country: "Laos", capital: "Vientiane" },
{ country: "Lebanon", capital: "Beirut" },
{ country: "Malaysia", capital: "Kuala Lumpur" },
{ country: "Maldives", capital: "Malé" },
{ country: "Mongolia", capital: "Ulaanbaatar" },
{ country: "Myanmar", capital: "Naypyidaw" },
{ country: "Nepal", capital: "Kathmandu" },
{ country: "North Korea", capital: "Pyongyang" },
{ country: "Oman", capital: "Muscat" },
{ country: "Pakistan", capital: "Islamabad" },
{ country: "Palestine", capital: "East Jerusalem" },
{ country: "Philippines", capital: "Manila" },
{ country: "Qatar", capital: "Doha" },
{ country: "Russia", capital: "Moscow" },
{ country: "Saudi Arabia", capital: "Riyadh" },
{ country: "Singapore", capital: "Singapore" },
{ country: "South Korea", capital: "Seoul" },
{ country: "Sri Lanka", capital: "Sri Jayawardenepura Kotte" },
{ country: "Syria", capital: "Damascus" },
{ country: "Tajikistan", capital: "Dushanbe" },
{ country: "Thailand", capital: "Bangkok" },
{ country: "Timor-Leste", capital: "Dili" },
{ country: "Turkey", capital: "Ankara" },
{ country: "Turkmenistan", capital: "Ashgabat" },
{ country: "United Arab Emirates", capital: "Abu Dhabi" },
{ country: "Uzbekistan", capital: "Tashkent" },
{ country: "Vietnam", capital: "Hanoi" },
{ country: "Yemen", capital: "Sana'a" }
 // Add more country-capital pairs as needed
];

let playerOne, playerTwo;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function startGame() {
    isPlayerTwoTurn = false;
    
    // Randomly select a country for player one and assign its capital to player two
    const randomIndex = Math.floor(Math.random() * countriesAndCapitals.length);

    playerOne = countriesAndCapitals[randomIndex].country;
    playerTwo = countriesAndCapitals[randomIndex].capital;
    
    cells.forEach(cell => {
        cell.classList.remove("playerOne");
        cell.classList.remove("playerTwo");
        cell.innerText = '';
        cell.removeEventListener("click", handleClick);
        cell.addEventListener("click", handleClick, { once: true });
    });
    winnerMessage.innerText = "";
    board.classList.remove("disabled");
}

function handleClick(e) {
    const cell = e.target;
    const currentClass = isPlayerTwoTurn ? "playerTwo" : "playerOne";
    placeMark(cell, currentClass);
    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
    }
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
    cell.innerText = currentClass === "playerOne" ? playerOne : playerTwo;
}

function swapTurns() {
    isPlayerTwoTurn = !isPlayerTwoTurn;
}

function checkWin(currentClass) {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return cells[index].classList.contains(currentClass);
        });
    });
}

function endGame(draw) {
    if (draw) {
        winnerMessage.innerText = "It's a Draw!";
    } else {
        winnerMessage.innerText = `${isPlayerTwoTurn ? playerTwo : playerOne} Wins!`;
    }
    board.classList.add("disabled");
}

function isDraw() {
    return [...cells].every(cell => {
        return cell.classList.contains("playerOne") || cell.classList.contains("playerTwo");
    });
}

restartButton.addEventListener("click", startGame);

startGame();
