let infosAnswer = []
let id = 0
let infoQuizz = []
let cont = 0

function showBasicInfoScreen() {
    makeScreenActive(3);
    const createQuizz = document.querySelector('.create-quizz');
    createQuizz.innerHTML = `
    <div class="basic-info">
        <h2>Comece pelo começo</h2>
        <div class="questions">
            <div class="question">
                <input type="text" class="title" placeholder="Título do seu quizz" oninvalid="alert('invalid')">
                <p class="invalid-input hidden">O título do quizz deve ter entre 20 e 65 caracteres</p>
            </div>
            <div class="question">
                <input type="text" class="url-image" placeholder="URL da imagem do seu quizz">
                <p class="invalid-input hidden">O valor informado não é uma URL válida</p>
            </div>
            <div class="question">
                <input type="text" class="n-questions" placeholder="Quantidade de perguntas do quizz">
                <p class="invalid-input hidden">O quizz deve ter no mínimo 3 perguntas</p>
            </div>
            <div class="question">
                <input type="text" class="n-levels" placeholder="Quantidade de níveis do quizz">
                <p class="invalid-input hidden">O quizz deve ter no mínimo 2 níveis</p>
            </div>
        </div>
        <button class="btn-basic-info" onclick="getBasicInfo()">Prosseguir pra criar perguntas</button>
    </div>    
    `
}

function getBasicInfo() {
    const questions = document.querySelectorAll('.question');
    const inputs = {
        title: document.querySelector('.title'),
        urlImage: document.querySelector('.url-image'),
        nQuestions: document.querySelector('.n-questions'),
        nLevels: document.querySelector('.n-levels')
    }
    createListOfQuestions(inputs.nQuestions.value)
    createNewBuzzQuiz(inputs)
    infoQuizz = inputs
    infosAnswer.length = inputs.nQuestions.value
    // if (isInputValid(inputs)) {
    //     createNewBuzzQuiz(inputs)
    // } else {
    //     console.log('deu ruim');
    // }
}

function isInputValid(inputs) {
    let isValid = true;
    if (!isTitleValid(inputs.title.value)) {
        isValid = false;
        showErrorMessage(inputs.title);
    }

    if (!isURLValid(inputs.urlImage.value)) {
        isValid = false;
        showErrorMessage(inputs.urlImage);
    }

    if (!isInputNumberValid(inputs.nQuestions.value, 3)) {
        isValid = false;
        showErrorMessage(inputs.nQuestions);
    }

    if (!isInputNumberValid(inputs.nLevels.value, 3)) {
        isValid = false;
        showErrorMessage(inputs.nLevels);
    }
    return isValid;
}

function isTitleValid(title) {
    return title.length >= 20 && title.length <= 65;
}

function isURLValid(url) {
    try {
        new URL(url);
        return true;
    } catch (e) {
        return false;
    }
}

function isInputNumberValid(number, min) {
    if (isNaN(number)) {
        return false;
    }

    return parseInt(number) >= min;
}

