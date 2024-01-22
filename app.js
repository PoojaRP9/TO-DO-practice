// app.js


const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const Task=require('./models/Task.js');

const app = express();
const port = 3000;


mongoose.connect('mongodb+srv://poojapal88286:wft2Djf0CGRHUF4O@cluster0.ilyug11.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

// Check MongoDB connection
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Set up middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));  // Serve static files (CSS)

// Routes

// Read: Display all tasks
app.get('/', async (req, res) => {
    const tasks = await Task.find();
    res.render('index', { tasks });
});

// Create: Add a new task
app.post('/addTask', async (req, res) => {
    const { task, dueDate } = req.body;
    const newTask = new Task({ description: task, dueDate: dueDate ? new Date(dueDate) : undefined });
    await newTask.save();
    res.redirect('/');
});

// Update: Mark a task as completed
app.post('/completeTask/:id', async (req, res) => {
    const taskId = req.params.id;
    await Task.findByIdAndUpdate(taskId, { $set: { completed: true } });
    res.redirect('/');
});

// Delete: Remove a task
app.post('/deleteTask/:id', async (req, res) => {
    const taskId = req.params.id;
    await Task.findByIdAndRemove(taskId);
    res.redirect('/');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
