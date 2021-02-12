import { training } from "./training";

export interface exercise{
    id?:number,
    nameExercise:String,
    description:String,
    type:String,
    repTime:number,
    photo?:String ,
    trainings?:training[]
}