function showErrorMessage(inputObject) {
    const invalidQuestion = inputObject.parentNode
    invalidQuestion.querySelector('input').classList.add('invalid');
    invalidQuestion.querySelector('.invalid-input').classList.remove('hidden');
}
function createListOfQuestions(number) {
    for (let index = 0; index < number; index++) {

        infosAnswer[index] = {

        }
    }
}
function createNewBuzzQuiz(infos) {
    let subtitle = document.querySelector('h2')
    let containerQuestions = document.querySelector(".questions")
    let button = document.querySelector('.btn-basic-info')
    button.style.margin = '46px 0 0 0 '
    let listAnswer = containerQuestions.parentNode
    subtitle.innerHTML = 'Crie suas perguntas'
    containerQuestions.innerHTML = ''
    containerQuestions.classList.add('creatingQuizz')
    containerQuestions.classList.remove('questions')
    button.innerHTML = 'Prosseguir para criar niveis'
    button.setAttribute('onclick', 'createNewLvls()')
    for (let index = 0; index < infos.nQuestions.value; index++) {
        id = index
        if (index == 0) {
            containerQuestions.innerHTML +=
                `
                <div class='creatingQuizz AswerList ${index} hidden'>
                    <h3>Pergunta ${index + 1}</h3>
                    <ion-icon  id="${index}" onclick='editAnswer(this,id)' name="create-outline"></ion-icon>
                </div>
                <div class='newQuestion ${index}'>
                    <p class ='subtitle-questions' id=${index}>Pergunta ${index + 1} </p>
                    <input type="text" class="textQuestion ${index}"  placeholder="Texto da pergunta">
                    <input type='text' class='colorQuestion ${index}'  placeholder ='Cor de fundo da pergunta'/>
        
                    <h2 class='right answer'>Resposta correta</h2>
        
                    <input type="text" class="correctlyAnswer q ${index}" placeholder="Resposta correta">
                    <input type='text' class='imageAnswerCorrectly i ${index}' placeholder ='Url da imagem'/>
        
                    <h2 class=' answer'>Respostas Incorretas </h2>
                    <div class='incorrectAnswer'>
                        <input type="text" class="textIncorrectAnswer1 q ${index}"placeholder="Resposta incorreta 1">
                        <input type='text' class='imageAnswerIncorrect1 i ${index}'  placeholder ='Url da imagem'/>
                    </div>
                    <div class='incorrectAnswer'>
                        <input type="text" class="textIncorrectAnswer2 q ${index}"  placeholder="Resposta incorreta 2">
                        <input type='text' class='imageAnswerIncorrect2 i ${index}'  placeholder ='Url da imagem'/>
                    </div>
                    <div class='incorrectAnswer'>
                        <input type="text" class="textIncorrectAnswer3 q ${index}"  placeholder="Resposta incorreta 3">
                        <input type='text' class='imageAnswerIncorrect3 i ${index}'  placeholder ='Url da imagem'/>
                    </div>
                </div>
                `
        } else {
            containerQuestions.innerHTML +=
                `
                <div class='creatingQuizz ${index} AswerList noHidden'>
                    <h3>Pergunta ${index + 1}</h3>
                    <ion-icon  id="${index}" onclick='editAnswer(this,id)' name="create-outline"></ion-icon>
                </div>
                <div class='newQuestion ${index} hidden'>
                    <p class ='subtitle-questions' id =${index}>Pergunta ${index + 1} </p>
                    <input type="text" class="textQuestion ${index}"  placeholder="Texto da pergunta">
                    <input type='text' class="colorQuestion ${index}"  placeholder ='Cor de fundo da pergunta'/>
        
                    <h2 class='right answer'>Resposta correta</h2>
        
                    <input type="text" class="correctlyAnswer q ${index}"placeholder="Resposta correta">
                    <input type='text' class='imageAnswer i Correctly ${index}'placeholder ='Url da imagem'/>
        
                    <h2 class=' answer'>Respostas Incorretas </h2>
                    <div class='incorrectAnswer'>
                        <input type="text" class="textIncorrectAnswer q 1 ${index}" placeholder="Resposta incorreta 1">
                        <input type='text' class='imageAnswer i Incorrect1 ${index}'  placeholder ='Url da imagem'/>
                    </div>
                    <div class='incorrectAnswer'>
                        <input type="text" class="textIncorrectAnswer q 2 ${index}" placeholder="Resposta incorreta 2">
                        <input type='text' class='imageAnswer i Incorrect2'  placeholder ='Url da imagem'/>
                    </div>
                    <div class='incorrectAnswer'>
                        <input type="text" class="textIncorrectAnswer q 3 ${index}"  placeholder="Resposta incorreta 3">
                        <input type='text' class='imageAnswer i Incorrect3 ${index}'  placeholder ='Url da imagem'/>
                    </div>
                </div>
                `
        }
    }
}
function save() {
    let respostas = [{
        title: infoQuizz.title.value,
        image: infoQuizz.urlImage.value,
        questions: []
    }]
    let pergunta = []
    let opcao = []
    let question = [...document.querySelectorAll(`.newQuestion`)]
    let titleQuestion = [...document.querySelectorAll(`.textQuestion`)]
    let colorTittle = [...document.querySelectorAll(`.colorQuestion`)]

    let todasopcoes = [...document.querySelectorAll(`.q `)]
    let todasimagens = [...document.querySelectorAll(`.i `)]
    
    //for que pega todas as perguntas
    for (let index = 0; index < question.length; index++) {

        pergunta[index] = {
            title: titleQuestion[index].value,
            colorTittle: colorTittle[index].value,
            answer: [],
        }

    }
    respostas.questions = pergunta
    //opçoes da Primeira questao( checa se é a correta ou não)
    for (let index = 0; index < 4; index++) {
        if (todasopcoes[index].classList.contains('correctlyAnswer')) {
            opcao[index] = {
                text: todasopcoes[index].value,
                image: todasimagens[index].value,
                isCorrectAnswer:true,
            }
        } else {
            opcao[index] = {
                text: todasopcoes[index].value,
                image: todasimagens[index].value,
                isCorrectAnswer:false,
            }
        }

    }
    
    respostas.questions.answer = opcao
    console.log(respostas);
    console.log('');
    // console.log(todasopcoes)

    // let question = document.querySelector(`.textQuestion`).value
    // let colorBackgroundQuestion = document.querySelector('.colorQuestion').value
    // let correctlyAnswer = document.querySelector('.correctlyAnswer').value
    // let imageAnswerCorrectly = document.querySelector('.imageAnswerCorrectly').value
    // let textIncorrectAnswer1 = document.querySelector('.textIncorrectAnswer1').value
    // let textIncorrectAnswer2 = document.querySelector('.textIncorrectAnswer2').value
    // let textIncorrectAnswer3 = document.querySelector('.textIncorrectAnswer3').value

    // let imageAnswerIncorrect1 = document.querySelector('.imageAnswerIncorrect1').value
    // let imageAnswerIncorrect2 = document.querySelector('.imageAnswerIncorrect2').value
    // let imageAnswerIncorrect3 = document.querySelector('.imageAnswerIncorrect3').value    
    // infosAnswer[id] = {
    //     question : question,
    //     colorBg: colorBackgroundQuestion,
    //     correctlyAnswer: correctlyAnswer,
    //     imageAnswerCorrectly: imageAnswerCorrectly,
    //     textIncorrectAnswer1: textIncorrectAnswer1,
    //     imageAnswerIncorrect1: imageAnswerIncorrect1,
    //     textIncorrectAnswer2: textIncorrectAnswer2,
    //     imageAnswerIncorrect2:imageAnswerIncorrect2,
    //     textIncorrectAnswer3: textIncorrectAnswer3,
    //     imageAnswerIncorrect3: imageAnswerIncorrect3,
    // }
}   
function editAnswer(answer, cont) {

    let hiddenBar = document.querySelectorAll('.AswerList')
    let hiddenOption = document.querySelectorAll('.newQuestion')
    for (let index = 0; index < hiddenBar.length; index++) {
        if (hiddenBar[index].classList.contains('hidden')) {
            hiddenBar[index].classList.remove('hidden')
        } if (!hiddenOption[index].classList.contains("hidden")) {
            hiddenOption[index].classList.add('hidden')
        }

    }
    hiddenBar[cont].classList.add('hidden')
    hiddenOption[cont].classList.remove('hidden')
    save(cont)
    id = cont
}

