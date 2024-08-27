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

  // Ensure fpsBlock is not null
  if (fpsBlock) {
    setInterval(() => {
      fpsBlock.querySelectorAll("span").forEach((el) => {
        if (fps[el.id]) {
          el.innerText = fps[el.id].toFixed(1);
        }
      });
    }, 1000); // Set interval to update every second
  }
};

const onWebcamSelect = (e) => {
  console.log("Webcam button clicked");
  const source = getSource(e.target.value);
  console.log("Source:", source);
  startPlayer(source);
  onSourceSelect();
};

const onImageSelect = (e) => {
  const source = getSource(e.target.value, e.target.files[0]);
  startPlayer(source);
  onSourceSelect();
};

// Attach event listeners
webcamSourceButton.addEventListener("click", onWebcamSelect);
webcamSourceButton.addEventListener("touchend", onWebcamSelect);
imageSourceButton.addEventListener("change", onImageSelect);
