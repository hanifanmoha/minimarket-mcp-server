import { z } from 'zod';
import { randomUUID } from 'crypto';
import todosManager from './todos-db.js';

// Zod schemas for validation
const createTodoZodSchema = {
  title: z.string().min(1, "Title is required"),
  user_id: z.string().min(1, "User ID is required"),
  is_complete: z.boolean().optional().default(false)
};

const getTodosByUserZodSchema = {
  user_id: z.string().min(1, "User ID is required")
};

const updateTodoZodSchema = {
  id: z.string().min(1, "Todo ID is required"),
  title: z.string().optional(),
  is_complete: z.boolean().optional()
};

const todoIdZodSchema = {
  id: z.string().min(1, "Todo ID is required")
};

const emptyZodSchema = {};

/**
 * Register todos CRUD tools with the MCP server
 * @param {McpServer} mcpServer - The MCP server instance
 */
export function registerTodosTools(mcpServer) {
  // Generate new user ID
  mcpServer.registerTool("generate_user_id", {
    title: "Generate User ID",
    description: "Generate a new unique user ID (UUID v4) for creating todos",
    inputSchema: emptyZodSchema
  }, async () => {
    try {
      const userId = randomUUID();
      return {
        content: [{
          type: 'text',
          text: JSON.stringify({
            success: true,
            message: "User ID generated successfully",
            user_id: userId
          }, null, 2)
        }]
      };
    } catch (error) {
      return {
        content: [{
          type: 'text',
          text: JSON.stringify({
            success: false,
            error: error.message
          }, null, 2)
        }]
      };
    }
  });

  // Create a new todo
  mcpServer.registerTool("create_todo", {
    title: "Create Todo",
    description: "Create a new todo item. Maximum of 3 todos per user allowed. If user already has 3 todos, they must DELETE existing todos first (completing todos does not free up space).",
    inputSchema: createTodoZodSchema
  }, async (args) => {
    try {
      const todo = await todosManager.createTodo(args);
      return {
        content: [{
          type: 'text',
          text: JSON.stringify({
            success: true,
            message: "Todo created successfully",
            todo: todo
          }, null, 2)
        }]
      };
    } catch (error) {
      return {
        content: [{
          type: 'text', 
          text: JSON.stringify({
            success: false,
            error: error.message
          }, null, 2)
        }]
      };
    }
  });

  // Get todos for a specific user
  mcpServer.registerTool("get_todos_by_user", {
    title: "Get Todos by User",
    description: "Get all todos for a specific user",
    inputSchema: getTodosByUserZodSchema
  }, async (args) => {
    try {
      const todos = await todosManager.getTodosByUser(args.user_id);
      return {
        content: [{
          type: 'text',
          text: JSON.stringify({
            success: true,
            user_id: args.user_id,
            count: todos.length,
            todos: todos
          }, null, 2)
        }]
      };
    } catch (error) {
      return {
        content: [{
          type: 'text',
          text: JSON.stringify({
            success: false,
            error: error.message
          }, null, 2)
        }]
      };
    }
  });

  // Update a todo
  mcpServer.registerTool("update_todo", {
    title: "Update Todo", 
    description: "Update an existing todo",
    inputSchema: updateTodoZodSchema
  }, async (args) => {
    try {
      const { id, ...updateData } = args;
      const todo = await todosManager.updateTodo(id, updateData);
      
      if (!todo) {
        return {
          content: [{
            type: 'text',
            text: JSON.stringify({
              success: false,
              error: "Todo not found"
            }, null, 2)
          }]
        };
      }

      return {
        content: [{
          type: 'text',
          text: JSON.stringify({
            success: true,
            message: "Todo updated successfully",
            todo: todo
          }, null, 2)
        }]
      };
    } catch (error) {
      return {
        content: [{
          type: 'text',
          text: JSON.stringify({
            success: false,
            error: error.message
          }, null, 2)
        }]
      };
    }
  });

  // Complete a todo (shortcut for updating is_complete to true)
  mcpServer.registerTool("complete_todo", {
    title: "Complete Todo",
    description: "Mark a todo as completed",
    inputSchema: todoIdZodSchema
  }, async (args) => {
    try {
      const todo = await todosManager.completeTodo(args.id);
      
      if (!todo) {
        return {
          content: [{
            type: 'text',
            text: JSON.stringify({
              success: false,
              error: "Todo not found"
            }, null, 2)
          }]
        };
      }

      return {
        content: [{
          type: 'text',
          text: JSON.stringify({
            success: true,
            message: "Todo marked as completed",
            todo: todo
          }, null, 2)
        }]
      };
    } catch (error) {
      return {
        content: [{
          type: 'text',
          text: JSON.stringify({
            success: false,
            error: error.message
          }, null, 2)
        }]
      };
    }
  });

  // Reopen a todo (shortcut for updating is_complete to false)
  mcpServer.registerTool("reopen_todo", {
    title: "Reopen Todo",
    description: "Mark a todo as incomplete",
    inputSchema: todoIdZodSchema
  }, async (args) => {
    try {
      const todo = await todosManager.reopenTodo(args.id);
      
      if (!todo) {
        return {
          content: [{
            type: 'text',
            text: JSON.stringify({
              success: false,
              error: "Todo not found"
            }, null, 2)
          }]
        };
      }

      return {
        content: [{
          type: 'text',
          text: JSON.stringify({
            success: true,
            message: "Todo marked as incomplete",
            todo: todo
          }, null, 2)
        }]
      };
    } catch (error) {
      return {
        content: [{
          type: 'text',
          text: JSON.stringify({
            success: false,
            error: error.message
          }, null, 2)
        }]
      };
    }
  });

  // Delete a todo
  mcpServer.registerTool("delete_todo", {
    title: "Delete Todo",
    description: "Delete a todo by ID",
    inputSchema: todoIdZodSchema
  }, async (args) => {
    try {
      const deleted = await todosManager.deleteTodo(args.id);
      
      if (!deleted) {
        return {
          content: [{
            type: 'text',
            text: JSON.stringify({
              success: false,
              error: "Todo not found"
            }, null, 2)
          }]
        };
      }

      return {
        content: [{
          type: 'text',
          text: JSON.stringify({
            success: true,
            message: "Todo deleted successfully",
            id: args.id
          }, null, 2)
        }]
      };
    } catch (error) {
      return {
        content: [{
          type: 'text',
          text: JSON.stringify({
            success: false,
            error: error.message
          }, null, 2)
        }]
      };
    }
  });
}
