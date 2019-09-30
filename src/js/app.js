import * as d3 from "d3";
import removeMobileHover from "./utils/removeMobileHover.js";
import navImg from "./navImg.js";

const $choices = d3.selectAll("[data-js='choice']");
const $choiceButtons = $choices.selectAll("[data-js='choice-button']");
const $backButton = d3.select("[data-js='back']");
const $progressChoice = d3.select("[data-js='progress--choice']");
const $progressTotal = d3.select("[data-js='progress--total']");
const $progressResult = d3.select("[data-js='progress--result']");
const $storyCloser = d3.select("[data-js='closer']");
const $choiceSpan = $progressChoice.select("span");
const $choiceExtraInfo = $progressChoice.select("small");
const $totalSpan = $progressTotal.select("span");
const $resultSpan = $progressResult.select("span");
const $biggestImpact = d3.select("[data-js='biggest-impact']");
const $multiplier = d3.select("[data-js='progress--multiplier']");

const STATE = {
  step: 0,
  choice: [],
  info: [],
};

const TREE_MULTIPLIER = 10;
const STEP_COUNT = $choices.size();
const STORIES = ["wedding", "footwear", "vacation"];

let story = STORIES[0]; // default to wedding
let hasMult = false;
let multiple = 1;

function showElement({ sel, compare }) {
  // show and hide different pieces of progress
  const hidden = typeof compare === "function" ? compare : (compare ? null : true);
  sel.attr("hidden", hidden);
}

function toggleStep() {
  const { step, choice, info } = STATE;

  // reset multiple if on start screen
  if (step === 0) {multiple = 1;}

  showElement({ sel: $choices, compare: (d, i) => i === step ? null : true });
  showElement({ sel: $backButton, compare: step > 0 });
  showElement({ sel: $progressChoice, compare: step > (hasMult ? 1 : 0) });
  showElement({ sel: $progressTotal, compare: step >= 0 });
  showElement({ sel: $progressResult, compare: step === STEP_COUNT });
  showElement({ sel: $storyCloser, compare: step === STEP_COUNT });
  if ($multiplier) {showElement({ sel: $multiplier, compare: step > 0 });}

  // update text of each piece of progress
  const total = d3.sum(choice);
  const result = total * TREE_MULTIPLIER;
  const maxImpact = d3.max(choice);
  const $choiceImpact = d3.select(`[data-impact='${maxImpact}']`);
  $choiceSpan.text(`${choice[choice.length - 1] * multiple} kg`);
  $choiceExtraInfo.text(`${info[info.length - 1]}`);
  $totalSpan.text(`${total * multiple} kg`);
  $resultSpan.text(`${result * multiple} trees`);
  $biggestImpact.text(step === STEP_COUNT ? $choiceImpact.html() : "");
}

function setMultiplier(value) {
  $multiplier.select(`[data-mult="${value}"]`).property("checked", true);
  multiple = +value;
}

// events
function handleBack() {
  STATE.choice.pop();
  STATE.info.pop();
  STATE.step -= 1;
  STATE.step = Math.max(0 , STATE.step);
  toggleStep();
}

function handleChoice() {
  const $btn = d3.select(this);
  const impact = +$btn.attr("data-impact");
  const info = $btn.attr("data-info");
  const mult = $btn.attr("data-mult");

  if (mult) {setMultiplier(mult);}

  STATE.choice.push(impact);
  STATE.info.push(info);
  STATE.step += 1;

  toggleStep();
}

function handleMultiplierChange() {
  multiple = +$multiplier.select("input:checked").node().value;
  toggleStep();
}


// setup
function setupStory() {
  // get story from url
  const p = window.location.pathname;
  const match = STORIES.find(s => p.includes(s));
  story = match || story;

  // check if multiplier
  hasMult = !!d3.select("button[data-mult]").attr("data-mult");

  // show first step
  toggleStep();
}

function setupEvents() {
  $backButton.on("click", handleBack);
  $choiceButtons.on("click", handleChoice);
  if ($multiplier) {$multiplier.on("change", handleMultiplierChange);}
}

function init() {
  d3.select("html").classed("js-is-loaded", true);
  removeMobileHover();
  navImg();
  setupStory();
  setupEvents();
}

init();
