var currentQuestion;

function getQuestion(options){
  var question;
  fileName = (options.fileName != null) ? options.fileName : 'questions.json';
  questionType = (options.type != null) ? options.type : null;
  $.getJSON(fileName, function(data){
    if (options.choice || questionType){
      var searchResults = jQuery.grep(data.questions, function(q){
        if (options.choice){
          return (q.id === options.choice);
        } else if (questionType){
          return (q.type = questionType);
        }
      });
      question = _.sample(searchResults);
    } else {
      question = _.sample(data.questions);
    }
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
