from django.shortcuts import render
from rest_framework import generics
from .models import *
from .serializers import *
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from django.http import HttpResponse
from reportlab.pdfgen import canvas
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
import json
from .models import Asistencia, alumno as alumnoMode, materias
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle

# Create your views here.
class UsuarioViewSet(generics.ListCreateAPIView):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer

class AlumnoViewSet(generics.ListCreateAPIView):
    queryset = alumno.objects.all()
    serializer_class = AlumnoSerializer

class MateriasViewSet(generics.ListCreateAPIView):
    queryset = materias.objects.all()
    serializer_class = MateriasSerializer

class ProfesorViewSet(generics.ListCreateAPIView):
    queryset = profesor.objects.all()
    serializer_class = ProfesorSerializer

class IncrementarAsistenciaView(APIView):
    def post(self, request):
        correo = request.data.get('correo')
        
        if not correo:
            return Response({'error': 'Correo no proporcionado.'}, status=status.HTTP_400_BAD_REQUEST)
        
        alumno_obj = get_object_or_404(alumno, correo=correo)
        
        alumno_obj.asistencia += 1
        alumno_obj.save()
        
        return Response({'success': True, 'asistencia': alumno_obj.asistencia}, status=status.HTTP_200_OK)

class AsistenciaListView(APIView):
    def get(self, request, *args, **kwargs):
        # Filtrar las asistencias por alumno si se proporciona un parámetro 'alumno'
        alumno_id = request.query_params.get('alumno')
        if alumno_id:
            asistencias = Asistencia.objects.filter(alumno_id=alumno_id)
        else:
            asistencias = Asistencia.objects.all()

        # Serializar las asistencias
        serializer = AsistenciaSerializer(asistencias, many=True)

        # Retornar la respuesta con los datos serializados
        return Response(serializer.data, status=status.HTTP_200_OK)

class RegistrarAsistenciaView(APIView):
    def post(self, request, *args, **kwargs):
        materia_nombre = request.data.get("nombre")
        asistencias = request.data.get("asistencias")
        correo_profe = request.data.get("correo_profe")
        total_clases = request.data.get("totalClases")

        # Verificar que todos los datos estén presentes
        if not materia_nombre or not asistencias or not correo_profe or total_clases is None:
            return Response({"error": "Faltan parámetros en la solicitud."}, status=status.HTTP_400_BAD_REQUEST)

        # Buscar la materia correspondiente
        materia = materias.objects.filter(nombre=materia_nombre, correo_profe=correo_profe).first()
        if not materia:
            return Response({"error": "Materia no encontrada."}, status=status.HTTP_404_NOT_FOUND)

        # Actualizar el total de clases
        materia.totalClases = total_clases
        materia.save()

        # Registrar cada asistencia individualmente
        for asistencia in asistencias:
            alumno_id = asistencia.get("alumno")
            fecha = asistencia.get("fecha")
            presente = asistencia.get("asistencia")

            # Evitar duplicados
            if Asistencia.objects.filter(alumno_id=alumno_id, nombre=materia, fecha=fecha).exists():
                continue  # Pasar a la siguiente asistencia si ya existe

            # Crear la asistencia
            Asistencia.objects.create(alumno_id=alumno_id, nombre=materia, fecha=fecha, presente=presente)

        return Response({"message": "Asistencias registradas correctamente."}, status=status.HTTP_201_CREATED)

def generar_pdf_alumnos(request):
    response = HttpResponse(content_type='application/pdf')
    response['Content-Disposition'] = 'attachment; filename="informe_alumnos.pdf"'

    p = canvas.Canvas(response, pagesize=A4)
    width, height = A4
    y = height - 50
    p.setFont("Helvetica-Bold", 14)
    p.drawString(100, y, "Informe de Alumnos")

    y -= 30
    p.setFont("Helvetica", 12)

    # Encabezado de tabla
    data = [["ID", "Nombre", "Apellido", "Asistencias", "Porcentaje de Asistencia"]]

    alumnos_list = alumnoMode.objects.all()  # Usamos alumnoMode aquí
    total_clases = 20  # Reemplaza esto con el total de clases real

    for alumno_instance in alumnos_list:
        # Obtén las asistencias del alumno
        asistencias = Asistencia.objects.filter(alumno=alumno_instance)
        
        # Calcula el total de días presentes
        dias_presentes = asistencias.filter(presente=True).count()
        porcentaje_asistencia = (dias_presentes / total_clases) * 100 if total_clases > 0 else 0
        
        data.append([
            alumno_instance.id,
            alumno_instance.nombre,
            alumno_instance.apellido,
            f"{dias_presentes} días",
            f"{porcentaje_asistencia:.2f}%"
        ])

    # Configuración de estilo de tabla
    table = Table(data)
    table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.grey),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
        ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, 0), 12),
        ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
        ('BACKGROUND', (0, 1), (-1, -1), colors.beige),
        ('GRID', (0, 0), (-1, -1), 1, colors.black),
    ]))

    table.wrapOn(p, width, height)
    table.drawOn(p, 40, y - (len(data) * 20))

    p.showPage()
    p.save()
    return response

