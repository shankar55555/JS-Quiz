const quizData = [
    {
      question: 'Javascript is an _______ language',
      options: ['Object-Oriented', 'Object-Based', 'Assembly-language', 'High-level'],
      answer: 'bject-Based',
    },
    {
      question: 'Which one of the following also known as Conditional Expression:?',
      options: ['Alternative to if-else', 'SaturnSwitch statement', 'If-then-else statement', 'immediate if'],
      answer: 'immediate if',
    },
    {
      question: ' In JavaScript, what is a block of statement?',
      options: ['Conditional block', 'block that combines a number of statements into a single compound statement', 'both conditional block and a single statement', 'block that contains a single statement'],
      answer: 'block that combines a number of statements into a single compound statement',
    },
    {
      question: 'When interpreter encounters an empty statements, what it will do:',
      options: ['Shows a warning', 'Prompts to complete the statement', 'Throws an error', 'Ignores the statements'],
      answer: 'Ignores the statements',
    },
    {
      question: ' The "function" and " var" are known as:',
      options: [
        'Keywords',
        'Data types',
        'Declaration statements',
        'Prototypes',
      ],
      answer: 'Declaration statements',
    },
    {
      question: 'Which one of the following is the correct way for calling the JavaScript code?',
      options: ['Preprocessor', 'Triggering Event', 'RMI', 'Function/Method'],
      answer: 'Function/Method',
    },
    {
      question: 'Which of the following type of a variable is volatile?',
      options: [
        'Mutable variable',
        'Dynamic variable',
        'Volatile variable',
        'Immutable variable',
      ],
      answer: 'Mutable variable',
    },
    {
      question: 'Which of the following option is used as hexadecimal literal beginning?',
      options: ['00', '0x', '0X', 'Both 0x and 0X'],
      answer: 'Both 0x and 0X',
    },
    {
      question: 'In the JavaScript, which one of the following is not considered as an error:',
      options: [
        'Syntax error',
        'Missing of semicolons',
        'Division by zero',
        'Missing of Bracket',
      ],
      answer: 'Division by zero',
    },
  ];
  
  const quizContainer = document.getElementById('quiz');
  const resultContainer = document.getElementById('result');
  const submitButton = document.getElementById('submit');
  const retryButton = document.getElementById('retry');
  const showAnswerButton = document.getElementById('showAnswer');
  
  let currentQuestion = 0;
  let score = 0;
  let incorrectAnswers = [];
  
  
  function displayQuestion() {
    const questionData = quizData[currentQuestion];
  
    const questions = document.createElement('div');
    questions.className = 'question';
    questions.innerHTML = questionData.question;
  
    const optionsElement = document.createElement('div');
    optionsElement.className = 'options';
  
    const shuffledOptions = [...questionData.options];
  
    for (let i = 0; i < shuffledOptions.length; i++) {
      const option = document.createElement('label');
      option.className = 'option';
  
      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'quiz';
      radio.value = shuffledOptions[i];
  
      const optionText = document.createTextNode(shuffledOptions[i]);
  
      option.appendChild(radio);
      option.appendChild(optionText);
      optionsElement.appendChild(option);
    }
  
    quizContainer.innerHTML = '';
    quizContainer.appendChild(questions);
    quizContainer.appendChild(optionsElement);
  }
  
  function checkAnswer() {
    const selectedOption = document.querySelector('input[name="quiz"]:checked');
    if (selectedOption) {
      const answer = selectedOption.value;
      if (answer === quizData[currentQuestion].answer) {
        score++;
      } else {
        incorrectAnswers.push({
          question: quizData[currentQuestion].question,
          incorrectAnswer: answer,
          correctAnswer: quizData[currentQuestion].answer,
        });
      }
      currentQuestion++;
      selectedOption.checked = false;
      if (currentQuestion < quizData.length) {
        displayQuestion();
      } else {
        displayResult();
      }
    }
  }
  
  function displayResult() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'inline-block';
    resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
  }
  
  function retryQuiz() {
    currentQuestion = 0;
    score = 0;
    incorrectAnswers = [];
    quizContainer.style.display = 'block';
    submitButton.style.display = 'inline-block';
    retryButton.style.display = 'none';
    showAnswerButton.style.display = 'none';
    resultContainer.innerHTML = '';
    displayQuestion();
  }
  
  function showAnswer() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'none';
  
    let incorrectAnswersHtml = '';
    for (let i = 0; i < incorrectAnswers.length; i++) {
      incorrectAnswersHtml += `
        <p>
          <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
          <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
          <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
        </p>
      `;
    }
  
    resultContainer.innerHTML = `
      <p>You scored ${score} out of ${quizData.length}!</p>
      <p>Incorrect Answers:</p>
      ${incorrectAnswersHtml}
    `;
  }
  
  submitButton.addEventListener('click', checkAnswer);
  retryButton.addEventListener('click', retryQuiz);
  showAnswerButton.addEventListener('click', showAnswer);
  
  displayQuestion();