### App for badminton match result
![](https://github.com/rzubrycki/badminton-score/blob/master/src/images/favicons/apple-touch-icon.png)
___

[DEMO](https://inspiring-payne-3540e7.netlify.com/)

[BADMINTON RULES (IN POLISH)](https://www.badmin.pl/zasady-gry-w-badmintona-i-56.html)
___

Only **desktop version** available due to some inconsistencies of speech recognition web api on mobile devices.
___

**Usage:**
> Requirements: :rotating_light: App needs acceptance to use your microphone.

- app recognizes only two words for easier control during the game,
- key words are **"biały"** and **"czarny"** respectively for white and black player score,
- say "biały" or "czarny" to add a point,
- supported languages by speech recognition web api - [list](https://cloud.google.com/speech-to-text/docs/languages)
___
**Tech stack:**
- javascript
- scss
- html

**Bundler:**
- [:hammer_and_wrench: Parcel.js](https://parceljs.org/)

**Api:**
- [:loudspeaker: Speech recognition web api](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API/Using_the_Web_Speech_API) to handle voice recognition and control the app,
- [:tv: Fullscreen web api](https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API) to handle browser fullscreen functionality,
- [:microphone: Howler.js](https://howlerjs.com/) to handle audio files,
- [:fireworks: Confetti.js](https://github.com/Agezao/confetti-js#readme) to some fireworks after win match


**Build status:** [![Netlify Status](https://api.netlify.com/api/v1/badges/946b7912-1a06-4684-b7d6-3e3a93ad899c/deploy-status)](https://app.netlify.com/sites/inspiring-payne-3540e7/deploys)
___

**To run project locally:**
> Requirements: [:rotating_light: Node.js](https://nodejs.org/en/)

- `npm run install` to install all node packages,
- `npm run start` to bundle app and open it in a browser,
- `npm run prod` to make a production build
___
