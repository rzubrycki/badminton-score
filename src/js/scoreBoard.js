import { SuccessSound, EndGameSound } from '../const/sounds';
import { ScoreValues } from '../const/scoreValues';

const whitePlayer = {
  points: [],
  sets: []
};
const blackPlayer = {
  points: [],
  sets: []
};

// dom elements
const whitePlayerPointsElement = document.querySelector('.player-white-points');
const blackPlayerPointsElement = document.querySelector('.player-black-points');
const whitePlayerSetsElement = document.querySelector('.player-white-sets');
const blackPlayerSetsElement = document.querySelector('.player-black-sets');
const scoreBoardElement = document.querySelector('.scoreboard');

// speech recognition initialization
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.interimResults = true;
recognition.lang = 'pl-PL';

export function speechRecognition() {
  updatePointsElements();
  const setsSum = whitePlayer.sets.length + blackPlayer.sets.length;

  recognition.addEventListener('result', e => {
    const transcript = Array.from(e.results)
      .map(result => result[0])
      .map(result => result.transcript)
      .join('');

    if (e.results[0].isFinal) {
      if (transcript.includes(ScoreValues.whiteScore)) {
        whitePlayer.points.push(ScoreValues.addScore);
        whitePlayerPointsElement.textContent = whitePlayer.points.length;
        SuccessSound.play();
      } else if (transcript.includes(ScoreValues.blackScore)) {
        blackPlayer.points.push(ScoreValues.addScore);
        blackPlayerPointsElement.textContent = blackPlayer.points.length;
        SuccessSound.play();
      }

      if (whitePlayer.points.length + blackPlayer.points.length > 40) {
        handleAdvantageFlow(transcript);
      } else {
        handleGameFlow(setsSum);
      }
      handleFinishedGame();
    }
  });

  recognition.addEventListener('end', recognition.start);
  recognition.start();
}

/**
 * HELPERS FUNCTIONS
 */

// handle the normal game flow
function handleGameFlow(setsSum) {
  if (whitePlayer.points.length === 21) {
    whitePlayer.sets.push(ScoreValues.addScore);
    handleEndedSet();
    if (setsSum !== 2 || 3) {
      changeSides();
    }
  } else if (blackPlayer.points.length === 21) {
    blackPlayer.sets.push(ScoreValues.addScore);
    handleEndedSet();
    if (setsSum !== 2 || 3) {
      changeSides();
    }
  }
  updateSetsElements();
}

// handle advantage game flow
function handleAdvantageFlow(transcript) {
  const isGameOver = Math.abs(whitePlayer.points.length - blackPlayer.points.length);
  if (isGameOver === 2 || whitePlayer.points.length === 30 || blackPlayer.points.length === 30) {
    if (transcript.includes(ScoreValues.whiteScore)) {
      whitePlayer.sets.push(ScoreValues.addScore);
      handleEndedSet();
      changeSides();
    } else if (transcript.includes(ScoreValues.blackScore)) {
      blackPlayer.sets.push(ScoreValues.addScore);
      handleEndedSet();
      changeSides();
    }
    updateSetsElements();
  }
}

// handle end game situation
function handleFinishedGame() {
  if (whitePlayer.sets.length === 2 || blackPlayer.sets.length === 2) {
    EndGameSound.play();
  }
}

// handle set points
function handleEndedSet() {
  whitePlayer.points = [];
  blackPlayer.points = [];

  updatePointsElements();
}

// handle changing sides after won set
function changeSides() {
  const setsSum = whitePlayer.sets.length + blackPlayer.sets.length;
  switch (setsSum) {
    case 1:
      scoreBoardElement.style.cssText = 'flex-flow: row-reverse';
      whitePlayerSetsElement.style.cssText = 'left: 50%';
      blackPlayerSetsElement.style.cssText = 'left: 40%';

      break;

    case 2:
      if (whitePlayer.sets.length === 0 || blackPlayer.sets.length === 0) {
        break;
      } else {
        scoreBoardElement.style.cssText = 'flex-flow: row';
        whitePlayerSetsElement.style.cssText = 'left: 40%';
        blackPlayerSetsElement.style.cssText = 'left: 50%';
      }
      break;

    case 3:
      break;
  }
}

// handle update element points
function updatePointsElements() {
  whitePlayerPointsElement.textContent = whitePlayer.points.length;
  blackPlayerPointsElement.textContent = blackPlayer.points.length;
}

// handle update element set points
function updateSetsElements() {
  whitePlayerSetsElement.textContent = whitePlayer.sets.length;
  blackPlayerSetsElement.textContent = blackPlayer.sets.length;
}

// reset score board
document.querySelector('.reset-btn').addEventListener('click', resetScoreBoard);

function resetScoreBoard() {
  whitePlayer.points = [];
  blackPlayer.points = [];
  whitePlayer.sets = [];
  blackPlayer.sets = [];

  updatePointsElements();
  updateSetsElements();
  confetti.clear();
  location.reload();
}
