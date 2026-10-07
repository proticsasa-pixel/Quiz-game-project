const successAudio = new Audio("./audio/success.mp3"); // Učitavamo zvuk u memoriju
successAudio.volume = 0.3;

const rightAudio = new Audio("./audio/rightanswer.mp3"); // proveri da li je dobra putanja i ekstenzija (.mp3)
rightAudio.volume = 0.3;

const wrongAudio = new Audio("./audio/wronganswer.mp3");
wrongAudio.volume = 0.3;


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


const startScreenEl = document.getElementById("start-screen");
const startBtnEl = document.getElementById("start-btn");
const mainQuizContainerEl = document.getElementById("main-quiz-container");


const quitBtnEl = document.getElementById("quit-btn");
const endScreenEl = document.getElementById("end-screen");
const restartFromEndBtnEl = document.getElementById("restart-from-end-btn");


const endTitleEl = document.getElementById("end-title");
const bonusCongratsMessageEl = document.getElementById("bonus-congrats-message");



// FUNCTIONS ========================

//display question and answers
//--------------------------

function displayQuestion() {
    const currQuestionObj = quizData[selectedCategory][questionIdx];
    questionTextEl.textContent = currQuestionObj.question; // ovdje upisujem pitanje
    
    //Vraćamo izgled kutije u normalu kada se učita novo pitanje
    const questionBoxEl = document.getElementById("question-box");
    questionBoxEl.classList.remove("category-over");

    resetBtnEl.classList.remove("hidden");
    quitBtnEl.classList.remove("hidden");

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

    // Ako je igrač prešao sve 3 kategorije u prošloj partiji, radimo automatski reset za novu
    if (completedCategories.length === 3) {
        liveScore = 0;
        cat_1_Score = 0;
        cat_2_Score = 0;
        cat_3_Score = 0;
        totalScore = 0;
        completedCategories = []; 
        updateScores();
    }
    
       if (completedCategories.includes(selectedCategory)) {
        questionTextEl.textContent = "❌ You finished this one. Choose another!";
        allAnswersArr.forEach(btn => btn.textContent = "-");
        
        // 🟢 NOVO: Pokretanje efekta podrhtavanja cele kutije kviza
        mainQuizContainerEl.classList.add("shake-animation");
        
        // 🟢 NOVO: Pusti zvuk greške koji već imaš u memoriji!
        wrongAudio.currentTime = 0;
        wrongAudio.play().catch(err => console.log("Audio play blocked:", err));

        // Skidamo klasu nakon 400ms (kada se animacija završi) da bi mogla opet da se pokrene
        setTimeout(function() {
            mainQuizContainerEl.classList.remove("shake-animation");
        }, 400);

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
        liveScore += 1;

        //Pusti zvuk za TAČAN odgovor
        rightAudio.currentTime = 0; 
        rightAudio.play().catch(err => console.log("Audio play blocked:", err));
        
    } else {
        btn.classList.add("wrong");
        allAnswersArr[correctIdx].classList.add("correct");

        // Pusti zvuk za NETAČAN odgovor
        wrongAudio.currentTime = 0;
        wrongAudio.play().catch(err => console.log("Audio play blocked:", err));
    
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
        if (selectedCategory === "geography") cat_1_Score = liveScore;
        if (selectedCategory === "history") cat_2_Score = liveScore;
        if (selectedCategory === "science") cat_3_Score = liveScore;
        
        if (!completedCategories.includes(selectedCategory)) {
            completedCategories.push(selectedCategory);
        }

        liveScore = 0;
        questionIdx = 0;
        updateScores();

        //Stroga provera za završetak sve 3 kategorije
        if (completedCategories.length === 3) {
            mainQuizContainerEl.classList.add("hidden");
            endScreenEl.classList.remove("hidden");
            resetBtnEl.classList.add("hidden"); 
            quitBtnEl.classList.add("hidden");

            endTitleEl.textContent = "CONGRATULATIONS! 🎉🏆";
            
            const finalThanksMessageEl = document.getElementById("final-thanks-message");
            finalThanksMessageEl.textContent = `You have successfully completed the entire quiz! Total score: ${totalScore} points.`;

            // Računamo maksimalan broj poena (5 po kategoriji x 3 kategorije = 15)
            let maxPossibleScore = quizData.geography.length + quizData.history.length + quizData.science.length;

            if (totalScore === maxPossibleScore) {
                bonusCongratsMessageEl.textContent = "🥇 ČESTITAMO! Osvojili ste maksimalan broj poena!";
            } else {
                bonusCongratsMessageEl.textContent = "";
            }

            categorySelectEl.value = "";
        } 
        else {
            // ŽUTA PORUKA I ZVUK ZA KRAJ NIVOA
            questionTextEl.textContent = "✨ This set of questions is over! Choose another category! ✨";
            allAnswersArr.forEach(btn => btn.textContent = "-");
            
            const questionBoxEl = document.getElementById("question-box");
            questionBoxEl.classList.add("category-over");
            
            successAudio.play().catch(err => console.log("Audio play blocked by browser:", err));
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
    
    resetBtnEl.classList.add("hidden");
    quitBtnEl.classList.add("hidden");
    
    allAnswersArr.forEach(btn => {
        btn.textContent = "-";
        btn.classList.remove("correct", "wrong", "disabled-click");
    });
}

function quitGame() {
    if (selectedCategory) {
        if (selectedCategory === "geography") cat_1_Score = liveScore;
        if (selectedCategory === "history") cat_2_Score = liveScore;
        if (selectedCategory === "science") cat_3_Score = liveScore;
    }

    liveScore = 0;
    updateScores(); 

    endTitleEl.textContent = "Thanks for playing! 🛑";
    const finalThanksMessageEl = document.getElementById("final-thanks-message");
    finalThanksMessageEl.textContent = "You have left the quiz.";
    bonusCongratsMessageEl.textContent = ""; 

    mainQuizContainerEl.classList.add("hidden");
    endScreenEl.classList.remove("hidden");
}

function restartAfterQuit() {
    endScreenEl.classList.add("hidden");        
    resetFullQuiz();                           
    mainQuizContainerEl.classList.remove("hidden"); 
}


// EVENT LISTENERS ==========================

categorySelectEl.addEventListener("change", checkCategory);

allAnswersArr.forEach((btn, index) => {
    btn.addEventListener("click", checkAnswer);
});

startBtnEl.addEventListener("click", function() {
    startScreenEl.classList.add("hidden");
    mainQuizContainerEl.classList.remove("hidden");
});

quitBtnEl.addEventListener("click", quitGame);
restartFromEndBtnEl.addEventListener("click", restartAfterQuit);
resetBtnEl.addEventListener("click", resetFullQuiz);
