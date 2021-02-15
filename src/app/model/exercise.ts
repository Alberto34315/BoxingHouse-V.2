import { training } from "./training";
import { user } from "./user";

export interface exercise{
    id?:number,
    nameExercise:String,
    description:String,
    type:String,
    repTime:number,
    creator:user,
    photo?:String ,
    trainings?:training[]
}