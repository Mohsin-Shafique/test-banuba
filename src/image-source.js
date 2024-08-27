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
  console.log("Webcam button clicked");
  try {
    const source = getSource(e.target.value);
    console.log("Source:", source);
    if (source) {
      startPlayer(source);
      onSourceSelect();
    } else {
      console.error("Failed to get webcam source");
    }
  } catch (error) {
    console.error("Error selecting webcam source:", error);
  }
};

const onImageSelect = (e) => {
  try {
    const source = getSource(e.target.value, e.target.files[0]);
    if (source) {
      startPlayer(source);
      onSourceSelect();
    } else {
      console.error("Failed to get image source");
    }
  } catch (error) {
    console.error("Error selecting image source:", error);
  }
};

webcamSourceButton.addEventListener("click", onWebcamSelect);
webcamSourceButton.addEventListener("touchend", onWebcamSelect); // Add this line for mobile support
imageSourceButton.addEventListener("change", onImageSelect);
