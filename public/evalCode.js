var failingTests = [];
function getCode(){
  var code = editor.getValue();
  var question = $('.question').attr('data-question');
  checkAnswer(code, question);
};

function checkAnswer(code, question){
  question = findQuestion();
  testInput = question.testInput;
  testOutput = question.testOutput;
  try {
    eval(code);
  } catch(error) {
    $('#result').html('<h1>Sorry something went wrong</h1><p>Error: ' + error.message + '</p>');
    return false;
  }
  var questionFunction = question.method;
  var isDefined = eval('(typeof ' + questionFunction + '==\'function\');');
  if (!isDefined){
    $('#result').html("<h1>You didn't define a " + questionFunction + " function.");
    return false;
  }
  var results = testInput.map(function(input){
    var expectedResult = testOutput[testInput.indexOf(input)];
    if (input instanceof Array){
      input = '['+input+']';
    }
    var result = eval(questionFunction + '('+input+')');
    if (expectedResult == result){
      return true;
    } else {
      failingTests.push([input, expectedResult, result]);
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
    $('#result').append('<p>'+ failingTests.length + ' failing tests:</p><ul>');
    failingTests.forEach(function(f){
      return $('#result').append('<li>'+f[0]+' inputed. Expected ' + f[1] + ' as the result. Got ' + f[2] + '</li>');
    });
    $('#result').append('</ul>');
  }
    failingTests = [];
}
