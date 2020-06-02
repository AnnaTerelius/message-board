import express from "express"
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import crypto from 'crypto'
import bcrypt from 'bcrypt-nodejs'
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

const Message = mongoose.model("Message", {
    id: { 
      type: Date,
      default: Date.now
    },
    author: {
      type: Number,
    },
    message: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 140
    }
    
})

const User = mongoose.model("User", {
  userName: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString('hex'),
  },
})

// User ================================
// name       password      accessToken     _id
//  Anna      sdfsfsdfa     asdfasfasd      1111111111
//  Fredrik   bbbbbb a      bbbbbbbbb       2222222222

// Messages ==========================
// message      author              _id
//  Hej         1111111111          1231231231231
//  Hej igen    1111111111          2222222222222

Message.deleteMany().then(() => {
    new Message({id: 1, message: 'Watch video on actions & reducers', author: 11 }).save();
    new Message({id: 2, message: 'Follow redux codealong', author: 12}).save();
    new Message({id: 3, message: 'Fork weekly assignment', author: 13}).save();
    new Message({id: 4, message: 'Create a todo app', author: 14}).save();
})

User.deleteMany().then(() => {
  new User({userName: "Anna", password: bcrypt.hashSync("HollyDahlia") }).save();
  new User({userName: "Holly", password: bcrypt.hashSync("Kurry") }).save();
  new User({userName: "Fredrik", password: bcrypt.hashSync("Hjälmunge") }).save();
 
})
console.log(bcrypt.hashSync("HollyDahlia"))

const port = process.env.PORT || 8000
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())
//catches if there are any dabase errors, if not continue to queries

const authenticateUser = async (req, res, next) => {
  try { 
  const user = await User.findOne({accessToken: req.header("Authorization")});
  if (user) {
    req.user = user;
    next();
  } else {
    res.status(401).json({loggedOut: true})
  }
} catch (err) {
  res
    .status(403)
    .json({ message: 'access token missing or wrong', errors: err.errors })
}
}

// Start defining routes here
/*app.get("/",  (req, res) => {
    res.send("hello world")
    })*/

/*// SECRET ROUTE (Welcome page)
app.get('/users/:userId', authenticateUser)
app.get('/users/:userId', (req, res) => {
  res.json({ name: req.user.name })
})*/

//app.get("/messages", authenticateUser);
app.get("/messages", async (req, res) => {
 const message = await Message.find();
 res.send(message);
 //res.json({secret: "hello"})
});

app.get("/users", async (req, res) => {
  const user = await User.find();
  res.send(user);
 });

 //to register new user
 app.post("/users", async (req, res) => {
   try {
    const {userName, password} = req.body;
    const user = new User({userName: userName, password: bcrypt.hashSync(password)});
    user.save();
    res.status(201).json({id: user._id, accessToken: user.accessToken})
   } catch (err) {
     res.status(400).json({message: "Could not create user", errors: err.errors})
   }
 })


//app.post("/messages", authenticateUser);
app.post("/messages", async (req, res) => {
  //this will only happen if the user is Authenticated(if the next function is called)
    //get the info send by user to our API endpoint
    const newMessage = new Message({
      id: req.body.id,
      author: req.body.author,
      message:req.body.message,
    });

    //use our mongoose model to create database entry
    await newMessage.save();
  })

  //to log in user
app.post("/sessions", async (req, res) => {
  try { 
    const {userName, password} = req.body;
    const user = await User.findOne({userName: req.body.userName})
      if(user && bcrypt.compareSync(req.body.password, user.password)) {
      //succes
      res.status(201).json({userId: user._id, accessToken: user.accessToken})
  } else {
    //failure: user does not exist or the encrypted password does not match
    res.json({notFound: true})
  } 
} catch (err) {
  res.status(400).json({ message: 'could not find user', errors: err.errors })
}
  
})



/*app.post('/sessions', async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (user && bcrypt.compareSync(password, user.password)) {
      res.status(201).json({ userId: user._id, accessToken: user.accessToken })
    } else {
      res.json({ message: 'User not found' })
    }
  } catch (err) {
    res.status(400).json({ message: 'could not find user', errors: err.errors })
  }
})*/

  //to delete post 
  app.delete("/messages/:id", async (req, res) => {
    try {
      await Message.deleteOne({ _id: req.params.id });
      res.status(204).send();
    } catch {
      res.status(404).json({ error: 'Message does not exist' });
    }
  });

  //to update message
  app.put("/messages/:id", async (req, res) => {
    try {
      const message = await Message.findOne({ _id: req.params.id })
  
      if (req.body.message) {
        message.message = req.body.message
      }
  
      await message.save()
      res.send(message)
      
    } catch {
      res.status(404)
      res.send({ error: "Message doesn't exist!" })
    }
  })
  
// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
  })

//app.listen(8000, () => console.log('app listening on port 8000'))

//console.log("hello world")