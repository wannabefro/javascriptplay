function getCode(){
  var code = editor.getValue();
  var question = $('.question').attr('data-question');
  checkAnswer(code, question);
};

function checkAnswer(code, question){
  testInput = getQuestionInput(question);
  testOutput = getQuestionOutput(question);
  try {
    eval(code);
  } catch(error) {
    $('#result').html('<h1>Sorry something went wrong</h1><p>Error: ' + error.message + '</p>');
    return false;
  }
  var results = testInput.map(function(input){
    var result = testOutput[testInput.indexOf(input)];
    if (result == average(input)){
      return true;
    } else {
      return false;
    }
  });
  checkResults(results);
}

function checkResults(results){
  if (_.every(results, function(r){return r === true}) == true){
    $('#result').html('<h1>Good job. You got it right</h1>');
  }else{
    $('#result').html('<h1>Sorry. Try again</h1>');
  }
}

function getQuestionInput(question){
  return [[1,2,3], [1,1,1],[1.5,2.5,5]];
}

function getQuestionOutput(question){
  return [2,1,3];
}
