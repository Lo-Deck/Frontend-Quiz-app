# Frontend Mentor - Frontend quiz app solution

This is a solution to the [Frontend quiz app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/frontend-quiz-app-BE7xkzXQnU). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)



## Overview

### The challenge

Users should be able to:

- Select a quiz subject
- Select a single answer from each question from a choice of four
- See an error message when trying to submit an answer without making a selection
- See if they have made a correct or incorrect choice when they submit an answer
- Move on to the next question after seeing the question result
- See a completed state with the score after the final question
- Play again to choose another subject
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page
- Navigate the entire app only using their keyboard
- **Bonus**: Change the app's theme between light and dark

### Screenshot

![screenshot mobile-dark](https://github.com/Lo-Deck/Frontend-Quiz-app/blob/main/screenshot/Frontend%20quiz%20app-mobile-dark-question.png).
![screenshot mobile-dark-menu](https://github.com/Lo-Deck/Frontend-Quiz-app/blob/main/screenshot/Frontend%20quiz%20app-mobile-dark.png).
![screenshot desktop-dark](https://github.com/Lo-Deck/Frontend-Quiz-app/blob/main/screenshot/Frontend%20quiz%20app-desktop-dark.png).
![screenshot desktop-light](https://github.com/Lo-Deck/Frontend-Quiz-app/blob/main/screenshot/Frontend%20quiz%20app-desktop-light.png).


### Links

- Solution URL: [Repositories](https://github.com/Lo-Deck/Frontend-Quiz-app).
- Live Site URL: [Website](https://lo-deck.github.io/Frontend-Quiz-app/).


## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow


### What I learned

I learned how to make a light-dark theme using 

```css

:root{

  /*LIGHT*/

  --color-background-body: #F4F6FA;
  --color-text-italic: #626C7F;
  --color-text: #313E51;
...

}

body[data-theme="dark"]{

  /*DARK*/

  --color-background-body: #313E51;
  --color-text-italic: #ABC1E1;
  --color-text: #fff;
  --color-background-li: #3B4D66;
...

}

```

and just set `<body data-theme="light">` in the HTML. 

In the JS just add a listener within the `<button>`

```js

document.querySelector('.button-switch').addEventListener('click', () => {

    isdarkLightclicked = !isdarkLightclicked;

    if(isdarkLightclicked){
        document.querySelector('.switch').style.transform = 'translateX(clamp(0.375rem, 0.2557rem + 0.5089vw, 0.5rem))'; 
        document.querySelector('body').setAttribute('data-theme', 'dark');        
    }

...

});

```
I set an automatic light dark mode depending on the preferences users `if(window.matchMedia("(prefers-color-scheme: dark)").matches)`.


For the quiz, I fetch the data save the current quizzz in an array and display it

```js
document.querySelectorAll('.container-li-questions .li-question').forEach((item) => {

    item.addEventListener('click', () => {

        fetchData().then( (data) => {

            let whichQuizz = (window.location.href).split('#');

            document.querySelector('.container-quizz-title').style.display = 'block';
...

```

You can navigate through the website using only your keyboard

```js
document.addEventListener('keyup', (event) => {

    let currentElement = document.activeElement;
    let currentIndex = arrayFocus.indexOf(currentElement);

    event.preventDefault();

    switch(event.code){

        case "ArrowDown":

            if(currentIndex >= 0){

                let nextIndex = currentIndex + 1;

...

```



### Continued development

Learning from each challenge, I will continue to make website with JS and learning from different challenge from Front-end Mentor.


### Useful resources

- [Mozilla mdn](https://developer.mozilla.org/) - Very useful.
- [FreeCodeCamp](https://www.freecodecamp.org/) - I've been learning a lot.
- [Utopia](https://utopia.fyi/) - To have a better responsive design.


## Author

- Frontend Mentor - [@Lo-deck](https://www.frontendmentor.io/profile/Lo-Deck)


## Acknowledgments

Thanks to Front-end Mentor and its community.
