import { create } from "zustand";
import { persist , devtools } from "zustand/middleware";

export type Todo = {
    id : number , 
    name : string , 
    isDone : boolean
}

type State = {
    Todos : Todo[]   
}

type Action = {
    AddTodo : (todo : Todo) => void , 
    DeleteTodo : (id : number) => void , 
    ToogleTodo : (id:number , isDone : boolean) => void   
}

export const UseTodos = create<State & Action>()(
    devtools(
        persist(
            (set)=>({
                Todos : [],
                AddTodo : (todo : Todo) => set((state) => ({Todos : [todo , ...state.Todos],})),
                ToogleTodo : (id : number , isDone : boolean) => set((state) => ({
                    Todos : state.Todos.map((item) => {
                        if(item.id === id)
                        {
                            item.isDone = isDone;
                        }
                        return item;
                    })
                })),
                DeleteTodo : (id : number) => set((state) => ({
                    Todos: state.Todos.filter((item) => item.id !== id),
                })) 
            })
        ,{name : "MyTodo"})
    )
);