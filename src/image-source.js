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

const onWebcamSelect = async (e) => {
  try {
    console.log("Webcam button clicked"); // Debugging
    const constraints = {
      video: true, // Request video stream
      audio: false, // Disable audio
    };

    // Check if media devices are available
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      const source = getSource(e.target.value, stream);
      console.log("Source:", source); // Debugging
      startPlayer(source);
      onSourceSelect();
    } else {
      console.error("Media devices are not supported.");
    }
  } catch (error) {
    console.error("Error accessing webcam:", error);
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
