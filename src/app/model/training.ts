import { exercise } from "./exercise";
import { records } from "./records";
import { user } from "./user";
export interface training{
    id?:number,
    title?:String,
    creator?:user,
    time?:number,
    exercises?:exercise[],
    published?:boolean,
    lr?:records[],
    usersf?:user[]
}