/**
 * Ativa uma das telas e desativa as outras.
 * makeScreenActive(1) -> ativa .first-screen
 * makeScreenActive(2) -> ativa .second-screen
 * makeScreenActive(3) -> ativa .third-screen
 */

function makeScreenActive(nScreen) { 
    const screens = document.querySelectorAll('.screen');
    for (let i = 0; i < screens.length; i++) {
        if (nScreen !== i + 1) {
            screens[i].classList.add('hidden');
        }  else if (screens[i].classList.contains('hidden')) {
            screens[i].classList.remove('hidden');
        }
    }
}
