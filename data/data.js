const quizData = {
  geography: [
    {
      question: "What is the capital of Montenegro?",
      answers: ["Podgorica", "Niksić", "Cetinje", "Bar"],
      correctIndex: 0,
    },
    {
      question: "What is the longest river in the world?",
      answers: ["Mississippi", "Nile", "Amazonas", "Danube"],
      correctIndex: 2,
    },
    // 🟢 NOVA PITANJA ZA GEOGRAFIJU:
    {
      question: "Which country has the largest population in the world?",
      answers: ["USA", "Russia", "India", "China"],
      correctIndex: 2, // India (pretekla Kinu po zvaničnim podacima)
    },
    {
      question: "What is the smallest ocean in the world?",
      answers: ["Indian Ocean", "Pacific Ocean", "Arctic Ocean", "Atlantic Ocean"],
      correctIndex: 2, // Arctic Ocean
    },
    {
      question: "Which continent is the Sahara Desert located in?",
      answers: ["Asia", "Africa", "Australia", "South America"],
      correctIndex: 1, // Africa
    }
  ],

  history: [
    {
      question: "Who was the first Roman emperor?",
      answers: ["Julius Caesar", "Augustus (Octavian)", "Nero", "Marcus Aurelius"],
      correctIndex: 1,
    },
    {
      question: "In what year did the First World War begin?",
      answers: ["1912.", "1914.", "1918.", "1939."],
      correctIndex: 1,
    },
    // 🟢 NOVA PITANJA ZA ISTORIJU:
    {
      question: "Who discovered America in 1492?",
      answers: ["Vasco da Gama", "Ferdinand Magellan", "Christopher Columbus", "Marco Polo"],
      correctIndex: 2, // Christopher Columbus
    },
    {
      question: "Which ancient civilization built the Machu Picchu complex?",
      answers: ["Aztecs", "Incans", "Mayans", "Egyptians"],
      correctIndex: 1, // Incans
    },
    {
      question: "In which city was the Titanic built?",
      answers: ["Belfast", "London", "New York", "Southampton"],
      correctIndex: 0, // Belfast
    }
  ],

  science: [
    {
      question: "What is the chemical symbol for gold?",
      answers: ["Ag", "Fe", "Au", "Hg"],
      correctIndex: 2,
    },
    {
      question: "What is the closest star to us?",
      answers: ["Alpha Centauri", "Sirius", "Sun", "North Star"],
      correctIndex: 2,
    },
    // 🟢 NOVA PITANJA ZA NAUKU:
    {
      question: "What is the hardest natural substance on Earth?",
      answers: ["Gold", "Iron", "Diamond", "Quartz"],
      correctIndex: 2, // Diamond
    },
    {
      question: "Which gas do plants absorb from the atmosphere for photosynthesis?",
      answers: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
      correctIndex: 1, // Carbon Dioxide
    },
    {
      question: "How many teeth does an adult human typically have?",
      answers: ["28", "30", "32", "34"],
      correctIndex: 2, // 32
    }
  ]
};
