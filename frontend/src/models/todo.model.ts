// src/models/todo.model.ts

export interface Todo {
  id: string; // UUID
  userId: string; // UUID of the user
  title: string; // Title of the todo
  description?: string; // Optional description
  completed: boolean; // Completion status
  createdAt: Date; // Creation timestamp
  updatedAt: Date; // Last updated timestamp

  // Optional properties for frontend use
  isEditing?: boolean; // Indicates if the todo is being edited
  formattedCreatedAt?: string; // Formatted date string for display
  formattedUpdatedAt?: string; // Formatted date string for display
}
