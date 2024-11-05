from django.db import models
from django.core.exceptions import ValidationError
from django.core.validators import EmailValidator

# Create your models here.
class Usuario(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=45, null=False)
    apellido = models.CharField(max_length=50, default='S/A')
    edad = models.IntegerField()

    def __str__(self) -> str:
        return self.nombre

class alumno(models.Model):
    nombre = models.CharField(max_length=100)
    apellido = models.CharField(max_length=100)
    edad = models.IntegerField()
    correo = models.EmailField(unique=True)
    password = models.CharField(max_length=100)
    password2 = models.CharField(max_length=100)
    asistencia = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.nombre} {self.apellido}"

class materias(models.Model):
    nombre = models.CharField(max_length=50, null=False)
    duracion_en_min = models.IntegerField()
    correo_profe = models.CharField(max_length=50, null=False)
    totalClases = models.IntegerField(default=0)

    def __str__(self) -> str:
        return self.nombre

class Asistencia(models.Model):
    alumno = models.ForeignKey(alumno, related_name='asistencias', on_delete=models.CASCADE)
    nombre = models.ForeignKey(materias, related_name='asistencias', on_delete=models.CASCADE)
    fecha = models.DateField(auto_now_add=True)
    presente = models.BooleanField(default=False)

    def __str__(self):
        return f"Asistencia de {self.alumno} en {self.nombre} el {self.fecha}"


class profesor(models.Model):  # Cambié el nombre a singular
    apellido = models.CharField(max_length=50, null=False, default='S/A')  # Se cambió 'null' a 'null=False'
    correo = models.CharField(max_length=30, null=False, validators=[EmailValidator(message="Ingrese un correo válido.")])
    curso = models.CharField(max_length=50, null=False)
    edad = models.IntegerField()
    nombre = models.CharField(max_length=50, null=False)
    password = models.CharField(max_length=20, null=False)
    password2 = models.CharField(max_length=20, null=False)

    def __str__(self) -> str:
        return f"{self.nombre} {self.apellido}"

    def clean(self):
        super().clean()
        if self.password != self.password2:
            raise ValidationError("Las contraseñas no coinciden.")
