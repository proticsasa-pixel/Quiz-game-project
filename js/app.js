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

const resetBtnEl = document.getElementById("reset-btn");


// FUNCTIONS ========================

//display question and answers
//--------------------------

function displayQuestion() {
    const currQuestionObj = quizData[selectedCategory][questionIdx];
    questionTextEl.textContent = currQuestionObj.question; // ovdje upisujem pitanje
    
    // quitBtnEl.classList.remove("hidden");
    resetBtnEl.classList.remove("hidden");

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
    if (!selectedCategory || !quizData[selectedCategory]) return;

    const totalCategoriesCount = Object.keys(quizData).length;
    if (completedCategories.length === totalCategoriesCount) {
        liveScore = 0;
        cat_1_Score = 0;
        cat_2_Score = 0;
        cat_3_Score = 0;
        totalScore = 0;
        completedCategories = []; // Praznimo niz završenih kategorija
        updateScores();
    }
    
    if (completedCategories.includes(selectedCategory)) {
        questionTextEl.textContent = "You finished this one. Choose another";
        allAnswersArr.forEach(btn => btn.textContent = "-");
        return;
    }

    questionIdx = 0;
    liveScore = 0;
    updateScores();
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
    updateScores();
    setTimeout(isCategoryFinished, 850);
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
        updateScores();

        // provera da li je prosao sve kategorije

        const totalCategoriesCount = Object.keys(quizData).length;
        if (completedCategories.length === totalCategoriesCount) {
            questionTextEl.textContent = "C O N G R A T U L A T I O S! You have completed Quiz!";
            allAnswersArr.forEach(btn => btn.textContent = "-");
            categorySelectEl.value = "";
            resetBtnEl.classList.add("hidden");
        } else {
            questionTextEl.textContent = "This set of questions is over! Choose another category!";
            allAnswersArr.forEach(btn => btn.textContent = "-");
        }
    }

}

function resetFullQuiz(){
    
    
    liveScore = 0;
    cat_1_Score = 0;
    cat_2_Score = 0;
    cat_3_Score = 0;
    totalScore = 0;
    questionIdx = 0;
    completedCategories = [];
    selectedCategory = null;
    
    categorySelectEl.value = ""; 
    questionTextEl.textContent = "Please select a category to start the quiz!";
    updateScores();
    
    // Sakrij kontrolnu dugmad dok se opet ne izabere kategorija
    
    resetBtnEl.classList.add("hidden");
    
    allAnswersArr.forEach(btn => {
        btn.textContent = "-";
        btn.classList.remove("correct", "wrong", "disabled-click");
    });
}

// EVENT LISTENERS ==========================

categorySelectEl.addEventListener("change", checkCategory);

allAnswersArr.forEach((btn, index) => {
  btn.addEventListener("click", checkAnswer);
});

resetBtnEl.addEventListener("click", resetFullQuiz);
