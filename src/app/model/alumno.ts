// alumno.ts
export interface Alumno {
    id?: string;
    nombre: string;
    apellido: string;
    edad: number | null;
    correo: string;
    password: string;
    password2: string;
    asistencia: number;
    materias: Materia[];
}

export interface Materia {
    nombre: string;
    duracion: string;
    correo_profe: string;
    totalClases: number;
}

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

export interface Asistencia {
    fecha: string;
    presente: boolean;
}

export interface AlumnoConPresente extends Alumno {
    presente?: boolean;
}