function createNewLvls() {

    let subtitle = document.querySelector('h2')
    subtitle.innerHTML = 'Agora, decida os níveis!'
    let container = document.querySelector('.creatingQuizz')
    let button = document.querySelector('.btn-basic-info')
    button.innerHTML = 'Finalizar Quizz'
    button.setAttribute('onclick', 'finishQuizz()')
    container.innerHTML = ''
    for (let index = 0; index < infoQuizz.nLevels.value; index++) {
        cont = index
        console.log(cont);
        if (index == 0) {
            container.innerHTML =
                `
            <div class='creatingQuizz levelList ${cont} hidden'>
                <h3>Nível ${index + 1}</h3>
                <ion-icon  id="${index}" onclick='showLevels(${cont})' name="create-outline"></ion-icon>
            </div>
            <div class='newLevel ${cont}'>
                <p class ='subtitle-questions' id=${index}>Nível ${index + 1} </p>
                <input type="text" class="titleNivel ${index}"  placeholder="Titulo do nível">
                <input type='text' class='percents ${index}'  placeholder ='% de acertos mínima'/>
                <input type='text' class='urlNivel ${index}'  placeholder ='URL da imagem  do nível'/>
                <textarea type="text" class="descriptionNivel ${index} placeholder="descrição do nível" > </textarea>
            </div>
            `
        } else {
            container.innerHTML +=
                `
            <div class='creatingQuizz levelList  ${cont}'>
                <h3>Nível ${index + 1}</h3>
                <ion-icon  id="${index}" onclick='showLevels(${cont})' name="create-outline"></ion-icon>
            </div>
            <div class='newLevel ${cont} hidden'>
                <p class ='subtitle-questions' id=${index}>Nível ${index + 1} </p>
                <input type="text" class="titleNivel ${index}"  placeholder="Titulo do nível">
                <input type='text' class='percents ${index}'  placeholder ='% de acertos mínima'/>
                <input type='text' class='urlNivel ${index}'  placeholder ='URL da imagem  do nível'/>
                <textarea type="text" class="descriptionNivel ${index} placeholder="descrição do nível" > </textarea>
            </div>
            `
        }

    }
}

function showLevels(cont) {
    let hiddenBar = document.querySelectorAll('.levelList')
    let hiddenOption = document.querySelectorAll('.newLevel')
    for (let index = 0; index < hiddenBar.length; index++) {
        if (hiddenBar[index].classList.contains('hidden')) {
            hiddenBar[index].classList.remove('hidden')
        } if (!hiddenOption[index].classList.contains("hidden")) {
            hiddenOption[index].classList.add('hidden')
        }

    }
    console.log(hiddenBar);
    console.log(hiddenOption);
    console.log(cont);
    hiddenBar[cont].classList.add('hidden')
    hiddenOption[cont].classList.remove('hidden')
}
function finishQuizz() {
    let subtitle = document.querySelector('h2')
    subtitle.innerHTML = 'Seu quizz está pronto!'
    let container = document.querySelector('.creatingQuizz')

    let button = document.querySelector('.btn-basic-info')
    button.innerHTML = 'Acessar Quizz'
    button.setAttribute('onclick', 'finishQuizz()')
    container.innerHTML = `
        <div class='finalscreen'>
             <img class ='imgFinish' src=${infoQuizz.urlImage.value}></img>
             <h4 class='subtitleImg'>${infoQuizz.title.value}</h4>
        </div>
    `

}