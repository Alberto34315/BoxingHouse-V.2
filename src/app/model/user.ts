import { exercise } from "./exercise";
import { records } from "./records";
import { training } from "./training";

export interface user{
    id?:number,
    name?:String,
    email?:String,
    pass?:String,
    avatar?:String,
    lt?:training[],
    le?:exercise[],
    friends?:user[],
    lrecords?:records[],
    isChecked?:boolean
}