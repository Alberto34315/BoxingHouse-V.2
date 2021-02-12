import { training } from "./training";

export interface user{
    id?:number,
    name:String,
    email:String,
    pass:String,
    avatar?:String,
    trainings?:training[]
}