import { useContext , createContext } from "react";

export const Todocontexts = createContext({
    todo : [{
        id : 1,
        todo : "Hello world!",
        complete : false
    }],
    updateTodo : (id,todo) => {},
    addTodo : (todo) => {},
    deleteTodo : (id) => {},
    toggleitems : (id) => {}

});

export const useTodo = () => {
    return useContext(Todocontexts);
}

export const TodoProvider = Todocontexts.Provider;