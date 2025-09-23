import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

class TodosManager {
  constructor() {
    this.client = null;
    this.db = null;
    this.collection = null;
    this.isConnected = false;
  }

  /**
   * Connect to MongoDB database
   */
  async connect() {
    if (this.isConnected) {
      return this.db;
    }

    try {
      const uri = process.env.MONGODB_URI;
      if (!uri) {
        throw new Error('MONGODB_URI environment variable is not set');
      }
      this.client = new MongoClient(uri);
      
      await this.client.connect();
      this.db = this.client.db();
      this.collection = this.db.collection('todos');
      this.isConnected = true;

      // Create indexes for better performance
      await this.createIndexes();
      
      console.log('✅ Connected to MongoDB - Todos collection ready');
      return this.db;
    } catch (error) {
      console.error('❌ MongoDB connection error:', error);
      throw error;
    }
  }

  /**
   * Create database indexes
   */
  async createIndexes() {
    try {
      await this.collection.createIndex({ user_id: 1 });
      await this.collection.createIndex({ is_complete: 1 });
      await this.collection.createIndex({ user_id: 1, is_complete: 1 });
      await this.collection.createIndex({ createdAt: -1 });
      await this.collection.createIndex({ title: 'text' });
      console.log('📊 Todos collection indexes created');
    } catch (error) {
      console.log('⚠️ Index creation warning:', error.message);
    }
  }

  /**
   * Ensure connection is established
   */
  async ensureConnection() {
    if (!this.isConnected) {
      await this.connect();
    }
  }

  /**
   * Close database connection
   */
  async close() {
    if (this.client) {
      await this.client.close();
      this.client = null;
      this.db = null;
      this.collection = null;
      this.isConnected = false;
      console.log('🔌 MongoDB connection closed');
    }
  }

  // ==================== CREATE OPERATIONS ====================

  /**
   * Create a new todo
   * @param {Object} todoData - The todo data
   * @param {string} todoData.title - Title of the todo
   * @param {string} todoData.user_id - User ID who owns this todo
   * @param {boolean} [todoData.is_complete=false] - Whether the todo is completed
   * @returns {Promise<Object>} The created todo
   */
  async createTodo(todoData) {
    await this.ensureConnection();

    const todo = {
      title: todoData.title,
      user_id: todoData.user_id,
      is_complete: todoData.is_complete || false,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Validate required fields
    if (!todo.title || todo.title.trim() === '') {
      throw new Error('Title is required');
    }

    if (!todo.user_id || todo.user_id.trim() === '') {
      throw new Error('User ID is required');
    }

    try {
      const result = await this.collection.insertOne(todo);
      const createdTodo = await this.collection.findOne({ _id: result.insertedId });
      console.log('✅ Todo created:', createdTodo._id);
      return createdTodo;
    } catch (error) {
      console.error('❌ Error creating todo:', error);
      throw error;
    }
  }



  // ==================== READ OPERATIONS ====================







  // ==================== USER-SPECIFIC OPERATIONS ====================

  /**
   * Get all todos for a specific user
   * @param {string} userId - User ID
   * @returns {Promise<Array>} Array of user's todos
   */
  async getTodosByUser(userId) {
    await this.ensureConnection();

    try {
      const userFilter = { user_id: userId };
      
      const todos = await this.collection.find(userFilter).sort({ createdAt: -1 }).toArray();
      console.log(`📋 Retrieved ${todos.length} todos for user: ${userId}`);
      return todos;
    } catch (error) {
      console.error('❌ Error getting todos by user:', error);
      throw error;
    }
  }





  // ==================== UPDATE OPERATIONS ====================

  /**
   * Update a todo by ID
   * @param {string} id - Todo ID
   * @param {Object} updateData - Data to update
   * @returns {Promise<Object|null>} Updated todo or null if not found
   */
  async updateTodo(id, updateData) {
    await this.ensureConnection();

    try {
      let query;
      if (ObjectId.isValid(id)) {
        query = { _id: new ObjectId(id) };
      } else {
        query = { id: id };
      }

      // Prepare update object
      const updateObj = { ...updateData };
      updateObj.updatedAt = new Date();

      const result = await this.collection.updateOne(query, { $set: updateObj });

      if (result.matchedCount === 0) {
        console.log('❌ Todo not found with ID:', id);
        return null;
      }

      const updatedTodo = await this.collection.findOne(query);
      console.log('✅ Todo updated:', updatedTodo._id);
      return updatedTodo;
    } catch (error) {
      console.error('❌ Error updating todo:', error);
      throw error;
    }
  }

  /**
   * Mark todo as completed
   * @param {string} id - Todo ID
   * @returns {Promise<Object|null>} Updated todo or null if not found
   */
  async completeTodo(id) {
    return await this.updateTodo(id, {
      is_complete: true
    });
  }

  /**
   * Mark todo as incomplete
   * @param {string} id - Todo ID
   * @returns {Promise<Object|null>} Updated todo or null if not found
   */
  async reopenTodo(id) {
    return await this.updateTodo(id, {
      is_complete: false
    });
  }



  // ==================== DELETE OPERATIONS ====================

  /**
   * Delete a todo by ID
   * @param {string} id - Todo ID
   * @returns {Promise<boolean>} True if deleted, false if not found
   */
  async deleteTodo(id) {
    await this.ensureConnection();

    try {
      let query;
      if (ObjectId.isValid(id)) {
        query = { _id: new ObjectId(id) };
      } else {
        query = { id: id };
      }

      const result = await this.collection.deleteOne(query);

      if (result.deletedCount > 0) {
        console.log('✅ Todo deleted:', id);
        return true;
      } else {
        console.log('❌ Todo not found with ID:', id);
        return false;
      }
    } catch (error) {
      console.error('❌ Error deleting todo:', error);
      throw error;
    }
  }



  // ==================== UTILITY OPERATIONS ====================


}

// Export singleton instance
const todosManager = new TodosManager();

export default todosManager;

// Also export the class for custom instances
export { TodosManager };
