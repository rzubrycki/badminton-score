import ConfettiGenerator from 'confetti-js';
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
const whitePlayerSetsElement = document.querySelector('.player-white-sets');
const blackPlayerSetsElement = document.querySelector('.player-black-sets');
const whitePlayerPointsElement = document.querySelector('.player-white-points');
const blackPlayerPointsElement = document.querySelector('.player-black-points');

// confetti settings
const confettiSettings = { target: 'fireworks', max: 50, clock: 40 };
const confetti = new ConfettiGenerator(confettiSettings);

export function speechRecognition() {
  window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  recognition.interimResults = true;
  recognition.lang = 'pl-PL';

  updatePointsElements();

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
        handleGameFlow();
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
function handleGameFlow() {
  if (whitePlayer.points.length === 21) {
    whitePlayer.sets.push(ScoreValues.addScore);
    handleEndedSet();
  } else if (blackPlayer.points.length === 21) {
    blackPlayer.sets.push(ScoreValues.addScore);
    handleEndedSet();
  }
  updateSetsElements();
}

// handle advantage game flow
function handleAdvantageFlow(transcript) {
  const isGameOver = Math.abs(whitePlayer.points.length - blackPlayer.points.length);
  if (isGameOver === 2 || whitePlayer.points.length === 30 || blackPlayer.points.length === 30) {
    if (transcript === ScoreValues.whiteScore) {
      whitePlayer.sets.push(ScoreValues.addScore);
      handleEndedSet();
    } else if (transcript === ScoreValues.blackScore) {
      blackPlayer.sets.push(ScoreValues.addScore);
      handleEndedSet();
    }
    updateSetsElements();
  }
}

// handle end game situation
function handleFinishedGame() {
  if (whitePlayer.sets.length === 2 || blackPlayer.sets.length === 2) {
    EndGameSound.play();
    confetti.render();
  }
}

// handle set points
function handleEndedSet() {
  whitePlayer.points = [];
  blackPlayer.points = [];
  updatePointsElements();
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
