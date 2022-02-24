// these types would be available globally in the project
interface ITodo {// this needs to mirror the shape of the data from the API
  _id: string
  name: string
  description: string
  status: boolean
  createdAt?: string
  updatedAt?: string
}

interface TodoProps {
  todo: ITodo
}

type ApiDataType = {
  message: string
  status: string
  todo?: ITodo
  todos: ITodo[]
}
