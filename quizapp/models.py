from django.db import models

class Question(models.Model):
    question_text = models.CharField(max_length=200)
    option1 = models.CharField(max_length=200)
    option2 = models.CharField(max_length=200)
    option3 = models.CharField(max_length=200)
    option4 = models.CharField(max_length=200)
    correct_answer_index = models.IntegerField()
    topic = models.CharField(max_length=50, default="")

    def __str__(self):
        return self.question_text
