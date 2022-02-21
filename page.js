let contador = 0
let contTrue = 0
let infoAll = []
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
        infoAll = item
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
        <div class="container-question box">
            <div class="header-question">
                <p>${item.data.questions[index].title}</p>
            </div>
            <div class="options ${index}">
            </div>
        </div>
        `
    }
    renderOptionsQuizz(item, arrayAnswer)

}

function renderOptionsQuizz(item, tamanhoDasRespostas) {
    let options = [...document.querySelectorAll(`.options`)]
    let container = document.querySelector('.exhibition-quizz')
    for (let i = 0; i < tamanhoDasRespostas.length; i++) {
        for (let index = 0; index < tamanhoDasRespostas[index]; index++) {
            options[i].innerHTML +=
                `
            <figure class="image-op " onclick="selecionarResposta(this), checkAnswer(this)" data-index ='${item.data.questions[i].answers[index].isCorrectAnswer}'>
                <img  src="${item.data.questions[i].answers[index].image}" alt="">
                <figcaption>${item.data.questions[i].answers[index].text}</figcaption>
            </figure>
            `
        }
    }
    container.innerHTML += `
        <button class="buttonquizz btnquizz red" onclick="">Reiniciar Quizz</button>
        <button class="buttonquizz btnquizz white" onclick="">Voltar a home</button>
    `
}

function checkAnswer(item) {
    let container = item.parentNode
    let box = document.querySelector('.exhibition-quizz')
    let totalQuestions = document.querySelectorAll('.box')
    container = [...container.querySelectorAll('.image-op')]
    for (let index = 0; index < container.length; index++) {
        container[index].setAttribute('onclick', '')
        container[index].querySelector('figcaption').style.color = '#FF4B4B'
        if (container[index].dataset.index == 'true') {
            container[index].querySelector('figcaption').style.color = '#009C22'
        }
        
    }
    if(item.dataset.index == 'true'){
        contTrue ++
    }
    contador += 1;
    let percents = contTrue/Number(totalQuestions.length)*100
    let performanceOnQuizz = ''
    let contando = Number(infoAll.data.levels.length)
    for (let index = 0; index < infoAll.data.levels.length; index++) {

        if (percents >= infoAll.data.levels[contando -1].minValue ) {
            performanceOnQuizz = infoAll.data.levels[contando -1]
            console.log(performanceOnQuizz);
            break
        }
        contando -= 1
    }
    console.log(infoAll);
    if (contador == totalQuestions.length) {
        box.innerHTML += `
        <div class="container-question">
        <div class="header-question">
            <p> ${percents.toFixed(0)}% de acerto : ${performanceOnQuizz.title}</p>
        </div>
        <<div class="final">
            <img src='${performanceOnQuizz.image}'></img>
            <p>${performanceOnQuizz.text}</p>
        </div>
    </div>
        `

    }
}

// function finalcontainer() {
    
// }