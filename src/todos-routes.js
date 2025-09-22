import express from 'express';
import todosManager from './todos-db.js';

const router = express.Router();

// Middleware to ensure database connection
router.use(async (req, res, next) => {
  try {
    await todosManager.ensureConnection();
    next();
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).json({ error: 'Database connection failed' });
  }
});

// POST /todos - Create a new todo
router.post('/', async (req, res) => {
  try {
    const { title, user_id, is_complete } = req.body;

    // Validate required fields
    if (!title || !user_id) {
      return res.status(400).json({ 
        error: 'Title and user_id are required',
        required: ['title', 'user_id']
      });
    }

    const todoData = {
      title,
      user_id,
      is_complete: is_complete || false
    };

    const newTodo = await todosManager.createTodo(todoData);
    
    res.status(201).json({
      success: true,
      message: 'Todo created successfully',
      data: newTodo
    });

  } catch (error) {
    console.error('Error creating todo:', error);
    res.status(400).json({ 
      error: error.message || 'Failed to create todo'
    });
  }
});

// GET /todos - Get todos with optional query parameters
router.get('/', async (req, res) => {
  try {
    const { user_id } = req.query;

    if (!user_id) {
      return res.status(400).json({ 
        error: 'user_id is required',
        message: 'Please provide user_id as query parameter'
      });
    }

    const todos = await todosManager.getTodosByUser(user_id);

    res.status(200).json({
      success: true,
      count: todos.length,
      data: todos
    });

  } catch (error) {
    console.error('Error getting todos:', error);
    res.status(500).json({ 
      error: error.message || 'Failed to get todos'
    });
  }
});

// PUT /todos/:id - Update a specific todo
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Remove fields that shouldn't be updated directly
    delete updateData._id;
    delete updateData.createdAt;

    const updatedTodo = await todosManager.updateTodo(id, updateData);

    if (!updatedTodo) {
      return res.status(404).json({ 
        error: 'Todo not found',
        id: id
      });
    }

    res.status(200).json({
      success: true,
      message: 'Todo updated successfully',
      data: updatedTodo
    });

  } catch (error) {
    console.error('Error updating todo:', error);
    res.status(400).json({ 
      error: error.message || 'Failed to update todo'
    });
  }
});

// PUT /todos/:id/complete - Mark todo as completed
router.put('/:id/complete', async (req, res) => {
  try {
    const { id } = req.params;
    const completedTodo = await todosManager.completeTodo(id);

    if (!completedTodo) {
      return res.status(404).json({ 
        error: 'Todo not found',
        id: id
      });
    }

    res.status(200).json({
      success: true,
      message: 'Todo marked as completed',
      data: completedTodo
    });

  } catch (error) {
    console.error('Error completing todo:', error);
    res.status(400).json({ 
      error: error.message || 'Failed to complete todo'
    });
  }
});

// PUT /todos/:id/reopen - Reopen a completed todo
router.put('/:id/reopen', async (req, res) => {
  try {
    const { id } = req.params;
    const reopenedTodo = await todosManager.reopenTodo(id);

    if (!reopenedTodo) {
      return res.status(404).json({ 
        error: 'Todo not found',
        id: id
      });
    }

    res.status(200).json({
      success: true,
      message: 'Todo marked as incomplete',
      data: reopenedTodo
    });

  } catch (error) {
    console.error('Error reopening todo:', error);
    res.status(400).json({ 
      error: error.message || 'Failed to reopen todo'
    });
  }
});

// DELETE /todos/:id - Delete a specific todo
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await todosManager.deleteTodo(id);

    if (!deleted) {
      return res.status(404).json({ 
        error: 'Todo not found',
        id: id
      });
    }

    res.status(200).json({
      success: true,
      message: 'Todo deleted successfully',
      id: id
    });

  } catch (error) {
    console.error('Error deleting todo:', error);
    res.status(500).json({ 
      error: error.message || 'Failed to delete todo'
    });
  }
});

export default router;
