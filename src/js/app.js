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
const $totalSpan = $progressTotal.select("span");
const $resultSpan = $progressResult.select("span");

const STATE = {
  step: 0,
  choice: [],
};

const STEP_COUNT = $choices.size();

const TREE_MULTIPLIER = 10;

const STORIES = ["wedding", "camping", "manufacturing"];

let story = STORIES[0]; // default to wedding

function toggleStep() {
  const { step, choice } = STATE;

  // show and hide different pieces of progress
  $choices.attr("hidden", (d, i) => i === step ? null : true);
  $backButton.attr("hidden", () => step > 0 ? null : true);
  $progressChoice.attr("hidden", () => step > 0 ? null : true);
  $progressTotal.attr("hidden", () => step >= 0 ? null : true);
  $progressResult.attr("hidden", () => step === STEP_COUNT ? null : true);
  $storyCloser.attr("hidden", () => step === STEP_COUNT ? null : true);

  // update text of each piece of progress
  const total = d3.sum(choice);
  const result = total * TREE_MULTIPLIER;
  $choiceSpan.text(`${choice[choice.length - 1]} kg`);
  $totalSpan.text(`${total} kg`);
  $resultSpan.text(`${result} trees`);
}

// events
function handleBack() {
  STATE.choice.pop();
  STATE.step -= 1;
  STATE.step = Math.max(0 , STATE.step);
  // console.log({STATE});
  toggleStep();
}

function handleChoice() {
  const $btn = d3.select(this);
  const impact = +$btn.attr("data-impact");
  STATE.choice.push(impact);
  STATE.step += 1;
  toggleStep();
}

function setupStory() {
  // get story from url
  const p = window.location.pathname;
  const match = STORIES.find(s => p.includes(s));
  story = match || story;
  // show first step
  toggleStep();
}

function setupEvents() {
  $backButton.on("click", handleBack);
  $choiceButtons.on("click", handleChoice);
}

function init() {
  d3.select("html").classed("js-is-loaded", true);
  removeMobileHover();
  navImg();
  setupStory();
  setupEvents();
}

init();


