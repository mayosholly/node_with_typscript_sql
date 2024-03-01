import express, {Request, Response} from 'express';
import { postRouter, CategoryRouter, ImageRouter, UserRouter } from './routes';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

// Load environment variables from .env
dotenv.config();


const app = express();



app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended:true }))

app.use('/test',  (req, res) => {
    res.send("hello")
}) 

app.use('/posts', postRouter)
app.use('/categories', CategoryRouter)
app.use('/upload', ImageRouter)
app.use('/auth', UserRouter)


app.listen(process.env.PORT , () => {
    console.log(`Example app listening on ${process.env.PORT}`);  
})