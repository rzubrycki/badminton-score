import { Howl } from 'howler';

export const SuccessSound = new Howl({
  src: [
    'https://firebasestorage.googleapis.com/v0/b/badminton-sounds.appspot.com/o/success.wav?alt=media&token=4fee7ab9-5e92-4b4e-8174-c7422aba76c1'
  ],
  html5: true
});

export const ErrorSound = new Howl({
  src: [
    'https://firebasestorage.googleapis.com/v0/b/badminton-sounds.appspot.com/o/error.wav?alt=media&token=3743058d-b8e7-40d3-92f7-3a317db0ce3d'
  ],
  html5: true
});

export const EndGameSound = new Howl({
  src: [
    'https://firebasestorage.googleapis.com/v0/b/badminton-sounds.appspot.com/o/applause.wav?alt=media&token=c86e68b3-0580-44a3-b5a8-d9893da38480'
  ],
  html5: true
});
