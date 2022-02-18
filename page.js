/* ao clicar sobre um quiz, a tela do quiz aparece */

function pageQuizz(id) {
    makeScreenActive(2);
    getInfosIdQuizz(id)
}

/* ao clicar sobre uma pergunta, as demais ficam esbranquiçadas */

function selecionarResposta(figure) {
    let opcoes = figure.parentNode.querySelectorAll(".image-op");
    for (let i = 0; i < opcoes.length; i++) {
        opcoes[i].classList.add("whiten");
        figure.classList.remove("whiten");
    }
}

function getInfosIdQuizz(id) {
    let URL = `https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${id}`
    axios({
        method: 'get',
        url: URL
    }).then(item => {
        renderInfosIdQuizz(item)
    }).catch(error => {
        console.log(error);
    })
}
function renderInfosIdQuizz(item) {
    let container = document.querySelector('.exhibition-quizz')
    let banner = container.querySelector('.banner')
    let arrayAnswer = []
    banner.innerHTML =
        `
        <p>${item.data.title}</p>
        <div class="image-banner">
            <img src="${item.data.image}" alt="">
            <div class="overlap"></div>
        </div>
    `
    for (let index = 0; index < item.data.questions.length; index++) {
        arrayAnswer.push(item.data.questions[index].answers.length);
        container.innerHTML +=
            `
        <div class="container-question">
            <div class="header-question">
                <p>${item.data.questions[index].title}</p>
            </div>
            <div class="options ${index}">
            </div>
        </div>
        `
    }
    renderOptionsQuizz(item,arrayAnswer)

}

function renderOptionsQuizz(item,tamanhoDasRespostas) {
    let options = [... document.querySelectorAll(`.options`)]
    console.log(tamanhoDasRespostas);
    for (let i = 0; i < tamanhoDasRespostas.length; i++) {
        for (let index = 0; index < tamanhoDasRespostas[index]; index++) {   
            options[i].innerHTML += 
            `
            <figure class="image-op" onclick="selecionarResposta(this)">
                <img  src="${item.data.questions[i].answers[index].image}" alt="">
                <figcaption>${item.data.questions[i].answers[index].text}</figcaption>
            </figure>
            `
        }
    }
}