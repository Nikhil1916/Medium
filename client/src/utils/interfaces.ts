import { ChangeEvent } from "react";

export interface InputType {
    placeholder?:string,
    label:string,
    onChange:(e:ChangeEvent<HTMLInputElement>)=>void,
    type?:string
}

export interface BlogCardProps {
    authorName: string;
    title: string;
    content: string;
    publishedDate: string
}

export enum StorageKeys {
    token = "token"
}


export interface Blog {
    id:number,
    author: {
        name:string,
        username:string
    },
    author_id: string,
    content: string,
    created_at: string,
    published:boolean,
    title: string
}