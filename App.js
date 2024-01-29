const questions = 
[
    {
        question: "In JS, which of the following is not a data type?",
        answers : [
            {text: "Boolean", correct:false},
            {text: "Number", correct:false},
            {text: "Undefined", correct:false},
            {text: "Float", correct:true},
        ]
    },
    {
        question: "In HTML DOM, everything is a  ____",
        answers : [
            {text: "Element", correct:false},
            {text: "Array", correct:false},
            {text: "Node", correct:true},
            {text: "Variable", correct:false},
        ]
    },
    {
        question: "Which of the following methods is used to access HTML element using JS?",
        answers : [
            {text: "getElementById()", correct:false},
            {text: "getElementByClassName()", correct:false},
            {text: "Both of the above", correct:true},
            {text: "None of the above", correct:false},
        ]
    },
    {
        question: "Which of the following CSS framework is used to create a responsive design?",
        answers : [
            {text: "django", correct:false},
            {text: "angular", correct:false},
            {text: "jQuery", correct:false},
            {text: "Bootstrap", correct:true},
        ]
    },
    {
        question: "In which part of the HTML metadata is contained?",
        answers : [
            {text: "title tag", correct:false},
            {text: "body tag", correct:false},
            {text: "head tag", correct:true},
            {text: "html tag", correct:false},
        ]
    }
];


const questionElement = document.getElementById("questions");

const answerButtons = document.querySelector("#answer-buttons");

const nextButton = document.querySelector("#next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz()
{
    currentQuestionIndex = 0;
    score = 0;
     nextButton.innerHTML = "Next";
     showQuestion();
}

function showQuestion()
{
    resetState();

    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => 
        {
            const button = document.createElement("button");
            button.innerHTML = answer.text;
            button.classList.add("btn");
            answerButtons.appendChild(button);
            if(answer.correct)
            {
                button.dataset.correct = answer.correct;
            }
            button.addEventListener("click", selectAnswer);
        }); 
} 


function resetState()
{
    nextButton.style.display = "none";
    while(answerButtons.firstChild)
    {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}


function selectAnswer(e)
{
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect)
    {
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button => 
        {
            if(button.dataset.correct === "true"){
                button.classList.add("correct");
            }
            button.disabled = true;
        });
        nextButton.style.display = "block";
}


function showScore()
{
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Again";
    nextButton.style.display = "block";
}
    

function handleNextButton()
{
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length)
    {
        showQuestion();
    }else{
        showScore();
    }
}


nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})

startQuiz();