import random
from django.shortcuts import render, HttpResponse
from django.http import JsonResponse
import json
from django.core.mail import send_mail
from django.conf import settings
from .models import Question

def home(request):
    return render(request, 'quiz.html')

def quiz(request):
    questions = Question.objects.all()

    question_count = 1
    if request.method == 'POST':
        if 'lang_select_form' in request.POST:
            topic = request.POST
            questions = Question.objects.filter(topic=topic)
            # Filter questions with matching topic
            questions = random.sample(list(questions), 10)
            ques = len(questions)
            return HttpResponse(json.dumps({'questions': questions, 'ques': ques}), content_type='application/json')
        elif 'quiz_submit_form' in request.POST:
            user_answers = request.POST
            correct_answers = 0
            ques = 10
            for question_id, answer_index in user_answers.items():
                if question_id == "csrfmiddlewaretoken":
                    continue
                question_id = int(question_id)
                question = Question.objects.get(id=question_id)
                correct_index = question.correct_answer_index
                if int(answer_index) == int(correct_index):
                    correct_answers += 1
                percentage = int((correct_answers/ques) * 100)
            return render(request, 'quiz.html', {'correct_answers': correct_answers, 'percentage': percentage, 'ques': ques})
    else:        
        return render(request, 'quiz.html')




def send_results_email(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        message = "Thanks for taking the quiz. Here are the correct answers:"
        for question in Question.objects.all():
            options = [question.option1, question.option2, question.option3, question.option4]
            message += "\n" + question.question_text
            message += "\nAnswer: " + options[question.correct_answer_index]
        send_mail(
            'Quiz Results',
            message,
            settings.EMAIL_HOST_USER,
            [email],
            fail_silently=False,
        )
        return render(request, 'email_sent.html')
