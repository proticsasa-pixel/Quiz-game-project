let liveScore = 0;
let cat_1_Score = 0; // Geography
let cat_2_Score = 0; // History
let cat_3_Score = 0; // Science
let totalScore = 0;

let questionIdx = 0;
let selectedCategory;

// CACHED ELEMENTS

const categorySelectEl = document.getElementById("category-select");
const questionTextEl = document.getElementById("question");
const answersButtonEl = document.querySelectorAll("#offered-answers .btn");

const allAnswersArr = Array.from(answersButtonEl);
console.dir(allAnswersArr);

// FUNCTIONS ========================

//display question and answers
//--------------------------

function displayQuestion() {
    const currQuestionObj = quizData[selectedCategory][questionIdx];
    questionTextEl.textContent = currQuestionObj.question; // here fills the question
    
    allAnswersArr.forEach((btn, index) => {
        btn.textContent = currQuestionObj.answers[index];
        btn.classList.remove("correct", "wrong");
        
        btn.classList.remove("disabled-click");
    });
}

//checking category
//===================

function checkCategory(event) {
    selectedCategory = event.target.value.toLowerCase();
    if (!selectedCategory || !quizData[selectedCategory]) return; //if chooses nothing
    
    questionIdx = 0;
    displayQuestion();
}

//checking answer
//===================

function checkAnswer(event) {
    const btn = event.currentTarget;
    
    allAnswersArr.forEach(b => b.classList.add("disabled-click"));
    
    const correctIdx = quizData[selectedCategory][questionIdx].correctIndex;
    if (Number(btn.id) === correctIdx) {
        btn.classList.add("correct");
    } else {
        btn.classList.add("wrong");
        allAnswersArr[correctIdx].classList.add("correct");
    }
    setTimeout(nextQuestion, 1500);
}

// input new question from category
//================================

function nextQuestion() {
  if (questionIdx < quizData[selectedCategory].length - 1) {
    questionIdx += 1;
    displayQuestion();
  } else {
    questionTextEl.textContent = "This set of questions is over! Choose another category";
    questionIdx = 0;
  }
}

// EVENT LISTENERS ==========================

categorySelectEl.addEventListener("change", checkCategory);

allAnswersArr.forEach((btn, index) => {
  btn.addEventListener("click", checkAnswer);
});

