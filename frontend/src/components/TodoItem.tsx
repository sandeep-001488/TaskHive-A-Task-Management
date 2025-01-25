"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface TodoItemProps {
  todo: {
    id: string;
    title: string;
    description: string;
    createdAt: string;
    updatedAt: string;
  };
}

export default function TodoItem({ todo }: TodoItemProps) {
  const router = useRouter();
  const [taskCompleted, setTaskCompleted] = useState(() => {
    const savedState = localStorage.getItem(`taskCompleted-${todo.id}`);
    return savedState ? JSON.parse(savedState) : false;
  });

  useEffect(() => {
    localStorage.setItem(
      `taskCompleted-${todo.id}`,
      JSON.stringify(taskCompleted)
    );

    if (taskCompleted) {
      toast("Congratulations!! Your task is completed", {
        style: {
          backgroundColor: "blue",
          color: "white",
        },
      });
    } else {
      toast("You can now update your task", {
        style: {
          backgroundColor: "blue",
          color: "white",
        },
      });
    }
  }, [taskCompleted, todo.id]);

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `https://task-hive-api.vercel.app/api/todos/${todo.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast("Your task is deleted successfully", {
        style: {
          backgroundColor: "blue",
          color: "white",
        },
      });
      localStorage.removeItem(`taskCompleted-${todo.id}`);
      router.replace("/todos");
    } catch (error) {
      console.error("Error deleting todo", error);
    }
  };

  return (
    <div className="flex gap-3 w-full items-center">
      <div
        className={`rounded-full w-8 h-8 border-2 cursor-pointer border-red-500 ${
          taskCompleted && "bg-blue-200 border-1 border-red-200"
        }`}
        onClick={() => setTaskCompleted(!taskCompleted)}
      ></div>
      <div className="relative shadow-md rounded-lg p-6 bg-blue-50 w-full">
        <div className="absolute top-0 right-0 space-x-2">
          <button
            onClick={() => router.push(`/todos/${todo.id}/edit`)}
            className={`text-blue-500 hover:text-blue-700 font-medium ${
              taskCompleted && "hidden"
            }`}
          >
            <FaEdit size={24} />
          </button>
          <button
            onClick={handleDelete}
            className="text-red-500 hover:text-red-700 font-medium"
          >
            <MdDeleteForever size={24} />
          </button>
        </div>
        <h1
          className={`absolute top-1 left-5 text-teal-900 font-semibold text-2xl ${
            taskCompleted && "opacity-50 line-through"
          }`}
        >
          {todo?.title}
        </h1>
        <p
          className={`text-red-500 ml-0 mt-4 font-semibold ${
            taskCompleted && "opacity-50 line-through"
          }`}
        >
          {todo?.description}
        </p>
        <div className="flex gap-6 absolute bottom-0 right-2 mt-4">
          <p className={`text-blue-500 ${taskCompleted && "opacity-50"}`}>
            <span className="text-teal-700">Updated On:</span>{" "}
            {new Date(todo.updatedAt).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}
