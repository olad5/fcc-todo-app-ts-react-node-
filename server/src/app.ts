import express, {Express} from "express";
import mongoose from "mongoose";
import cors from 'cors'
import bodyParser from 'body-parser'
import todoRoutes from './routes/index'
import dotenv from "dotenv"
dotenv.config()

const app: Express = express()
const PORT: string | number = process.env.PORT || 4000

app.use(bodyParser.json({limit: '31mb'}))
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}))

app.use(cors())
app.use(todoRoutes)

const uri: string = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.zyeqz.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`

mongoose
    .connect(uri)
    .then(() =>
        app.listen(PORT, () =>
            console.log(`Server running on http://localhost:${PORT}`)
        )
    )
    .catch(error => {
        throw error
    })
