import { exercise } from "./exercise";
import { user } from "./user";
export interface training{
    id?:number,
    title?:String,
    creator?:user,
    time?:number,
    exercises?:exercise[]
}