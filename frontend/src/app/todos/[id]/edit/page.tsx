"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";

export default function EditTodo() {
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();
  const [todo, setTodo] = useState({
    title: "",
    description: "",
    completed: false,
  });

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get(
          `http://localhost:5000/api/todos/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setTodo(data.data);
      } catch (error) {
        console.error("Error fetching todo:", error);
      }
    };

    if (id) {
      fetchTodo();
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5000/api/todos/${id}`,
        { id, ...todo },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
       toast("Todo has been updated", {
         style: {
           backgroundColor: "blue",
           color: "white",
         },
       });
      router.push("/todos");
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Edit Todo</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-bold mb-2">Title</label>
            <input
              type="text"
              value={todo.title}
              onChange={(e) => setTodo({ ...todo, title: e.target.value })}
              className="w-full px-3 py-2 border text-teal-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter todo title"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2">
              Description
            </label>
            <textarea
              value={todo.description}
              onChange={(e) =>
                setTodo({ ...todo, description: e.target.value })
              }
              className="w-full px-3 py-2 border text-teal-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter todo description"
              rows={4}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Update Todo
          </button>
          <button
            type="button"
            onClick={() => router.push("/todos")}
            className="w-full bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition duration-300 mt-2"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}
