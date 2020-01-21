import { Howl } from 'howler';

export function speechRecognition() {
  window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  recognition.interimResults = true;
  recognition.lang = 'pl-PL';

  const whiteScore = [];
  const blackScore = [];
  const whitePlayerScoreBoard = document.querySelector('.player1');
  const blackPlayerScoreBoard = document.querySelector('.player2');

  whitePlayerScoreBoard.textContent = whiteScore.length;
  blackPlayerScoreBoard.textContent = whiteScore.length;

  const successSound = new Howl({
    src: ['https://github.com/rzubrycki/badminton-score/blob/master/src/sounds/success.wav'],
    html5: true
  });

  const errorSound = new Howl({
    src: ['https://github.com/rzubrycki/badminton-score/blob/master/src/sounds/error.wav']
  });

  const endGameSound = new Howl({
    src: ['../sounds/applause.wav']
  });

  recognition.addEventListener('result', e => {
    const transcript = Array.from(e.results)
      .map(result => result[0])
      .map(result => result.transcript)
      .join('');

    if (e.results[0].isFinal) {
      if (transcript.includes('biały')) {
        whiteScore.push('punkt');
        whitePlayerScoreBoard.textContent = whiteScore.length;
        successSound.play();
      } else if (transcript.includes('czarny')) {
        blackScore.push('punkt');
        blackPlayerScoreBoard.textContent = blackScore.length;
        successSound.play();
      }
    }

    errorSound.play();
  });

  recognition.addEventListener('end', recognition.start);
  recognition.start();
}
