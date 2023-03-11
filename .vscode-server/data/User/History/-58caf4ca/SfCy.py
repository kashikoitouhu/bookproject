from django.db import models
from .consts import MAX_RATE

RATE_CHOICES = [(x, str(x)) for x in range(0, MAX_RATE + 1)]

# Create your models here.
# class SampleModel(models.Model):
#     title = models.CharField(max_length=160)
#     number = models.IntegerField()

CATEGORY = (('business','ビジネス'),('life','生活'),('other','その他'))

class Book(models.Model):
    title = models.CharField(max_length=100)
    text = models.TextField()
    thumbnail = models.ImageField()
    category = models.CharField(max_length=100,choices = CATEGORY)
    
    def __str__(self):
        return self.title
    
    # class Meta:
    #     verbose_name = '本のデータ'
    
class Review(models.Model):
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    text = models.TextField(default='')
    rate = models.IntegerField(choices=RATE_CHOICES)
    user = models.ForeignKey('auth.User', on_delete=models.CASCADE)

    def __str__(self):
        return self.title