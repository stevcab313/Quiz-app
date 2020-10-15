/**
 * Example store structure
 */
const store = {
  // 5 or more questions are required
  questions: [
    {
      question: 'What color is broccoli?',
      answers: [
        'red',
        'orange',
        'pink',
        'green'
      ],
      correctAnswer: 'green'
    },
    
    {
      question: 'What is the current year?',
      answers: [
        '1970',
        '2015',
        '2020',
        '2005'
      ],
      correctAnswer: '2020'
    },
    
    {
      question: 'What does HTML stand for?',
      answers: [
        'Hyper Text Markup Language',
        'Home Tool Markup Language',
        'Hyperlinks and Text Markup Languages',
        'Hypo Text Markup Language'
      ],
      correctAnswer: 'Hyper Text Markup Language'
    },
    {
      question: 'Who won the US Presidential Election in 2016?',
      answers: [
        'Bernie Sanders',
        'Hillary Clinton',
        'Donald Trump',
        'Ted Cruz'
      ],
      correctAnswer: 'Donald Trump'
    },
    {
      question: 'What virus caused the 2020 Pandemic?',
      answers: [
        'H1N1',
        'Cold Flu',
        'Coronavirus',
        'Bird Flu'
      ],
      correctAnswer: 'Coronavirus'
    },
    {
      question: "Who is Joe Biden's Vice President nominee in the 2020 election?",
      answers: [
        'Donald Trump',
        'Hillary Clinton',
        'Barack Obama',
        'Kamala Harris'
      ],
      correctAnswer: 'Kamala Harris'
    },
    {
      question: 'What language is the most spoken worldwide?',
      answers: [
        'Arabic',
        'English',
        'Chinese',
        'Spanish'
      ],
      correctAnswer: 'Chinese'
    },
    {
      question: 'In which decade does the Netflix series Stranger Things take place?',
      answers: [
        "70's",
        "80's",
        "90's",
        "00's"
      ],
      correctAnswer: "80's"
    },
    {
      question: 'Who was the only President to resign?',
      answers: [
        'Donald Trump',
        'Barack Obama',
        'Richard Nixon',
        'Ronald Reagan'
      ],
      correctAnswer: 'Richard Nixon'
    },
    {
      question: 'How many bones are in the human body?',
      answers: [
        '201',
        '206',
        '198',
        '256'
      ],
      correctAnswer: '206'
    },
  ],
  quizStarted: false,
  questionNumber: 0,
  score: 0
};

/**
 * 
 * Technical requirements:
 * 
 * Your app should include a render() function, that regenerates the view each time the store is updated. 
 * See your course material and access support for more details.
 *
 * NO additional HTML elements should be added to the index.html file.
 *
 * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
 *
 * SEE BELOW FOR THE CATEGORIES OF THE TYPES OF FUNCTIONS YOU WILL BE CREATING 👇
 * 
 */

/********** TEMPLATE GENERATION FUNCTIONS **********/
// These functions return HTML templates
function generateIntro(){
  const introHtml = `
    <div class="welcome-pg">
      <div class="container">
        <h2 class="welcome-quiz">Welcome To My Quiz</h2>
        <button id="startBtn" class="start-btn">Start</button>
      </div>
    </div>
  `;
  return introHtml;
}

function generateQuestion(){
  let currentQuestionIndex = store.questionNumber;
  
  const question = store.questions[currentQuestionIndex];
  const questionHtml = `
    <div class="question-pg">
      <div class="container">
        <h3 class="score">SCORE ${store.score}/${store.questions.length}</h3>
        <h2>Question ${store.questionNumber +1}</h2>
        <h2 class="question-container">${question.question}</h2>
          <form id="answerForm">
              <input type="radio" name="answer" id="choice-a">
              <label for="choice-a">${question.answers[0]}</label>
              <br/>
              <input type="radio" name="answer" id="choice-b">
              <label for="choice-b"}">${question.answers[1]}</label>
              <br/>
              <input type="radio" name="answer" id="choice-c">
              <label for="choice-c">${question.answers[2]}</label>
              <br/>
              <input type="radio" name="answer" id="choice-d">
              <label for="choice-d">${question.answers[3]}</label>
              <br/>
            </form>
            <button id="submitBtn" class="submit-btn">Submit</button>
            <button id="nextBtn" class="next-btn hide">Next</button>
      </div>
    </div>
    `
    const targRadio = $('input[type="radio"]:checked');
    const otherRadio = $('input[type="radio"]:checked')     
  return questionHtml;
}

function generateResults(){
  let score = store.score;
  let resultsHtml = `
    <div class="results-pg">
      <div class="container">
        <h2 class="results-quiz">Quiz Done!</h2>
        <h3 class="score">Your Score was ${score}/${store.questions.length}</h3>
        <button id="restartBtn" class="restart-btn">Restart Quiz</button>
      </div>
    </div>`
  ;
  return resultsHtml;
}

/**
 * Check if the supplied selection is correct or not and handle
 * 
 * Param1 label - Jquery Element - containing the label next to the radio input the user selected
 */
function checkAnswer(label){
  let currentQuestionIndex = store.questionNumber
  let currentQuestion = store.questions[currentQuestionIndex];
  if (label.text() === currentQuestion.correctAnswer){
  //show the user got he or she got it right
    label.addClass('correct');
  //add 1 to the score if the user got it right
    store.score++;
  } else{
    label.addClass('wrong');
    $('label').each((index, element) => {
      if ($(element).text() === currentQuestion.correctAnswer) {
        $(element).addClass('correct');
        return;
      }
    });
  }
}


/********** RENDER FUNCTION(S) **********/
// This function conditionally replaces the contents of the <main> tag based on the state of the store
function renderStartPage(){
  const setHtml = generateIntro();
  $('main').html(setHtml);
}

function renderQuestion(){
  const setHtml = generateQuestion();
  $("main").html(setHtml);
}

function renderResults(){
 const setResult = generateResults();
 $("main").html(setResult);
}

/********** EVENT HANDLER FUNCTIONS **********/
function handleStartButton(){
  //listen to start button clicked and render questions
  $('main').on('click', '#startBtn',function(event){
    renderQuestion();

  })
}

function handleSubmitAnswer(){
  //listen to Next button clicked
  $('main').on('click','#submitBtn',function(event){
    let answerChoice= $('input[type="radio"]:checked').attr('id');
    
    if (!answerChoice) {
      alert('Please select an answer!');
      return;
    }
  
    const label = $(`label[for='${answerChoice}']`);
    
    checkAnswer($(label));
    $('#nextBtn').removeClass('hide');
    //add to score 

  })
}

function handleNextBtn(){
  $('main').on('click','#nextBtn',function(event){
    //render the next question
    const lastQuestion = store.questions.length;
    store.questionNumber++;
    if (store.questionNumber >= lastQuestion){
      renderResults();
    } else {
      renderQuestion()
    }
  })
}

function handleRestartBtn(){
  $('main').on('click','#restartBtn',function(event){
    store.score = 0;
    store.questionNumber = 0;
    renderStartPage();
  })
}



// These functions handle events (submit, click, etc)
$(function(){
  renderStartPage();
  handleStartButton();
  handleSubmitAnswer();
  handleNextBtn();
  handleRestartBtn();
  
})