$(document).ready(function () {
    $(".reset").click(function() {
    location.reload(true);
});
    $(".start").click(trivia);

    function trivia() {
        var scoreAry = [];
        var questions = [{
            q: "What were the first names of the famous explorers Lewis and Clark?",
            s: ["Clark and Lewis","John and Lincoln", "Benjamin and Samuel", "Meriwether and William"],
            a: "Meriwether and William",
            correct: 0
        }, {
            q: "At the time of the Declaration of Independence what was the approximate population of the United States?",
            s: ["20,000", "200,000", "2,000,000", "20,000,000"],
            a: "2,000,000",
            correct: 0
        }, {
            q: "John Brown of Civil War fame was which?",
            s: ["an abolitionist", "a slave", "a slave-owner", "none of the above"],
            a: "an abolitionist",
            correct: 0
        }, {
            q: "Where was the UN headquarter located prior to them moving to Manhattan's East Side?",
            s: ["San Francisco, Califorina", "Long Island, New York", "Geneva,Switzerland", "Paris, France"],
            a: "Long Island, New York",
            correct: 0
        }, {
            q: "When did the Statue of Liberty celebrated its 100th anniversary?",
            s: ["1976", "1986", "1966", "1956"],
            a: "1986",
            correct: 0
        }, {
            q: "The Constitution protects citizens against 'unreasonable searches and seizures' with which amendment?",
            s: ["The First", "The Fourth", "The Ninth", "The Fourteenth"],
            a: "Libra",
            correct: 0
        }, {
            q: "In the House of Representatives which state has more than one seat?",
            s: ["Alaska", "Hawaii","Vermont", "Wynoming"],
            a: "Hawaii",
            correct: 0
        }, {
            q: "This president was the only U.S. president to actively lead troops while in office. What was his name?",
            s: ["George Washington", "Thomas Jefferson", "James Madison", "Andrew Jackson"],
            a: "James Madison",
            correct: 0
        }, {
            q: "What happened on December 7, 1941?",
            s: ["World War II ended", "Treaty of Versailles", "Pearl Harbor"],
            a: "Nepal",
            correct: 0
        }, {
            q: "Who wrote most of the Declaration of Independence?",
            s: ["Thomas Edison", "George Washington", "Andrew Jackson"],
            a: "Thomas Jefferson",
            correct: 0
        }];

        var counter = questions.length;

        //This grabs the question and answer data from the questions array and appends it to the #questions div:
        function createQuestion(questions) {
            for (var i = 0; i < questions.length; i++) {
                $(".start").hide();
                $("#questions").append('<form id="' + i + '" class="center-text"><p>Question ' + (i + 1) + ' of ' + questions.length + '</p><h3 class="question">' + questions[i].q + '</h3>' + radioButtons(questions[i].s, i) + '<button type="submit" class="next">NEXT &#8594;</button></p></form>');
            }
            //This hides all except the first question:
            for (var k = questions.length - 1; k > 0; k--) {
                $('#' + k).hide();
            }
        }
        //This grabs the answer choices from the questions array and returns them to createQuestion():
        function radioButtons(ary, qNum) {
            var answers = [];
            for (i = 0; i < ary.length; i++) {
                answers.push('<label><input type="radio" name="' + qNum + '" value="' + ary[i] + '">' + ary[i] + '</label>');
            }
            return answers.join(" ");
        }
        
        //This sums the correct values in the questions array:
        function sumScore(questions) {
            return scoreAry.reduce(function (previousValue, currentValue, index, array) {
                return previousValue + currentValue;
            });
        }
        
        //This checks the user's answer and updates the score:
        function checkAnswer(answer, qNum, questions) {
            if (answer == questions[qNum].a) {
                questions[qNum].correct = 1;
                scoreAry.push(questions[qNum].correct);
            } else {
                scoreAry.push(questions[qNum].correct);
            }
        }
        
        createQuestion(questions);
        
        $(".next").click(function (event) {
            event.preventDefault(); //This stops the form from submitting
            var qNum = $(this).closest("form").attr("id"); //This gives us the question number
            var userInput = $('input[name=' + qNum + ']:radio:checked').val(); //This grabs the user's selected answer
            if (counter > 1) {
                checkAnswer(userInput, qNum, questions);
                $("#" + qNum).hide();
                $("#" + qNum).next().show();
                counter--;
            } else if (counter == 1) {
                checkAnswer(userInput, qNum, questions);
                $("#questions").find("form").remove();
                $("#questions").append('<h3 class="result"></h3>');
                $(".result").text('You answered ' + sumScore(questions) + ' questions correctly out of 10.');
                   for (j = 0; j < scoreAry.length; j++) {
                        if (scoreAry[j] === 0) {
                            console.log(questions[j].q, questions[j].a);
                            $("#questions").append('<p class="missed-' + j + '">You missed: ' + questions[j].q + ' ' + questions[j].a + '</p>');      
                        }
                    }
            } else {
                return false;
            }
        });
    }
});