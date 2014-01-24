var currentQuestion;

function getQuestion(){
  $.getJSON('questions.json', function(data){
    var question = _.sample(data.questions);
    addQuestion(question);
  });
}

function addQuestion(question){
  currentQuestion = question;
  $('.question').html('<p data-question='+question.id+'>'+ question.body + '</p>');
}

function findQuestion(){
  return currentQuestion;
}
