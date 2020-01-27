// enter browser fullscreen
export function fullscreen() {
  const fullscreenBtn = document.querySelector('.fullscreen-btn');
  fullscreenBtn.addEventListener('click', toggleFullscreenMode);

  function toggleFullscreenMode() {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
  }
}
