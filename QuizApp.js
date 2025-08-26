

const ques = [{
    questions: 'What is the fastest car?',
    answers: [
        { count: 'BMW', right: 'false' },
        { count: 'Rolls Royce', right: 'false' },
        { count: 'Bugatti Chiron', right: 'true' },
        { count: 'Tesla', right: 'false' }
    ]
},
{
    questions: 'Number of planets?',
    answers: [
        { count: '5', right: 'false' },
        { count: '6', right: 'false' },
        { count: '8', right: 'true' },
        { count: '2', right: 'false' }
    ]
},
{
    questions: 'King of the jungle',
    answers: [
        { count: 'Elephant', right: 'false' },
        { count: 'Tiger', right: 'false' },
        { count: 'Gorilla', right: 'false' },
        { count: 'Lion', right: 'true' }
    ]
},
{
    questions: 'Number of continents?',
    answers: [
        { count: '5', right: 'false' },
        { count: '2', right: 'false' },
        { count: '7', right: 'true' },
        { count: '4', right: 'false' }
    ]
}
];

const qus = document.getElementById('topics');
const ansbtn = document.getElementById('options');
const nextbtn = document.getElementById('later');

let currentquestionIndex = 0;
let score = 0;

function startQuiz() {
    currentquestionIndex = 0;
    score = 0;
    nextbtn.innerHTML = 'Next';
    showQuestion();
}

function showQuestion(){
    resetQuiz();
    currentquestion = ques[currentquestionIndex];
    questionNo = currentquestionIndex + 1;
    qus.innerHTML = questionNo + '.' + currentquestion.questions;
    currentquestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerHTML = answer.count;
        button.classList.add('answerbtn');
        button.dataset.correct = answer.right;
        button.addEventListener('click', selectAnswer);
        ansbtn.appendChild(button);
    });
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === 'true';
    // Disable all buttons
    Array.from(ansbtn.children).forEach(btn => btn.disabled = true);
    if(isCorrect){
        selectedBtn.classList.add('correct');
        // Add checkmark icon
        if (!selectedBtn.querySelector('.correct-icon')) {
            selectedBtn.innerHTML += " <span class='correct-icon'>&#10003;</span>";
        }
        score++;
    }else{
        selectedBtn.classList.add('incorrect');
        // Highlight the correct answer and add checkmark
        Array.from(ansbtn.children).forEach(btn => {
            if(btn.dataset.correct === 'true'){
                btn.classList.add('correct');
                if (!btn.querySelector('.correct-icon')) {
                    btn.innerHTML += " <span class='correct-icon'>&#10003;</span>";
                }
            }
        });
    }
    // Make all other options yellow
    Array.from(ansbtn.children).forEach(btn => {
        if(!btn.classList.contains('correct') && !btn.classList.contains('incorrect')){
            btn.classList.add('selected');
        }
    });
    // Show Next button
    nextbtn.style.display = 'inline-block';
    nextbtn.onclick = () => {
        currentquestionIndex++;
        if(currentquestionIndex < ques.length) {
            showQuestion();
        } else {
            showScore();
        }
    };
}

function showScore() {
    resetQuiz();
    qus.innerHTML = `Quiz Complete!`;
    ansbtn.innerHTML = `<div style='text-align:center;font-size:1.2em;margin:20px 0;'>You scored ${score} out of ${ques.length}!</div>`;
    nextbtn.style.display = 'none';
}

function resetQuiz(){
    nextbtn.style.display = 'none';
    while(ansbtn.firstChild){
        ansbtn.removeChild(ansbtn.firstChild);
    }
}

startQuiz();