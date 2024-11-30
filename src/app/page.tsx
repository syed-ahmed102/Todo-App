'use client';

import { useState } from 'react';
import { Todo } from './types/todo';
import TodoItem from './components/TodoItem';
import TodoInput from './components/TodoInput';

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: Math.random().toString(36).substring(7),
      text,
      completed: false,
      createdAt: new Date(),
    };
    setTodos([newTodo, ...todos]);
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Todo List</h1>
          <TodoInput onAdd={addTodo} />
          <div className="space-y-2">
            {todos.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
              />
            ))}
            {todos.length === 0 && (
              <p className="text-center text-gray-500 py-6">
                No todos yet. Add one to get started!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}