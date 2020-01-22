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
    src: [
      'https://firebasestorage.googleapis.com/v0/b/badminton-sounds.appspot.com/o/success.wav?alt=media&token=4fee7ab9-5e92-4b4e-8174-c7422aba76c1'
    ],
    html5: true
  });

  const errorSound = new Howl({
    src: [
      'https://firebasestorage.googleapis.com/v0/b/badminton-sounds.appspot.com/o/error.wav?alt=media&token=3743058d-b8e7-40d3-92f7-3a317db0ce3d'
    ],
    html5: true
  });

  const endGameSound = new Howl({
    src: [
      'https://firebasestorage.googleapis.com/v0/b/badminton-sounds.appspot.com/o/applause.wav?alt=media&token=c86e68b3-0580-44a3-b5a8-d9893da38480'
    ],
    html5: true
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
