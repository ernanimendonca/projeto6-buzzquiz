let infosAnswer = []
let id = 0
let infoQuizz = []
let cont = 0
let answerCreateQuiz = []
let respostas = []
let pergunta = []
let levels = []
let infosPage = []
let perguntas =[]
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
    infoQuizz = inputs
    infosAnswer.length = inputs.nQuestions.value
    if (isInputValid(inputs)) {
        createNewBuzzQuiz(inputs)
    } else {
        console.log('deu ruim');
    }
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
                <div class='newQuestion ${index}' data-index ='${index}'>
                    <p class ='subtitle-questions' id=${index}>Pergunta ${index + 1} </p>
                    <input type="text" class="textQuestion ${index}" value =''  placeholder="Texto da pergunta">
                    <input type='text' class='colorQuestion ${index}' value =''  placeholder ='Cor de fundo da pergunta'/>
        
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
                <div class='newQuestion ${index} hidden' data-index ='${index}'>
                    <p class ='subtitle-questions' id=${index}>Pergunta ${index + 1} </p>
                    <input type="text" class="textQuestion ${index}" value =''  placeholder="Texto da pergunta">
                    <input type='text' class='colorQuestion ${index}' value =''  placeholder ='Cor de fundo da pergunta'/>
        
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
        }
    }
}
function saveQuestions() {

    pergunta = []
    let opcao = []
    let cont = 0
    let question = [...document.querySelectorAll(`.newQuestion`)]
    let titleQuestion = [...document.querySelectorAll(`.textQuestion`)]
    let colorTittle = [...document.querySelectorAll(`.colorQuestion`)]

    let todasimagens = [...document.querySelectorAll(`.i `)]
    let todasopcoes = [...document.querySelectorAll(`.q`)]

    //for que pega todas as perguntas
    console.log(todasopcoes);
    // console.log(opcao);
    for (let index = 0; index < question.length; index++) {
        
        for (let j = 0; j < 4; j++) {
            if (todasopcoes[j].classList.contains('correctlyAnswer')) {
                
                opcao[j] = {
                    text: todasopcoes[j].value,
                    image: todasimagens[j].value,
                    isCorrectAnswer: true,
                }

            } else {
                opcao[j] = {
                    text: todasopcoes[j].value,
                    image: todasimagens[j].value,
                    isCorrectAnswer: false,
                }
            }
            pergunta[index] = {
                title: titleQuestion[index].value,
                color: colorTittle[index].value,
                answers: [opcao],
            }
        }
    }
    respostas = [{
        title: infoQuizz.title.value,
        image: infoQuizz.urlImage.value,
        questions: pergunta,
        levels: []
    }]
}
function editAnswer(answer, cont) {
    let containerInfos = [...document.querySelectorAll('.newQuestion')]
    infosPage = []
    for (let index = 0; index < containerInfos.length; index++) {
        if (!containerInfos[index].classList.contains('hidden')) {
            infosPage = containerInfos[index]
        }
    }

    let titlevalid = infosPage.querySelector('.textQuestion')
    titlevalid = titlevalid.value
    let hexadec = infosPage.querySelector('.colorQuestion')
    hexadec = hexadec.value
    
    let correctlyAnswer = infosPage.querySelector('.correctlyAnswer')
    correctlyAnswer = correctlyAnswer.value
    let imageAnswerCorrectly = infosPage.querySelector('.imageAnswerCorrectly')
    imageAnswerCorrectly = imageAnswerCorrectly.value

    let textIncorrectAnswer1 = infosPage.querySelector('.textIncorrectAnswer1')
    textIncorrectAnswer1 = textIncorrectAnswer1.value
    let imageAnswerIncorrect1 = infosPage.querySelector('.imageAnswerIncorrect1')
    imageAnswerIncorrect1 = imageAnswerIncorrect1.value

    let textIncorrectAnswer2 = infosPage.querySelector('.textIncorrectAnswer2')
    textIncorrectAnswer2 = textIncorrectAnswer2.value
    let imageAnswerIncorrect2 = infosPage.querySelector('.imageAnswerIncorrect2')
    imageAnswerIncorrect2 = imageAnswerIncorrect2.value

    let textIncorrectAnswer3 = infosPage.querySelector('.textIncorrectAnswer3')
    textIncorrectAnswer3 = textIncorrectAnswer3.value
    let imageAnswerIncorrect3 = infosPage.querySelector('.imageAnswerIncorrect3')
    imageAnswerIncorrect3 = imageAnswerIncorrect3.value


    let istitlevalid = isTitleValid(titlevalid)
    let isHexadecValid = ''

    let iscorrectlyAnswerValid = isTitleValid(correctlyAnswer)
    let istextIncorrectAnswer1 = isTitleValid(textIncorrectAnswer1)
    let istextIncorrectAnswer2 = isTitleValid(textIncorrectAnswer2)
    let istextIncorrectAnswer3 = isTitleValid(textIncorrectAnswer3)

    let isImageAnswerCorrectlyValid = isURLValid(imageAnswerCorrectly)
    let isimageAnswerIncorrect1Valid = isURLValid(imageAnswerIncorrect1)
    let isimageAnswerIncorrect2Valid = isURLValid(imageAnswerIncorrect2)
    let isimageAnswerIncorrect3Valid = isURLValid(imageAnswerIncorrect3)

   
    if (istitlevalid == true && iscorrectlyAnswerValid == true && istextIncorrectAnswer1 == true && istextIncorrectAnswer2 == true && istextIncorrectAnswer3 == true && isImageAnswerCorrectlyValid == true && isimageAnswerIncorrect1Valid == true && isimageAnswerIncorrect2Valid == true && isimageAnswerIncorrect3Valid == true) {
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

        id = cont

    } else {
        console.log('algo deu errado');
    }
    perguntas =[]
    for (let index = 0; index < containerInfos.length; index++) {
        if (index == infosPage.dataset.index){
            perguntas[index] = infosPage
        }
    }

}

