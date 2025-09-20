// Accessing all the boxes here
let boxes = window.document.querySelectorAll(".box");
// Accessing the reset button
let resetBtn = window.document.querySelector(".resetBtn");
// Accessing the reset button, message container, and the message
let newBtn = window.document.querySelector(".newBtn");
let winMessage = window.document.querySelector(".Winner");
let msgContainer = window.document.querySelector(".message");

// Declaring the turn
let turnX = true;

// Creating all the win patterns
const winPattern = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

// Function to reset or restart the game
const resetOrWinGame = () => {
    turnX = true;
    ena_box();
};

// Adding event listener for each box
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnX === true) {
            box.innerText = "✖️";
            box.style.fontWeight = "Bold";
            turnX = false;
            box.disabled = true;
        } else {
            box.innerText = "🟢";
            box.style.fontWeight = "Bold";
            turnX = true;
            box.disabled = true;
        }
        checkWinner();
    });
});

// Disable all boxes
const dis_box = () => {
    for (box of boxes) {
        box.disabled = true;
    }
};

// Enable all boxes and reset their text
const ena_box = () => {
    for (box of boxes) {
        box.disabled = false;
        box.innerText = "";
        msgContainer.classList.add("hide");
    }
};

// Show the winner message
const showWinner = (pos1) => {
    winMessage.innerText = `Congratulations, the winner is ${pos1}`;
    msgContainer.classList.remove("hide");
    dis_box();
};

// Show draw message
const ShowDrawer = () => {
    winMessage.innerText = `The game is Draw`;
    msgContainer.classList.remove("hide");
    dis_box();
};

// Check if there is a winner or a draw
const checkWinner = () => {
    // Check for a winner
    for (let i of winPattern) {
        let pos1 = boxes[i[0]].innerText;
        let pos2 = boxes[i[1]].innerText;
        let pos3 = boxes[i[2]].innerText;

        if (pos1 !== "" && pos2 !== "" && pos3 !== "") {
            if (pos1 === pos2 && pos2 === pos3) {
                showWinner(pos1);
                return; // Exit after showing the winner
            }
        }
    }

    // Check for a draw (all boxes filled and no winner)
    const isBoardFull = Array.from(boxes).every(box => box.innerText !== "");
    if (isBoardFull) {
        ShowDrawer();
    }
};

// Event listeners for the reset button and new game button
resetBtn.addEventListener("click", resetOrWinGame);
newBtn.addEventListener("click", resetOrWinGame);
