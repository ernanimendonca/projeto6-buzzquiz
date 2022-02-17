let infosAnswer =[]
let id = 1

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
    createNewBuzzQuiz(inputs)
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

function createNewBuzzQuiz(infos) {
    let subtitle = document.querySelector('h2')
    let containerQuestions = document.querySelector(".questions")
    let button = document.querySelector('.btn-basic-info')
    let listAnswer =  containerQuestions.parentNode
    subtitle.innerHTML ='Crie suas perguntas'
    containerQuestions.innerHTML =''
    containerQuestions.classList.add('creatingQuizz')
    containerQuestions.classList.remove('questions')
    button.innerHTML = 'Prosseguir para criar niveis'
    button.setAttribute('onclick','createNewLvls()')
    
        containerQuestions.innerHTML =
        `<div class='newQuestion ${id}'>
            <p class ='subtitle-questions' id ='1'>Pergunta 1 </p>
            <input type="text" class="textQuestion ${id}" placeholder="Texto da pergunta">
            <input type='text' class='colorQuestion ${id}' placeholder ='Cor de fundo da pergunta'/>

            <h2 class='right answer'>Resposta correta</h2>

            <input type="text" class="correctlyAnswer ${id}" placeholder="Resposta correta">
            <input type='text' class='imageAnswerCorrectly ${id}' placeholder ='Url da imagem'/>

            <h2 class=' answer'>Respostas Incorretas </h2>
            <div class='incorrectAnswer'>
                <input type="text" class="textIncorrectAnswer1" placeholder="Resposta incorreta 1">
                <input type='text' class='imageAnswerIncorrect1' placeholder ='Url da imagem'/>
            </div>
            <div class='incorrectAnswer'>
                <input type="text" class="textIncorrectAnswer2" placeholder="Resposta incorreta 2">
                <input type='text' class='imageAnswerIncorrect2' placeholder ='Url da imagem'/>
            </div>
            <div class='incorrectAnswer'>
                <input type="text" class="textIncorrectAnswer3" placeholder="Resposta incorreta 3">
                <input type='text' class='imageAnswerIncorrect3' placeholder ='Url da imagem'/>
            </div>
        </div>
        <button onclick='save()'>save this</button>
        `    
        for (let index = 1; index < infos.nQuestions.value; index++) {
            console.log(index+1);
            listAnswer.innerHTML +=
            `
                <div class='creatingQuizz AswerList'>
                    <h3>Pergunta ${index + 1}</h3>
                    <ion-icon  id="${index + 1}" onclick='editAnswer(this)' name="create-outline"></ion-icon>
                </div>
            `   
        }
}
function save(params) {
    let question = document.querySelector(`.textQuestion`).value
    let colorBackgroundQuestion = document.querySelector('.colorQuestion').value
    let correctlyAnswer = document.querySelector('.correctlyAnswer').value
    let imageAnswerCorrectly = document.querySelector('.imageAnswerCorrectly').value
    let textIncorrectAnswer1 = document.querySelector('.textIncorrectAnswer1').value
    let textIncorrectAnswer2 = document.querySelector('.textIncorrectAnswer2').value
    let textIncorrectAnswer3 = document.querySelector('.textIncorrectAnswer3').value
    
    let imageAnswerIncorrect1 = document.querySelector('.imageAnswerIncorrect1').value
    let imageAnswerIncorrect2 = document.querySelector('.imageAnswerIncorrect2').value
    let imageAnswerIncorrect3 = document.querySelector('.imageAnswerIncorrect3').value    
    infosAnswer[id] = {
        question : question,
        colorBg: colorBackgroundQuestion,
        correctlyAnswer: correctlyAnswer,
        imageAnswerCorrectly: imageAnswerCorrectly,
        textIncorrectAnswer1: textIncorrectAnswer1,
        imageAnswerIncorrect1: imageAnswerIncorrect1,
        textIncorrectAnswer2: textIncorrectAnswer2,
        imageAnswerIncorrect2:imageAnswerIncorrect2,
        textIncorrectAnswer3: textIncorrectAnswer3,
        imageAnswerIncorrect3: imageAnswerIncorrect3,
    }
    console.log(infosAnswer);

}
function editAnswer(answer) {
    console.log(answer);
    let containerQuestions = document.querySelector(".questions")
    let checkHowAnswerIsOpen = document.querySelector('.newQuestion p')
    console.log(checkHowAnswerIsOpen.id);
    answer.parentNode.innerHTML =  
      `
    <div class='newQuestion'>
        <p class ='subtitle-questions' id ='1'>Pergunta 1 </p>
        <input type="text" class="title" placeholder="Texto da pergunta">
        <input type='text' class='colorQuestion' placeholder ='Cor de fundo da pergunta'/>

        <h2 class='right answer'>Resposta correta</h2>

        <input type="text" class="title" placeholder="Resposta correta">
        <input type='text' class='imageAnswer' placeholder ='Url da imagem'/>

        <h2 class=' answer'>Respostas Incorretas </h2>
        <div class='incorrectAnswer'>
            <input type="text" class="title" placeholder="Resposta incorreta 1">
            <input type='text' class='colorQuestion' placeholder ='Url da imagem'/>
        </div>
        <div class='incorrectAnswer'>
            <input type="text" class="title" placeholder="Resposta incorreta 2">
            <input type='text' class='colorQuestion' placeholder ='Url da imagem'/>
        </div>
        <div class='incorrectAnswer'>
            <input type="text" class="title" placeholder="Resposta incorreta 3">
            <input type='text' class='colorQuestion' placeholder ='Url da imagem'/>
        </div>
    </div>
`    
}

function createNewLvls() {
    console.log('teste');
}