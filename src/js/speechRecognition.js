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

  recognition.addEventListener('result', e => {
    const transcript = Array.from(e.results)
      .map(result => result[0])
      .map(result => result.transcript)
      .join('');

    if (e.results[0].isFinal) {
      if (transcript.includes('biały')) {
        whiteScore.push('punkt');
        whitePlayerScoreBoard.textContent = whiteScore.length;
      } else if (transcript.includes('czarny')) {
        blackScore.push('punkt');
        blackPlayerScoreBoard.textContent = blackScore.length;
      }
    }
  });

  recognition.addEventListener('end', recognition.start);
  recognition.start();
}
