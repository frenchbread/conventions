from django.db import models
from django.db.models.signals import post_save
from django.contrib.auth.models import User
# Create your models here.

class Drinker(models.Model):
    user = models.OneToOneField(User)
    name = models.CharField(max_length=100)
    birthday = models.DateField()
    bio = models.TextField(max_length=140)
    website = models.CharField(max_length=100)
    location = models.CharField(max_length=200)


    def __unicode__(self):
        return self.name


def create_drinker_user_callback(sender, instance, **kwargs):
    drinker, new = Drinker.objects.get_or_create(user=instance)
    post_save.connect(create_drinker_user_callback, User)