function createNewLvls() {
    
    saveQuestions()
    let subtitle = document.querySelector('h2')
    subtitle.innerHTML = 'Agora, decida os níveis!'
    let container = document.querySelector('.creatingQuizz')
    let button = document.querySelector('.btn-basic-info')
    button.innerHTML = 'Finalizar Quizz'
    button.setAttribute('onclick', 'finishQuizz()')
    container.innerHTML = ''
    for (let index = 0; index < infoQuizz.nLevels.value; index++) {
        cont = index

        if (index == 0) {
            container.innerHTML =
                `
            <div class='creatingQuizz levelList ${cont} hidden'>
                <h3>Nível ${index + 1}</h3>
                <ion-icon  id="${index}" onclick='showLevels(${cont})' name="create-outline"></ion-icon>
            </div>
            <div class='newLevel ${cont}'>
                <p class ='subtitle-questions' id=${index}>Nível ${index + 1} </p>
                <input type="text" class="titlelvl ${index}"  placeholder="Titulo do nível">
                <input type='text' class='percentslvl ${index}'  placeholder ='% de acertos mínima'/>
                <input type='text' class='urlNivellvl ${index}'  placeholder ='URL da imagem  do nível'/>
                <input type="text" class="descriptionlvl ${index}" placeholder="descrição do nível" > </input>
            </div>
            `
        } else {
            container.innerHTML +=
                `
            <div class='creatingQuizz levelList  ${cont}'>
                <h3>Nível ${index + 1}</h3>
                <ion-icon  id="${index}" onclick='showLevels(${cont})' name="create-outline"></ion-icon>
            </div>
            <div class='newLevel hidden ${cont} '>
                <p class ='subtitle-questions' id=${index}>Nível ${index + 1} </p>
                <input type="text" class="titlelvl ${index}"  placeholder="Titulo do nível">
                <input type='text' class='percentslvl ${index}'  placeholder ='% de acertos mínima'/>
                <input type='text' class='urlNivellvl ${index}'  placeholder ='URL da imagem  do nível'/>
                <input type="text" class="descriptionlvl ${index}" placeholder="descrição do nível" > </input>
            </div>
            `
        }

    }
}

function showLevels(cont) {
    saveLvls()
    let hiddenBar = document.querySelectorAll('.levelList')
    let hiddenOption = document.querySelectorAll('.newLevel')
    for (let index = 0; index < hiddenBar.length; index++) {
        if (hiddenBar[index].classList.contains('hidden')) {
            hiddenBar[index].classList.remove('hidden')
        } if (!hiddenOption[index].classList.contains("hidden")) {
            hiddenOption[index].classList.add('hidden')
        }

    }

    hiddenBar[cont].classList.add('hidden')
    hiddenOption[cont].classList.remove('hidden')
}
function finishQuizz() {
    saveLvls()
    let subtitle = document.querySelector('h2')
    subtitle.innerHTML = 'Seu quizz está pronto!'
    let container = document.querySelector('.creatingQuizz')
    let box = document.querySelector('.basic-info')

    let button = document.querySelector('.btn-basic-info')
    button.innerHTML = 'Acessar Quizz'
    

    
    button.setAttribute('onclick', 'finishQuizz()')
    container.innerHTML = `
        <div class='finalscreen'>
             <img class ='imgFinish' src=${infoQuizz.urlImage.value}></img>
             <h4 class='subtitleImg'>${infoQuizz.title.value}</h4>
        </div>
    `
    let url = 'https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes'

    axios({
        method: 'post',
        url: url,
        data: respostas,
    }).then(item => {
        console.log(item);
    }).catch(error => {
        console.log(error);
        console.log(respostas);
    })

}
function saveLvls() {
    let container = [...document.querySelectorAll('.newLevel')]
    let titlelvl = [...document.querySelectorAll('.titlelvl')]
    let percentslvl = [...document.querySelectorAll('.percentslvl')]
    let urlNivellvl = [...document.querySelectorAll('.urlNivellvl')]
    let descriptionlvl = [...document.querySelectorAll('.descriptionlvl')]
    levels = []
    for (let index = 0; index < container.length; index++) {

        for (let j = 0; j < 2; j++) {
            levels[index] = {
                title: titlelvl[j].value,
                image: urlNivellvl[j].value,
                text: descriptionlvl[j].value,
                minValue: percentslvl[j].value
            }

        }
    }
    respostas[0].levels = levels
}
