// models/Task.js
const mongoose=require('mongoose')

const taskSchema = new mongoose.Schema({
    description: { type: String, required: true },
    completed: { type: Boolean, default: false },
    dueDate: { type: Date ,default: Date.now},
    createdAt: { type: Date, default: Date.now }
});

const Task = mongoose.model('Task', taskSchema);

module.exports=  Task
