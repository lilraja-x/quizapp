document.querySelector('.choose-lang').addEventListener('click', function() {
    document.querySelector('.quiz').scrollIntoView({ behavior: 'smooth' });
});

$('#form').submit(function(event) {
    event.preventDefault();
    var csrf_token = $("[name=csrfmiddlewaretoken]").val();
    var topic = $('#language').val();
    $.ajax({
        url: '/quiz/',
        type: 'POST',
        data: {
            csrfmiddlewaretoken: csrf_token,
            topic: topic
        },
        success: function(data) {
            $('.question-wrap').html(data.html);
        }
    });
});

document.addEventListener("DOMContentLoaded", function() {
    let currentQuestion = 0;
    let timeLeft = 15;
    let timerInterval;
    let quizCompleted = false;
    const questions = document.querySelectorAll(".question-wrap");
    const submitButton = document.getElementById("submit-quiz");
    const progressBar = document.querySelector(".quiz-progress .indicator");
    const questionCount = document.getElementById("question-count");
    const timer = document.getElementById("time");
    function startTimer() {
        timerInterval = setInterval(function(){
            timeLeft--;
            timer.innerHTML = `Time Left : ${timeLeft}s`;
            if(timeLeft === 0) {
                clearInterval(timerInterval);
                if (currentQuestion === questions.length - 1) {
                    quizCompleted = true;
                    const quizForm = document.getElementById("quiz-form");
                    quizForm.submit();
                } else {
                    if (questions[currentQuestion]) {
                        questions[currentQuestion].style.display = "none";
                    }
                    
                    currentQuestion++;
                    if (questions[currentQuestion]) {
                    questions[currentQuestion].style.display = "block";
                }
                
                    timeLeft = 15;
                    startTimer();
                }
                questionCount.innerHTML =  ` ${currentQuestion} / ${questions.length}  `;
                const progress = (currentQuestion + 1) / questions.length * 100;
                progressBar.style.width = `${progress}%`;
            }
        },1000);
        }
        if (submitButton) {
        submitButton.value = "Submit quiz";
        submitButton.addEventListener("click", function() {
            if(quizCompleted) {
                clearInterval(timerInterval);
            }
        });
        }
      
        document.querySelectorAll(".submit-answer").forEach(function(input) {
        input.addEventListener("click", function(e) {
            e.preventDefault();
            clearInterval(timerInterval);
            if (currentQuestion === questions.length - 1) {
            quizCompleted = true;
            const quizForm = document.getElementById("quiz-form");
            quizForm.submit();
            } else {
            if (questions[currentQuestion]) {
                questions[currentQuestion].style.display = "none";
                }
            }
            currentQuestion++;
            if (questions[currentQuestion]) {
            questions[currentQuestion].style.display = "block";
        }
            //Update question Count
            questionCount.innerHTML =  ` ${currentQuestion} / ${questions.length}  `;
            // Update progress bar
            const progress = (currentQuestion + 1) / questions.length * 100;
            progressBar.style.width = `${progress}%`;
            timeLeft = 15;
            startTimer();
        });
        });
        startTimer();
        //to calculate performance
        var percentage = document.getElementById('quiz-percentage').innerHTML;
        percentage = percentage.split('%')[0];
        if (percentage < 50) {
        document.getElementById('quiz-performance').innerHTML = "Your performance was Poor";
        document.getElementById('quiz-performance').style.color = "red";
        } else if (percentage >= 50 && percentage < 75) {
        document.getElementById('quiz-performance').innerHTML = "Your performance was Fair";
        document.getElementById('quiz-performance').style.color = "blue";
        } else {
        document.getElementById('quiz-performance').innerHTML = "Your performance was Good";
        document.getElementById('quiz-performance').style.color = "green";
        }

});


