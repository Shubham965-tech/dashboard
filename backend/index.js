const express = require("express");
const connectMongoDb = require("./connection");
const cors = require("cors"); 
const app = express();
require("dotenv").config();
const PORT=process.env.PORT;

const authRouter = require('./routes/auth');
const eventRouter = require('./routes/events');
const galleryRouter = require('./routes/gallery');
const membersRouter = require('./routes/members');
const projectsRouter = require('./routes/projects');

const verifyToken = require('./middleware/verifyToken');


app.use(express.urlencoded({ extended: false })); 
app.use(express.json()); 
app.use(cors()); 



connectMongoDb(process.env.connection_URL)
  .then(() => console.log("MongoDB connected successfully from index.js"))
  .catch(err => console.error("MongoDB connection failed from index.js:", err));


app.use('/auth', authRouter);


app.use('/events', verifyToken, eventRouter);
app.use('/gallery', verifyToken, galleryRouter);
app.use('/members', verifyToken, membersRouter);
app.use('/projects', verifyToken, projectsRouter);


app.get('/', (req, res) => {
  res.send('Backend server is running!');
});

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));

