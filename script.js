let interactiveIsHovered = false;
let mouseX = -20;
let mouseY = -20;
let prevMouseX = mouseX;
let prevMouseY = mouseY;
let paused = false;

document.addEventListener("mouseover", (e) => {
  changeFlag(e, true);
});

document.addEventListener("mouseout", (e) => {
  changeFlag(e, false);
});

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  paused =
    mouseX <= halfCursorSize ||
    mouseX >= window.innerWidth - halfCursorSize ||
    mouseY <= halfCursorSize ||
    mouseY >= window.innerHeight - halfCursorSize;
});

function changeFlag(e, bool) {
  if (
    e.target.tagName === "A" ||
    e.target.tagName === "BUTTON" ||
    e.target.classList.contains("button")
  ) {
    interactiveIsHovered = bool;
  }
}

let w = 0;
let h = 0;
let mainCursorSize = 10;
let halfCursorSize = mainCursorSize / 2;
let circleSize = 40;
let circleHoverSize = 66;
let circleActualSize = circleSize;

const canvas = document.createElement("canvas");
//insert the canvas into body;
document.body.appendChild(canvas);
const ctx = canvas.getContext("2d");

//add canvas resize on window resize
window.addEventListener("resize", () => {
     setCanvasSize(canvas);
  },
{ passive: true });

//set canvas size and run loop
window.addEventListener("load", () => {
    setCanvasSize(canvas);
    loop();
});

function drawCursor() {
  if (!paused) {
    ctx.clearRect(0, 0, w, h);
    //set canvas colors (stroke, fill etc.)
    ctx.lineWidth = 2;
    ctx.fillStyle = "rgba(0, 0, 0, .3)";


    //draw surrounding circle start
    ctx.beginPath();
    ctx.arc(prevMouseX, prevMouseY, circleActualSize / 2, 0, 2 * Math.PI);
    ctx.fill();
    //draw surrounding circle end

    //draw main cursor start
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(mouseX, mouseY, halfCursorSize, 0, 2 * Math.PI);
    ctx.fill();
    //draw main cursor end
  } else {
    //clear canvas if the animation is paused
    ctx.clearRect(0, 0, w, h);
  }
}

function loop() {
  calculateCoordinatesAndSizes();
  drawCursor();
  requestAnimationFrame(loop);
}

function setCanvasSize(canvas) {
  if (window.innerWidth >= 1024) {
    paused = false;
    canvas.width = w = window.innerWidth;
    canvas.height = h = window.innerHeight;
    document.body.style.cssText = "cursor: none;";
  } else {
    paused = true;
    document.body.style.cssText = "cursor: auto;";
  }
}

function calculateCoordinatesAndSizes() {
    prevMouseX += (mouseX - prevMouseX) * 0.15;
    prevMouseY += (mouseY - prevMouseY) * 0.15;
    if (interactiveIsHovered) {
        if (circleActualSize < circleHoverSize) {
            circleActualSize += (circleHoverSize - circleSize) * 0.05;
        }
    } else {
        if (circleActualSize > circleSize) {
            circleActualSize -= (circleHoverSize - circleSize) * 0.05;
        }
    }
}
