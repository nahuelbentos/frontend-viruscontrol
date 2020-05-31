
export interface Usuario {
    idUsuario?: number;
    username: string;
    nombre: string;
    apellido: string;
    direccion?: string;
    telefono?: number;
    cedula?: number;
    fechaNacimiento?: Date;
    nacionalidad?: string;
    correo: string;
    primerIngreso?: boolean;
}
