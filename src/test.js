import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'

/*Mock API: 
 
GET /messages Response: { result: [{ id: number, message: string, 
author: number, 
}] 
} 
 
POST /messages Request: { message: string, author: number, } Response: 204 
 
PUT /messages/{id} Request: { message: string } Response: 204 
 
DELETE /messages/{id} Response: 204 */

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/message-board"
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.Promise = Promise

console.log("hello world")

const Message = mongoose.model("Message", {
    message: String,
    author: Number,
    id: Number
})

Message.deleteMany().then(() => {
    new Message({id: 1, text: 'Watch video on actions & reducers' }).save();
    new Message({id: 2, text: 'Follow redux codealong'}).save();
    new Message({id: 3, text: 'Fork weekly assignment'}).save();
    new Message({id: 4, text: 'Create a todo app'}).save();
})

// Defines the port the app will run on. Defaults to 8000, but can be 
// overridden when starting the server.
const port = process.env.PORT || 8000
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

// Start defining routes here
app.get("/messages", async (req, res) => {
    const messages = await Message.find()
    res.json(messages)
    })


// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
  })