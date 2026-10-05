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
console.log(categorySelectEl);
const questionTextEl = document.getElementById("question");
// console.log(questionTextEl);
const answersButtonEl = document.querySelectorAll("#offered-answers .btn");
// console.log(answersButtonEl);
 
const allAnswersArr = Array.from(answersButtonEl);
console.dir(allAnswersArr);


// FUNCTIONS

//display question and answers
//--------------------------

function displayQuestion() {
    
    const currQuestionObj = quizData[selectedCategory][questionIdx];
    questionTextEl.textContent = currQuestionObj.question; // here fills the question
    
    allAnswersArr.forEach((btn, index) => { 
        btn.textContent = currQuestionObj.answers[index];
        btn.classList.remove("correct", "wrong");
        // ...
    });
}

function checkCategory(event) {
    selectedCategory = event.target.value.toLowerCase();
    if (!selectedCategory || !quizData[selectedCategory]) return; //if chooses nothing
    
    questionIdx = 0;
    displayQuestion();
};

function checkAnswer(event) {
    const btn = event.currentTarget; 
    const correctIdx = quizData[selectedCategory][questionIdx].correctIndex;
    if(Number(btn.id) === correctIdx) {
        btn.classList.add("correct");
    } else {
        btn.classList.add("wrong");
        allAnswersArr[correctIdx].classList.add("correct");
    }
    };
    
    //==============================
    //==============================
    //==============================

        
        // EVENT LISTENERS
        
        categorySelectEl.addEventListener("change", checkCategory);
        
        allAnswersArr.forEach((btn, index) => {
            btn.addEventListener("click", checkAnswer);
        });

    // if(questionIdx < quizData[selectedCategory].length - 1) {
    // questionIdx +=1;
    // } else {
    // questionIdx = 0;
    // alert("This set of question is over!");
    // }









// ===================================================================

// ===================================================================

// ===================================================================