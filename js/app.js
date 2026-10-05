let liveScore;
let cat_1_Score;
let cat_2_Score;
let cat_3_Score;
let totalScore;
let displayedQuestion;

let questionIdx = 0;
let selectedCategory;


// CACHED ELEMENTS

const categorySelectEl = document.getElementById("category-select");
// console.log(categorySelectEl);
const questionTextEl = document.getElementById("question");
// console.log(questionTextEl);
const answersButtonEl = document.querySelectorAll("#offered-answers .btn");
// console.log(answersButtonEl);
 
const allAnswersArr = Array.from(answersButtonEl);
console.dir(allAnswersArr);


// FUNCTIONS

// function checkCategory(event) {
    
// };

// function checkAnswer(event) {
//     
// };


// EVENT LISTENERS

categorySelectEl.addEventListener("change", function(event) {
    selectedCategory = event.target.value.toLowerCase();
    if (!selectedCategory || !quizData[selectedCategory]) return; //if chooses nothing
    questionTextEl.textContent = quizData[selectedCategory][questionIdx].question; // here fills the question
    allAnswersArr.forEach((btn, index) => { 
        btn.textContent = quizData[selectedCategory][questionIdx].answers[index];
    });
});

allAnswersArr.forEach((btn, index) => {
    btn.addEventListener("click", function(event) {
    // console.log(event.target);
    // console.log(event.currentTarget);
    if(Number(btn.id) === quizData[selectedCategory][questionIdx].correctIndex) {
        btn.classList.add("correct");
    } else {
        btn.classList.add("wrong");
        allAnswersArr[quizData[selectedCategory][questionIdx].correctIndex].classList.add("correct");
    }
    });
});








// ===================================================================

// ===================================================================

// ===================================================================