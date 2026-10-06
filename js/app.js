let liveScore = 0;
let cat_1_Score = 0; // Geography
let cat_2_Score = 0; // History
let cat_3_Score = 0; // Science
let totalScore = 0;

let questionIdx = 0;
let selectedCategory;
let completedCategories = [];

// CACHED ELEMENTS

const categorySelectEl = document.getElementById("category-select");
const questionTextEl = document.getElementById("question");
const answersButtonEl = document.querySelectorAll("#offered-answers .btn");

const allAnswersArr = Array.from(answersButtonEl);
console.dir(allAnswersArr);

const liveScoreSpanEl = document.querySelector("#live-score span");
const geoPointsSpanEl = document.querySelector("#cat-1_points span");
const hisPointsSpanEl = document.querySelector("#cat-2_points span");
const sciPointsSpanEl = document.querySelector("#cat-3_points span");
const totalPointsSpanEl = document.querySelector("#total_points span");


// FUNCTIONS ========================

//display question and answers
//--------------------------

function displayQuestion() {
    const currQuestionObj = quizData[selectedCategory][questionIdx];
    questionTextEl.textContent = currQuestionObj.question; // here fills the question
    
    allAnswersArr.forEach((btn, index) => {
        btn.textContent = currQuestionObj.answers[index];
        btn.classList.remove("correct", "wrong");
        btn.classList.remove("disabled-click"); //uklanja zabranu klikanja nakon postavke novih pitanja
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

// display/update scores
//=====================

function updateScores() {
    liveScoreSpanEl.textContent = liveScore;
    geoPointsSpanEl.textContent = cat_1_Score;
    hisPointsSpanEl.textContent = cat_2_Score;
    sciPointsSpanEl.textContent = cat_3_Score;
    totalScore = cat_1_Score + cat_2_Score + cat_3_Score;
    totalPointsSpanEl.textContent = totalScore;
}

//checking answer
//===================

function checkAnswer(event) {
    const btn = event.currentTarget;
    
    allAnswersArr.forEach(btn => btn.classList.add("disabled-click")); // zabrana klkanja nakon izabranog odgovora
    
    const correctIdx = quizData[selectedCategory][questionIdx].correctIndex;
    if (Number(btn.id) === correctIdx) {
        btn.classList.add("correct");
        liveScore +=1;
    } else {
        btn.classList.add("wrong");
        allAnswersArr[correctIdx].classList.add("correct");
    }
    setTimeout(isCategoryFinished, 850);
    setTimeout(updateScores, 850);// postavi nove rezultate!!!
}

// input new question from category
//================================

function isCategoryFinished() {
  if (questionIdx < quizData[selectedCategory].length - 1) {
    questionIdx += 1;
    displayQuestion();
  } else {
    questionTextEl.textContent = "This set of questions is over! Choose another category!";
    
    if (selectedCategory === "geography") cat_1_Score = liveScore;
    if (selectedCategory === "history") cat_2_Score = liveScore;
    if (selectedCategory === "science") cat_3_Score = liveScore;
    
    if (!completedCategories.includes(selectedCategory)) {
        completedCategories.push(selectedCategory);
    }

        liveScore = 0;
        questionIdx = 0;

        const totalCategoriesCount = Object.keys(quizData).length;

    }

}

// EVENT LISTENERS ==========================

categorySelectEl.addEventListener("change", checkCategory);

allAnswersArr.forEach((btn, index) => {
  btn.addEventListener("click", checkAnswer);
});

