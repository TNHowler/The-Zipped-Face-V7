const assets = {
  face: null,
  zip: null,
  mouth: null,
  bg: null,
};

let zipX;
let isDragging = false;
let zipMinX;
let zipMaxX;
let textLines = [];
let draggingText = false;
let offsetX, offsetY;
const draggableText = "Access";
const words = draggableText.split(" ");
let wordPositions = [];
let textX, textY;
let showText = false;

function preload() {
  loadAsset("face", "data/Illustrator_Assets_Face_V2.png");
  loadAsset("mouth", "data/Illustrator_Assets_Mouth_V2.png");
  loadAsset("zip", "data/Illustrator_Assets_Zip_V3.png");
  loadAsset("bg", "data/Illustrator_Assets_BG.png");
}

function loadAsset(name, path) {
  assets[name] = loadImage(
    path,
    img => resizeImage(img),
    err => console.error(`Failed to load ${name}`)
  );
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background("white");
  zipX = width / 2;
  zipMinX = width / 2 - assets.mouth.width / 4; // Left edge of the mouth
  zipMaxX = width / 2 + assets.mouth.width / 1000; // Right edge of the mouth
  imageMode(CENTER, CENTER);
  textX = width / 2;
  textY = height / 2 + 180;
}

function draw() {
  background("white");
  image(assets.mouth, width / 2, height / 2);
  image(assets.zip, zipX, height / 2);
  image(assets.bg, width / 2, height / 2);
  image(assets.face, width / 2, height / 2);


  if (showText) {
    fill(0);
    textSize(32);
    textAlign(CENTER, CENTER);
    text(draggableText, textX, textY);
  }
}

let zipMovedLeft = false;

function mousePressed() {
  if (!zipMovedLeft && mouseX > zipX - assets.zip.width / 2 && mouseX < zipX + assets.zip.width / 2 && mouseY > height / 2 - assets.zip.height / 2 && mouseY < height / 2 + assets.zip.height / 2) {
    isDragging = true;
    offsetX = zipX - mouseX;
  }

  if (showText && mouseX > textX - textWidth(draggableText) / 2 && mouseX < textX + textWidth(draggableText) / 2 && mouseY > textY - 16 && mouseY < textY + 16) {
    draggingText = true;
    offsetX = textX - mouseX;
    offsetY = textY - mouseY;
  }
}

function mouseDragged() {
  if (isDragging && !zipMovedLeft) {
    zipX = mouseX + offsetX;
    zipX = constrain(zipX, zipMinX, zipMaxX); // Ensure the zip stays within bounds

    // Check if the zip has been moved to the furthest left position
    if (zipX === zipMinX) {
      zipMovedLeft = true;
      isDragging = false; // Stop dragging
      showText = true; // Show the text when the zip is moved to the left
    }
  }

  if (draggingText) {
    textX = mouseX + offsetX;
    textY = mouseY + offsetY;
  }
}

function mouseReleased() {
  isDragging = false;
  draggingText = false;
}

function keyPressed() {
  if (key === ' ') {
    showText = true;
  }
  if (key === 'z') {
    zipMovedLeft = false; // Reset the flag when 'z' is pressed
  }
}

function resizeImage(img) {
  let aspectRatio = img.width / img.height;
  if (img.width > windowWidth || img.height > windowHeight) {
    if (aspectRatio > 1) {
      img.resize(windowWidth, windowWidth / aspectRatio);
    } else {
      img.resize(windowHeight * aspectRatio, windowHeight);
    }
  }
}
