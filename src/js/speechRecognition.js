import ConfettiGenerator from 'confetti-js';

import { SuccessSound, ErrorSound, EndGameSound } from '../const/sounds';
import { ScoreValues } from '../const/scoreValues';

const whitePlayer = {
  points: [],
  sets: []
};
const blackPlayer = {
  points: [],
  sets: []
};
const whitePlayerSets = document.querySelector('.player1-sets');
const blackPlayerSets = document.querySelector('.player2-sets');
const whitePlayerPoints = document.querySelector('.player1-points');
const blackPlayerPoints = document.querySelector('.player2-points');

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
        whitePlayerPoints.textContent = whitePlayer.points.length;
        SuccessSound.play();
      } else if (transcript.includes(ScoreValues.blackScore)) {
        blackPlayer.points.push(ScoreValues.addScore);
        blackPlayerPoints.textContent = blackPlayer.points.length;
        SuccessSound.play();
      }
      handleGameFlow();
      handleEndGame();
    }
  });

  recognition.addEventListener('end', recognition.start);
  recognition.start();
}

export function resetScoreBoard() {
  whitePlayer.points = [];
  blackPlayer.points = [];
  whitePlayer.sets = [];
  blackPlayer.sets = [];

  updatePointsElements();
  updateSetsElements();
  confetti.clear();
  location.reload();
}

// helpers functions
function handleGameFlow() {
  if (whitePlayer.points.length === 21) {
    whitePlayer.sets.push(ScoreValues.addScore);
    whitePlayer.points = [];
    blackPlayer.points = [];
    updatePointsElements();
  } else if (blackPlayer.points.length === 21) {
    blackPlayer.sets.push(ScoreValues.addScore);
    whitePlayer.points = [];
    blackPlayer.points = [];
    updatePointsElements();
  }
  updateSetsElements();
}

function handleEndGame() {
  if (whitePlayer.sets.length === 2 || blackPlayer.sets.length === 2) {
    EndGameSound.play();
    confetti.render();
  }
}

function updatePointsElements() {
  whitePlayerPoints.textContent = whitePlayer.points.length;
  blackPlayerPoints.textContent = blackPlayer.points.length;
}

function updateSetsElements() {
  whitePlayerSets.textContent = whitePlayer.sets.length;
  blackPlayerSets.textContent = blackPlayer.sets.length;
}
