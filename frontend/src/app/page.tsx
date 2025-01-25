"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircle, Calendar } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-blue-50 to-white flex items-center">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-4xl font-bold text-teal-900 mb-4">
            Streamline Your Productivity
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Manage tasks effortlessly, stay organized, and boost your efficiency
            with our intuitive Todo App.
          </p>
          <div className="flex space-x-4">
            <Link href="/todos">
              <Button className="bg-blue-500 hover:bg-blue-600">
                Start Managing Todos
              </Button>
            </Link>
          </div>
          <div className="mt-8 flex space-x-4 text-gray-600">
            <div className="flex items-center space-x-2">
              <CheckCircle className="text-green-500" />
              <span>Organize Tasks</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="text-blue-500" />
              <span>Track Progress</span>
            </div>
          </div>
        </div>
        <div className="hidden md:block">
          <Image className="rounded-md object-contain" alt="home-img" height={400} width={600} src={"/hometodo.jpg"} />
        </div>
      </div>
    </div>
  );
}
