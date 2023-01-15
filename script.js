const grid = document.getElementById("grid");
const blackBtn = document.getElementById("blackBtn");
const colourfulBtn = document.getElementById("colorfulBtn");
const eraserBtn = document.getElementById("eraserBtn");
const resetBtn = document.getElementById("resetBtn");
const sizeValue = document.getElementById("sizeSketchpad");
const sizeSlider = document.getElementById("sizeSlider");
const default_colour = "#0f2027";
const default_mode = "colour";
const default_size = 16;

let currentMode;

colourfulBtn.addEventListener("click", () => {
  currentMode = "colourful";
});
blackBtn.addEventListener("click", () => {
  currentMode = default_mode;
});
eraserBtn.addEventListener("click", () => {
  currentMode = "eraser";
});
resetBtn.addEventListener("click", reset);

sizeSlider.addEventListener("input", updateSizeValue);

function createNewGrid() {
  const gridSize = sizeSlider.value;

  for (let i = 0; i < gridSize * gridSize; i++) {
    const gridCell = document.createElement("div");
    gridCell.classList.add("grid--cell");
    grid.appendChild(gridCell);
    grid.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;
    gridCell.style.border = "2px solid whitesmoke";
    gridCell.addEventListener("mouseover", changeColour);
  }
}

function changeColour(e) {
  if (currentMode === "colourful") {
    const randomInt = (min, max) =>
      Math.floor(Math.random() * (max - min + 1) + 1);
    const randomColour = () =>
      `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;
    e.target.style.backgroundColor = randomColour();
  } else if (currentMode === "colour") {
    e.target.style.backgroundColor = default_colour;
  } else if (currentMode === "eraser") {
    e.target.style.backgroundColor = "rgb(255, 255, 255)";
  }
}

function reset() {
  currentMode = "colour";
  while (grid.firstChild) {
    grid.removeChild(grid.firstChild);
  }
  createNewGrid();
}
function updateSizeValue() {
  sizeValue.textContent = `${sizeSlider.value} x ${sizeSlider.value}`;
}

createNewGrid();
