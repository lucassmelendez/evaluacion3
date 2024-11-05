# API/signals.py
from django.db.models.signals import post_delete
from django.dispatch import receiver
from django.contrib.auth.models import User
from .models import alumno, profesor, materias  # Asegúrate de que estos modelos existan

@receiver(post_delete, sender=User)
def delete_related_records(sender, instance, **kwargs):
    # Suponiendo que tienes un modelo Alumno relacionado con User
    alumno.objects.filter(user=instance).delete()
    profesor.objects.filter(user=instance).delete()
    materias.objects.filter(user=instance).delete()