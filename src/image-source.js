import { fps, getSource, startPlayer } from "../BanubaPlayer.js";

import {
  webcamSourceButton,
  imageSourceButton,
  startScreen,
  overlay,
  fpsBlock,
} from "./elements.js";

const onSourceSelect = () => {
  startScreen.classList.add("hidden");
  overlay.classList.add("hidden");
  setInterval(() => {
    fpsBlock.querySelectorAll("span").forEach((el) => {
      el.innerText = fps[el.id].toFixed(1);
    });
  });
};

const onWebcamSelect = (e) => {
  console.log("Webcam button clicked"); // Add this line
  const source = getSource(e.target.value);
  console.log("Source:", source); // Add this line
  startPlayer(source);
  onSourceSelect();
};

const onImageSelect = (e) => {
  const source = getSource(e.target.value, e.target.files[0]);
  startPlayer(source);
  onSourceSelect();
};

webcamSourceButton.addEventListener("click", onWebcamSelect);
webcamSourceButton.addEventListener("touchend", onWebcamSelect); // Add this line for mobile support
imageSourceButton.addEventListener("change", onImageSelect);
