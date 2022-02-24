import axios, {AxiosResponse} from "axios";


const baseUrl: string = "http://localhost:4000"

export const getTodos = async (): Promise<AxiosResponse<ApiDataType>> => {
  // NOTE: the syntax Promise<AxiosResponse<ApiDataType>>  means it returns the a promise of type
  // AxiosResponse that holds data that match the type ApiDataType
  try {
    const todos: AxiosResponse<ApiDataType> = await axios.get(baseUrl + '/todos')
    return todos
  } catch (error: any) {
    throw new Error(error)
  }
}

export const addTodo = async (formData: ITodo): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const todo: Omit<ITodo, "_id"> = {// we omit the _id because mongodb would cry it automatically
      name: formData.name,
      description: formData.description,
      status: false,
    }

    const saveTodo: AxiosResponse<ApiDataType> = await axios.post(baseUrl + '/add-todo', todo)
    return saveTodo
  } catch (error: any) {
    throw new Error(error)
  }

}

export const updateTodo = async (todo: ITodo): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const todoUpdate: Pick<ITodo, 'status'> = {
      status: true,
    }
    const updatedTodo: AxiosResponse<ApiDataType> = await axios.put(`${baseUrl}/edit-todo/${todo._id}`, todoUpdate)
    return updatedTodo
  } catch (error: any) {
    throw new Error(error)
  }
}

export const deleteTodo = async (_id: string): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const deleteTodo: AxiosResponse<ApiDataType> = await axios.delete(`${baseUrl}/delete-todo/${_id}`)
    return deleteTodo
  } catch (error: any) {
    throw new Error(error)
  }


}
