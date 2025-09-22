import todosManager from './todos-db.js';

/**
 * Example usage of the TodosManager
 * This file demonstrates how to use all the CRUD operations
 */

async function todoExamples() {
  try {
    // Connect to database
    await todosManager.connect();

    console.log('\n🚀 Starting Todo CRUD Examples with User Support...\n');

    // Sample user IDs
    const user1 = 'user_12345';
    const user2 = 'user_67890';

    // =============== CREATE EXAMPLES ===============
    console.log('📝 CREATE EXAMPLES:');

    // Create a simple todo for user 1
    const todo1 = await todosManager.createTodo({
      title: 'Complete project documentation',
      user_id: user1,
      description: 'Write comprehensive docs for the MCP server',
      priority: 'high',
      dueDate: new Date('2025-01-01'),
      tags: ['work', 'documentation']
    });
    console.log('Created todo 1 for user 1:', todo1.title);

    // Create another todo for user 2
    const todo2 = await todosManager.createTodo({
      title: 'Review code',
      user_id: user2,
      description: 'Review the todos.js implementation',
      priority: 'medium',
      status: 'in-progress'
    });
    console.log('Created todo 2 for user 2:', todo2.title);

    // Create multiple todos at once for user 1
    const multipleTodos = await todosManager.createManyTodos([
      {
        title: 'Buy groceries',
        user_id: user1,
        priority: 'low',
        tags: ['personal', 'shopping']
      },
      {
        title: 'Fix critical bug',
        user_id: user1,
        description: 'Address the memory leak in the server',
        priority: 'urgent',
        status: 'pending'
      }
    ]);
    console.log('Created multiple todos for user 1:', multipleTodos.length);

    // =============== READ EXAMPLES ===============
    console.log('\n📋 READ EXAMPLES:');

    // Get all todos (all users)
    const allTodos = await todosManager.getAllTodos();
    console.log('Total todos (all users):', allTodos.length);

    // Get todos for specific user
    const user1Todos = await todosManager.getTodosByUser(user1);
    console.log('User 1 todos:', user1Todos.length);

    const user2Todos = await todosManager.getTodosByUser(user2);
    console.log('User 2 todos:', user2Todos.length);

    // Get todos by user and status
    const user1PendingTodos = await todosManager.getTodosByUserAndStatus(user1, 'pending');
    console.log('User 1 pending todos:', user1PendingTodos.length);

    // Get todos by user and priority
    const user1UrgentTodos = await todosManager.getTodosByUserAndPriority(user1, 'urgent');
    console.log('User 1 urgent todos:', user1UrgentTodos.length);

    // Get a specific todo by ID
    const specificTodo = await todosManager.getTodoById(todo1._id.toString());
    console.log('Found todo by ID:', specificTodo?.title, '- User:', specificTodo?.user_id);

    // Search todos for specific user
    const user1SearchResults = await todosManager.searchUserTodos(user1, 'project');
    console.log('User 1 search results for "project":', user1SearchResults.length);

    // Get due todos for specific user
    const user1DueTodos = await todosManager.getDueTodosForUser(user1);
    console.log('User 1 due/overdue todos:', user1DueTodos.length);

    // Get todos with pagination for specific user
    const user1PaginatedTodos = await todosManager.getTodosByUser(user1, {
      limit: 2,
      skip: 0,
      sort: { priority: 1, createdAt: -1 }
    });
    console.log('User 1 paginated todos (first 2):', user1PaginatedTodos.length);

    // =============== UPDATE EXAMPLES ===============
    console.log('\n✏️ UPDATE EXAMPLES:');

    // Update a todo
    const updatedTodo = await todosManager.updateTodo(todo2._id.toString(), {
      title: 'Review and test code',
      description: 'Review todos.js and write tests',
      priority: 'high'
    });
    console.log('Updated todo:', updatedTodo?.title);

    // Complete a todo
    const completedTodo = await todosManager.completeTodo(todo1._id.toString());
    console.log('Completed todo:', completedTodo?.title, '- Status:', completedTodo?.status);

    // Reopen a completed todo
    const reopenedTodo = await todosManager.reopenTodo(todo1._id.toString());
    console.log('Reopened todo:', reopenedTodo?.title, '- Status:', reopenedTodo?.status);

    // Update multiple todos
    const updatedCount = await todosManager.updateManyTodos(
      { priority: 'low' },
      { priority: 'medium' }
    );
    console.log('Updated todos count:', updatedCount);

    // =============== UTILITY EXAMPLES ===============
    console.log('\n📊 UTILITY EXAMPLES:');

    // Get statistics for all users
    const allStats = await todosManager.getTodoStats();
    console.log('All users todo statistics:', allStats);

    // Get statistics for specific user
    const user1Stats = await todosManager.getTodoStats(user1);
    console.log('User 1 todo statistics:', user1Stats);

    // Count todos for specific user
    const user1CompletedCount = await todosManager.countTodos({ status: 'completed' }, user1);
    console.log('User 1 completed todos count:', user1CompletedCount);

    // Count all todos for user
    const user1TotalCount = await todosManager.countTodos({}, user1);
    console.log('User 1 total todos count:', user1TotalCount);

    // =============== DELETE EXAMPLES ===============
    console.log('\n🗑️ DELETE EXAMPLES:');

    // Delete a specific todo
    const deleted = await todosManager.deleteTodo(todo2._id.toString());
    console.log('Todo deleted:', deleted);

    // Delete completed todos
    const deletedCompleted = await todosManager.deleteCompletedTodos();
    console.log('Deleted completed todos:', deletedCompleted);

    // Final count
    const finalCount = await todosManager.countTodos();
    console.log('Final todos count:', finalCount);

  } catch (error) {
    console.error('❌ Error in examples:', error);
  } finally {
    // Close connection
    await todosManager.close();
    console.log('\n✅ Examples completed!');
  }
}

// Run examples if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  todoExamples();
}

export default todoExamples;
