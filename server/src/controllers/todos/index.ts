import {Response, Request} from "express";// these are express types
import {ITodo} from "../../types/todo";
import Todo from '../../models/todo'


const getTodos = async (req: Request, res: Response): Promise<void> => {
    try {
        const todos: ITodo[] = await Todo.find()
        res.status(200).json({todos})
    } catch (error) {
        throw error
    }
}


const addTodo = async (req: Request, res: Response): Promise<void> => {
    try {
        const body = req.body as Pick<ITodo, "name" | "description" | "status">// makes the request match a todo
        const todo: ITodo = new Todo({// new todo based on typed model
            name: body.name,
            description: body.description,
            status: body.status,
        })

        const newTodo: ITodo = await todo.save()
        const allTodos: ITodo[] = await Todo.find()

        res.status(201).json({message: 'Todo added', todo: newTodo, todos: allTodos})
    } catch (error) {
        throw error
    }
}


const updateTodo = async (req: Request, res: Response): Promise<void> => {
    try {
        const {params: {id}, body} = req

        const updateTodo: ITodo | null = await Todo.findByIdAndUpdate({_id: id}, body)
        const allTodos: ITodo[] = await Todo.find()
        res.status(200).json({message: 'Todo updated', todo: updateTodo, todos: allTodos})
    } catch (error) {
        throw error
    }

}
const deleteTodo = async (req: Request, res: Response): Promise<void> => {
    try {
        const deleteTodo: ITodo | null = await Todo.findByIdAndDelete(req.params.id)
        const allTodos: ITodo[] = await Todo.find()
        res.status(200).json({message: 'Todo deleted', todo: deleteTodo, todos: allTodos})
    } catch (error) {
        throw error
    }

}

export {getTodos, addTodo, updateTodo, deleteTodo}
