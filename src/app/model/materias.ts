// Interfaces
export interface MateriaCurso {
    id: number;
    nombre: string;
    duracion: string;         
    correo_profe: string;     
    totalClases: number;      
    asistencias: AsistenciaCurso[]; // Cambiamos el nombre aquí
}

export interface AsistenciaCurso {
    alumno_id: number;
    materia: MateriaCurso; // Cambiamos el nombre aquí
    asistencia: boolean;
    fecha: string; 
}

// Funciones

/**
 * Asigna un profesor a una materia específica.
 * @param materia - El objeto Materias a modificar
 * @param correoProfe - Correo del profesor a asignar
 * @returns Un objeto Materias actualizado con el profesor asignado
 */
export function asignarProfesorAMateria(
    materia: MateriaCurso,
    correoProfe: string
): MateriaCurso {
    materia.correo_profe = correoProfe;
    return materia;
}

/**
 * Incrementa el contador de clases totales en una materia.
 * @param materia - El objeto Materias a modificar
 * @param cantidad - Número de clases adicionales a sumar (puede ser negativo para restar)
 * @returns Un objeto Materias actualizado con el total de clases modificado
 */
export function actualizarTotalClases(
    materia: MateriaCurso,
    cantidad: number
): MateriaCurso {
    materia.totalClases += cantidad;
    return materia;
}

/**
 * Verifica si un profesor específico está asignado a la materia.
 * @param materia - El objeto Materias a consultar
 * @param correoProfe - Correo del profesor a verificar
 * @returns `true` si el profesor está asignado a la materia, de lo contrario `false`
 */
export function verificarProfesorAsignado(
    materia: MateriaCurso,
    correoProfe: string
): boolean {
    return materia.correo_profe === correoProfe;
}
