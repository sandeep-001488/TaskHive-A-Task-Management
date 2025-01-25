"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import TodoItem from "@/components/TodoItem";

interface Todo {
  id: string;
  title: string;
  description:string;
  completed: boolean;
  createdAt:string;
  updatedAt:string;
}

export default function Todos() {
  
  const [todos, setTodos] = useState<Todo[]>([]); 
  const router = useRouter();
 
   useEffect(() => {
     const token = localStorage.getItem("token");

     if (!token) {
       router.push("/auth/login");
     }
   }, [router]);

useEffect(() => {
  const fetchTodos = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/todos", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTodos(response.data.data);
    } catch (error) {
      console.error("Error fetching todos", error);
    }
  };

  fetchTodos();
}, []);

 return (
   <div className="min-h-screen bg-gray-100 py-6 mt-16">
     <div className="max-w-4xl mx-auto">
       <div className="mb-6 text-center">
         <button
           onClick={() => router.push("/todos/create")}
           className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
         >
           Add Task
         </button>
       </div>
       <div className="space-y-4">
         {todos.length > 0 ? (
           todos.map((todo) => <TodoItem key={todo.id} todo={todo} />)
         ) : (
           <p className="text-center text-gray-500">No todos found.</p>
         )}
       </div>
     </div>
   </div>
 );
}

