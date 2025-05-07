
/* FETCH DATA */

async function fetchData () {

    try{

        response = await fetch('./data.json', {
            method: 'GET',
            mode: 'cors',
            headers:{
                'Content-Type': 'application/json'
            }
        });

        if(!response.ok){
            throw(`Error loading data : ${response.status}`);
        }

        const data = await response.json();

        return data;

    }
    catch(error){
        console.error('Error: ', error);
    }

}


function displayQuestion(indexQuestion){

    document.querySelector('.container-quizz .question-title span').textContent = `${indexQuestion+1}`;                  
    document.querySelector('.container-quizz .text').textContent = `${array.questions[indexQuestion].question}`;
    document.querySelector('.container-progress-bar .progress-bar').style.width = `${(indexQuestion+1) * 10}%`;

    document.querySelectorAll('.container-li-quizz .li-question span:nth-of-type(1)').forEach( (item, index) => {
        item.textContent = `${array.questions[indexQuestion].options[index]}`;
    });

    document.querySelectorAll('.container-li-quizz input[type="radio"]').forEach( (item, index) => {
        item.value = `${array.questions[indexQuestion].options[index]}`;
    });

}


/*DARK LIGHT MODE */

let isdarkLightclicked = false;

document.querySelector('.button-switch').addEventListener('click', () => {

    isdarkLightclicked = !isdarkLightclicked;

    if(isdarkLightclicked){
        document.querySelector('.switch').style.transform = 'translateX(clamp(0.375rem, 0.2557rem + 0.5089vw, 0.5rem))'; 
        document.querySelector('body').setAttribute('data-theme', 'dark');        
    }

    if(!isdarkLightclicked){
        document.querySelector('.switch').style.transform = 'translateX(clamp(-0.625rem, -0.0143rem + -1.2723vw, -0.3125rem))';        
        document.querySelector('body').setAttribute('data-theme', 'light');
    }

});


if(window.matchMedia("(prefers-color-scheme: dark)").matches){

    isdarkLightclicked = !isdarkLightclicked;

    if(isdarkLightclicked){
        document.querySelector('.switch').style.transform = 'translateX(clamp(0.375rem, 0.2557rem + 0.5089vw, 0.5rem))'; 
        document.querySelector('body').setAttribute('data-theme', 'dark');        
    }

    if(!isdarkLightclicked){
        document.querySelector('.switch').style.transform = 'translateX(clamp(-0.625rem, -0.0143rem + -1.2723vw, -0.3125rem))';        
        document.querySelector('body').setAttribute('data-theme', 'light');
    }

};

let array;
let arrayFocus = [];

let indexQuestion = 0;
let correctAnswer = 0;


document.querySelectorAll('.container-li-questions .li-question').forEach((item) => {

    item.addEventListener('click', () => {

        fetchData().then( (data) => {

            let whichQuizz = (window.location.href).split('#');

            document.querySelector('.container-quizz-title').style.display = 'block';

            window.innerWidth >= 768 ? document.querySelector('.container-quizz').style.display = 'flex' : document.querySelector('.container-quizz').style.display = 'block';

            // document.querySelector('.container-quizz').style.display = 'flex';
            document.querySelector('.container-li-quizz').style.display = 'block';
            document.querySelector('.main-title').style.display = 'none';
            document.querySelector('.container-li-questions').style.display = 'none';

            indexQuestion = 0;
            correctAnswer = 0;

            
            for(let i = 0; i < data.quizzes.length; i++){
                
                if(whichQuizz[1] === data.quizzes[i].title){

                    array = data.quizzes[i];

                    document.querySelector('.quizz-title').innerHTML = `<div class="container-icon"><img class="" src="${array.icon}" alt="${array.title}"></div><span>${array.title}</span>`;            
                    document.querySelector('.quizz-title .container-icon').style.background = `var(--color-icon-${array.title})`;
                    document.querySelector('.container-quizz .question-title span').textContent = `${indexQuestion+1}`;     
                    document.querySelector('.container-quizz .text').textContent = `${array.questions[indexQuestion].question}`;
                    document.querySelector('.container-progress-bar .progress-bar').style.width = `${(indexQuestion+1) * 10}%`;

                    document.querySelectorAll('.container-li-quizz .li-question span:nth-of-type(1)').forEach( (item, index) => {
                        item.textContent = `${array.questions[indexQuestion].options[index]}`;
                    });

                    document.querySelectorAll('.container-li-quizz input[type="radio"]').forEach( (item, index) => {
                        item.value = `${array.questions[indexQuestion].options[index]}`;
                    });

                    break;
                                                
                }   
                
            }

            arrayFocus = [];

            document.querySelectorAll('.focusable-input').forEach( (item) => {
            
                if(window.getComputedStyle(item.parentElement.parentElement).getPropertyValue('display') !== 'none'){
                    arrayFocus.push(item);
                }
            
            });

        })

    })

});




