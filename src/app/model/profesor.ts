// Interfaces
export interface Profesor {
    id?: string;
    nombre: string;
    apellido: string;
    edad: number | null;
    correo: string;
    password: string;
    password2: string;
    curso: string; 
}

// Funciones

/**
 * Asigna una materia a un profesor.
 * @param profesor
 * @param materiaId 
 * @returns 
 */
export function asignarMateriaAProfesor(
    profesor: Profesor,
    materiaId: string
): Profesor {
    profesor.curso = materiaId;
    return profesor;
}

/**
 * Verifica si el profesor tiene la materia asignada.
 * @param profesor - Objeto Profesor a consultar
 * @param materiaId - ID de la materia a verificar
 * @returns `true` si el profesor enseña la materia, de lo contrario `false`
 */
export function verificarMateriaAsignada(
    profesor: Profesor,
    materiaId: string
): boolean {
    return profesor.curso === materiaId;
}
