import { ChangeEvent } from "react";

export interface InputType {
    placeholder?:string,
    label:string,
    onChange:(e:ChangeEvent<HTMLInputElement>)=>void,
    type?:string
}