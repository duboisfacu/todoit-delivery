import { Rol } from "./rol";

export interface User {
    id ? : number, email: string, fullName: string, address: string, cellPhone: string, isAccepted ? : boolean, isDeleted ? : boolean, observations: string, password: string, vehicle ? : string, rol ? : Rol;
  }
