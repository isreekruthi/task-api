import * as taskService from '../services/taskService.js';

export async function getTasks(req, res, next) {
  try {
    const { completed } = req.query;

    if (
      completed !== undefined && completed !== 'true' && completed !== 'false'
    ) {
      return res.status(400).json({
        error: 'Invalid value for completed. Must be true or false.',
      });
    }
  

    const tasks = await taskService.getAllTasks(completed);
    res.json(tasks);
  } catch (err) {
    next(err);
  }
}

export async function createTask(req, res, next) {
  const { title, completed } = req.body;
  const task = await taskService.createTask({ title, completed });
  res.status(201).json(task);
}