document.querySelector('.button-submit').addEventListener('click', () => {

    document.querySelector('.button-submit').disabled = true;

    let isAnswerSelected = false;
    let indexAnswer;
    let indexDisplayGoodResponse;

    document.querySelector('.container-li-quizz .messError').style.display = 'none';

    document.querySelectorAll('.container-li-quizz input[type="radio"]').forEach( (item, index, arrayInput) => {

        arrayInput.forEach( item => item.disabled = true );


        if(item.value === array.questions[indexQuestion].answer){       
            indexDisplayGoodResponse = index; //take index to display icon when wrong answer
        }


        if(item.checked){

            if(item.value === array.questions[indexQuestion].answer){

                document.querySelectorAll('.container-li-quizz .li-question')[index].style.outline = '0.2rem solid #2FD887';
                document.querySelectorAll('.container-li-quizz .li-question .container-icon-quizz')[index].style.background = '#2FD887';
                document.querySelectorAll('.container-li-quizz .li-question .icon-result')[index].style.background = ` url('./assets/images/icon-correct.svg') no-repeat center / 130%`;

                indexAnswer = index;
                correctAnswer++;
                isAnswerSelected = true;

            }

            else if(item.value !== array.questions[indexQuestion].answer){

                document.querySelectorAll('.container-li-quizz .li-question')[index].style.outline = '0.2rem solid #EE5454';
                document.querySelectorAll('.container-li-quizz .li-question .container-icon-quizz')[index].style.background = '#EE5454';
                document.querySelectorAll('.container-li-quizz .li-question .icon-result')[index].style.background = ` url('./assets/images/icon-error.svg') no-repeat center / 130%`;

                indexAnswer = index;
                isAnswerSelected = true;

            }

        }


        if(index === 3 && !isAnswerSelected){//if 0 answer selected                      
            document.querySelector('.container-li-quizz .messError').style.display = `block`;
            document.querySelector('.button-submit').disabled = false;
            arrayInput.forEach( item => item.disabled = false );
        }


        if(index === 3 && isAnswerSelected){

            setTimeout(() => {

                const elementStyle = window.getComputedStyle(document.querySelectorAll('.container-li-quizz .li-question .icon-result')[indexDisplayGoodResponse]).getPropertyValue('background');

                if( elementStyle === 'none' || elementStyle === 'rgba(0, 0, 0, 0)' || elementStyle.includes('none') ) {

                    document.querySelectorAll('.container-li-quizz .li-question .icon-result')[indexDisplayGoodResponse].style.background = `url('./assets/images/icon-correct.svg') no-repeat center / 130%`;

                }


            }, 1000);



            setTimeout(() => {



                indexQuestion++;

                document.querySelectorAll('.container-li-quizz .li-question .icon-result')[indexDisplayGoodResponse].style.background = `none`;
                document.querySelectorAll('.container-li-quizz .li-question')[indexAnswer].style.outline = '';
                document.querySelectorAll('.container-li-quizz .li-question .container-icon-quizz')[indexAnswer].style.background = '';
                document.querySelectorAll('.container-li-quizz .li-question .icon-result')[indexAnswer].style.background = `none`;


                arrayInput.forEach( item => item.checked = false );
                arrayInput.forEach( item => item.disabled = false );


                if(indexQuestion === array.questions.length){ //if last questions

                    document.querySelector('.main-title').style.display = 'none';
                    document.querySelector('.container-quizz').style.display = 'none';
                    document.querySelector('.container-li-questions').style.display = 'none';
                    document.querySelector('.container-li-quizz').style.display = 'none';
                    document.querySelector('.result-text').style.display = 'block';
                    document.querySelector('.section-result').style.display = 'block';
                    document.querySelector('.section-result .quizz-title span').textContent = `${array.title}`; 
                    document.querySelector('.section-result .quizz-title .container-icon').style.background = `var(--color-icon-${array.title})` ; 
                    document.querySelector('.section-result .quizz-title .container-icon img').src = `${array.icon}`;  
                    document.querySelector('.section-result .text span:nth-of-type(1)').textContent = `${correctAnswer}`;


                    document.querySelector('.button-play').addEventListener('click', () => { // go back in menu page

                        /* REBOOT GAME */

                        document.querySelector('.container-quizz-title').style.display = 'none';
                        document.querySelector('.main-title').style.display = 'block';
                        document.querySelector('.container-quizz').style.display = 'none';
                        document.querySelector('.result-text').style.display = 'none';
                        document.querySelector('.container-li-questions').style.display = 'block';
                        document.querySelector('.container-li-quizz').style.display = 'none';
                        document.querySelector('.section-result').style.display = 'none';
                        document.querySelector('.button-submit').disabled = false;

                        arrayFocus = [];

                        document.querySelectorAll('.focusable-input').forEach( (item) => {
                        
                            if(window.getComputedStyle(item.parentElement.parentElement).getPropertyValue('display') !== 'none'){
                                arrayFocus.push(item);
                            }
                        
                        });


                    });

                }
                else{

                    document.querySelector('.button-submit').disabled = false;
                    document.querySelectorAll('.container-li-quizz .li-question')[indexAnswer].style.outline = '';
                    document.querySelectorAll('.container-li-quizz .li-question .container-icon-quizz')[indexAnswer].style.background = '';
                    document.querySelectorAll('.container-li-quizz .li-question .icon-result')[indexAnswer].style.background = `none`;
                    indexDisplayGoodResponse = null;

                    displayQuestion(indexQuestion);
                    
                }
                   
            }, 2500);


        }


    });


});




document.querySelectorAll('.focusable-input').forEach( (item) => {

    if(window.getComputedStyle(item.parentElement.parentElement).getPropertyValue('display') !== 'none'){
        arrayFocus.push(item);
    }

});



document.addEventListener('keyup', (event) => {

    let currentElement = document.activeElement;
    let currentIndex = arrayFocus.indexOf(currentElement);

    event.preventDefault();

    switch(event.code){

        case "ArrowDown":

            if(currentIndex >= 0){

                let nextIndex = currentIndex + 1;

                if(nextIndex >= arrayFocus.length){
                    nextIndex = 0;
                }

                arrayFocus[nextIndex].focus();                

            }

            break;


        case "ArrowUp":

            if(currentIndex >= 0){

                let nextIndex = currentIndex - 1;

                if(nextIndex < 0){

                    nextIndex = arrayFocus.length-1;

                }
 
                arrayFocus[nextIndex].focus();

            }    

            break;


            case "Enter":

                if(currentElement.tagName === 'LABEL'){
                    document.querySelector('label:focus input').checked = true; 
                }

                break;

    }


});



window.onload = ( () => {

    document.querySelectorAll('.container-li-quizz input[type="radio"]').forEach( (item, index) => {
        item.checked = false;
    }); 

});





