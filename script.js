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
getAllQuizzes()
 function getAllQuizzes() {
     const URL = 'https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes'
    axios({
        method:'get',
        url: URL,
    
    }).then(item=>{
        console.log(item);
        renderAllQuizzes(item)
    }).catch(error => {
        console.log(error);
    })
 }  

 function renderAllQuizzes(response){
     let container = document.querySelector('.all')
     container.innerHTML=''
     for (let index = 0; index <response.data.length; index++) {
       console.log(response.data[index]);
         container.innerHTML +=
         `
            <div class="quizz" id=${response.data[index].id} onclick="pageQuizz(${response.data[index].id})">
                <p>${response.data[index].title}</p>
                <div class="image">
                    <img src="${response.data[index].image}" alt="Simpsons">
                    <div class="overlap"></div>
                </div>
            </div>
         `
     }
 }