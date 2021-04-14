import { training } from "./training";
import { user } from "./user";
export interface records{
    id?:number,
    idTrai?:training,
    date?:Date,
    idu?:user
}