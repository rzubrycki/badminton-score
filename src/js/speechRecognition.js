import { SuccessSound, ErrorSound, EndGameSound } from './sounds';
import { ScoreValues } from '../const/scoreValues';

const whiteScore = [];
const blackScore = [];
const whitePlayerScoreBoard = document.querySelector('.player1');
const blackPlayerScoreBoard = document.querySelector('.player2');

export function speechRecognition() {
  window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  recognition.interimResults = true;
  recognition.lang = 'pl-PL';

  whitePlayerScoreBoard.textContent = whiteScore.length;
  blackPlayerScoreBoard.textContent = blackScore.length;

  recognition.addEventListener('result', e => {
    const transcript = Array.from(e.results)
      .map(result => result[0])
      .map(result => result.transcript)
      .join('');

    if (e.results[0].isFinal) {
      if (transcript.includes(ScoreValues.whiteScore)) {
        whiteScore.push(ScoreValues.addScore);
        whitePlayerScoreBoard.textContent = whiteScore.length;
        SuccessSound.play();
      } else if (transcript.includes(ScoreValues.blackScore)) {
        blackScore.push(ScoreValues.addScore);
        blackPlayerScoreBoard.textContent = blackScore.length;
        SuccessSound.play();
      }
    }

    // ErrorSound.play();
  });

  recognition.addEventListener('end', recognition.start);
  recognition.start();
}

export const resetScoreBoard = () => {
  whiteScore.length = 0;
  blackScore.length = 0;
  whitePlayerScoreBoard.textContent = whiteScore.length;
  blackPlayerScoreBoard.textContent = blackScore.length;
};
