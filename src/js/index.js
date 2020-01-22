import '../scss/app.scss';

import { speechRecognition, resetScoreBoard } from './speechRecognition';

speechRecognition();
document.querySelector('.reset-btn').addEventListener('click', resetScoreBoard);
