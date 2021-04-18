import { training } from "./training";
import { user } from "./user";
export interface records{
    id?:number,
    idTrai?:training,
    localDateTime?:Date,
    idu?:user
}