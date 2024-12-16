

const countdownContainer = document.querySelector(".countdown-container");

countdownContainer.innerHTML = `
    <svg id="progress-wrapper" width="500" height="500" viewBox="0 0 500 500">
    
      <circle cx="250" cy="250" r="200" stroke="#c39fe0" stroke-width="25" fill="transparent" id="progress" />
    </svg>
    
    <span class="seconds" id="seconds"></span>
`;


const span = document.querySelector(".seconds");

span.style.position = "absolute";
span.style.color = "#e8deee";
span.style.fontWeight = "100";
span.style.top = "50%";
span.style.left = "50%";
span.style.transform = "translate(-50%, -50%)";

const progressWrapper = document.getElementById("progress-wrapper"),
  progress = document.getElementById("progress"),
  timeSpan = document.getElementById("seconds");


const options = {
  duration: +countdownContainer.dataset.duration,
  transition: countdownContainer.dataset.transition,
  color: countdownContainer.dataset.color,
  size: +countdownContainer.dataset.size,
  initialPosition: countdownContainer.dataset.position,
};

const circularCountdown = ({
  duration,
  transition,
  color,
  size,
  initialPosition,
}) => {

  renderSeconds(duration);
  adjustFontSize(size);
  adjustCircleSize(size);
  setInitialPosition(initialPosition);
  animationStart(color, transition, duration);
};

let secondColor=document.querySelector(".data-color")
const renderSeconds = (duration) => {
  timeSpan.innerHTML = duration;
  const secondsCountdown = setInterval(() => {
    duration--;
    timeSpan.innerHTML = duration;
    if (duration === 0) {
      clearInterval(secondsCountdown);
      
    }
  }, 1000);
};

const adjustFontSize = (size) => {
  timeSpan.style.fontSize = `${size / 5}px`;
};

const adjustCircleSize = (size) => {
  progressWrapper.style.width = size;
  progressWrapper.style.height = size;
};

const setInitialPosition = (initialPosition) => {
  if (initialPosition === "up") {
    progressWrapper.style.transform = "rotate(270deg)";
  } else if (initialPosition === "left") {
    progressWrapper.style.transform = "rotate(180deg)";
  } else if (initialPosition === "down") {
    progressWrapper.style.transform = "rotate(90deg)";
  }
};

const animationStart = (color, transition, duration) => {
  let length = progress.getTotalLength();
  progress.style.stroke = color;
  progressWrapper.style.strokeDasharray = length;
  progressWrapper.style.animation = `progress ${transition} ${duration}s forwards`;
};

const initCountdown = () => {
  circularCountdown(options);
};

initCountdown();
