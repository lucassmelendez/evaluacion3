from django.contrib import admin
from .models import *

# Register your models here.
admin.site.register(Usuario)
admin.site.register(alumno)
admin.site.register(profesor)
admin.site.register(materias)
admin.site.register(Asistencia)

