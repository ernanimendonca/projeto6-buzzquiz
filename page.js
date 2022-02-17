/* ao clicar sobre um quiz, a tela do quiz aparece */

function pageQuizz() {
    makeScreenActive(2);
}

/* ao clicar sobre uma pergunta, as demais ficam esbranquiçadas */

function selecionarResposta(figure) {
    let opcoes = figure.parentNode.querySelectorAll(".image-op");
    for (let i = 0; i < opcoes.length; i++) {
        opcoes[i].classList.add("whiten");
        figure.classList.remove("whiten");
    }
}