@csrf_exempt
@api_view(['POST'])
def guardar_alumno(request):
    try:
        data = json.loads(request.body)
        nuevo_alumno = alumno(
            nombre=data['nombre'],
            apellido=data['apellido'],
            edad=data['edad'],
            correo=data['correo'],
            password=data['password'],
            password2=data['password2'],
            asistencia=data.get('asistencia', 0) 
        )
        nuevo_alumno.save()
        return Response({"mensaje": "Alumno guardado en Django"}, status=status.HTTP_201_CREATED)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

from .models import alumno, materias, Asistencia  # Asegúrate de que los modelos están importados correctamente

@api_view(['GET'])
def asistencias_por_materia(request):
    materias_list = materias.objects.all()  # Verifica que el nombre del modelo es correcto
    asistencia_data = []

    for materia in materias_list:
        asistencias = Asistencia.objects.filter(nombre=materia)
        asistencia_info = {
            "id":materia.id,
            "nombre": materia.nombre,
            "asistencias": []
        }

        for alumno_obj in alumno.objects.all():
            alumno_asistencias = asistencias.filter(alumno=alumno_obj)
            asistencia_count = alumno_asistencias.count()
            if asistencia_count > 0:
                asistencia_info["asistencias"].append({
                    "alumno_id": alumno_obj.id,
                    "nombre": f"{alumno_obj.nombre} {alumno_obj.apellido}",
                    "asistencia": asistencia_count
                })
        
        asistencia_data.append(asistencia_info)

    return Response(asistencia_data, status=status.HTTP_200_OK)

@api_view(['POST'])  # Usamos POST para crear o actualizar asistencia
def actualizar_asistencia(request):
    try:
        alumno_id = request.data.get('alumno')
        nombre = request.data.get('nombre')
        fecha = request.data.get('fecha')
        presente = request.data.get('presente')

        # Verify that all required fields are present
        if not alumno_id or not nombre:
            return Response({'error': 'Alumno and Nombre are required fields.'}, status=status.HTTP_400_BAD_REQUEST)

        # Fetch or verify the associated Alumno and Materia instances
        alumno = alumnoMode.objects.get(id=alumno_id)
        materia = materias.objects.get(nombre=nombre)

        # Create the Asistencia record
        asistencia = Asistencia.objects.create(
            alumno=alumno,
            materia=materia,
            fecha=fecha,
            presente=presente
        )
        serializer = AsistenciaSerializer(asistencia)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    
class AsistenciaListView(APIView):
    def get(self, request, *args, **kwargs):
        # Obtén las asistencias por alumno si se proporciona el ID del alumno
        alumno_id = request.query_params.get('alumno')
        if alumno_id:
            asistencias = Asistencia.objects.filter(alumno_id=alumno_id)
        else:
            asistencias = Asistencia.objects.all()

        serializer = AsistenciaSerializer(asistencias, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        # Procesa la actualización de asistencia
        try:
            alumno_id = request.data.get('alumno')
            nombre = request.data.get('nombre')
            fecha = request.data.get('fecha')
            presente = request.data.get('presente')

            if not alumno_id or not nombre:
                return Response({'error': 'Alumno y Nombre son campos obligatorios.'}, status=status.HTTP_400_BAD_REQUEST)

            alumno = alumnoMode.objects.get(id=alumno_id)
            materia = materias.objects.get(nombre=nombre)

            asistencia = Asistencia.objects.create(
                alumno=alumno,
                nombre=materia,
                fecha=fecha,
                presente=presente
            )
            serializer = AsistenciaSerializer(asistencia)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)