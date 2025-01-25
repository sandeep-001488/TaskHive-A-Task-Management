
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "./ui/button";

export default function TodoNavbar() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [openPopOver, setOpenPopOver] = useState(false);

  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    };

    checkLoginStatus();

    window.addEventListener("storage", checkLoginStatus);

    return () => {
      window.removeEventListener("storage", checkLoginStatus);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/auth/logout",
        {},
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      localStorage.removeItem("token");
      setIsLoggedIn(false);
      router.push("/auth/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 h-16 flex items-center shadow-sm bg-white z-50">
      <div className="container mx-auto flex items-center justify-between px-4">
        <div className="flex items-center">
          <Link href="/" className="bg-blue-50 rounded-xl">
            <Image
              src="/todo.png"
              alt="Todo App Logo"
              width={80}
              height={50}
              className="object-contain"
            />
          </Link>
        </div>

        {isLoggedIn ? (
          <>
            <Popover open={openPopOver} onOpenChange={setOpenPopOver}>
              <PopoverTrigger>
                <Button className="text-white bg-blue-500 font-semibold hover:text-white hover:bg-teal-900">
                  Controls
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-44">
                <ul className="flex flex-col gap-2">
                  <Link
                    href="/profile"
                    className="cursor-pointer text-teal-900 font-semibold hover:bg-slate-100 p-2 rounded-lg text-sm"
                    onClick={() => setOpenPopOver(false)}
                  >
                    Profile
                  </Link>
                  <Link
                    href="/todos"
                    className="cursor-pointer text-teal-900 font-semibold hover:bg-slate-100 p-2 rounded-lg text-sm"
                    onClick={() => setOpenPopOver(false)}
                  >
                    Tasks
                  </Link>
                  <li
                    className="cursor-pointer hover:bg-slate-100 p-2 rounded-lg"
                    onClick={() => setOpenPopOver(false)}
                  >
                    <Button className="bg-red-500" onClick={handleLogout}>
                      Logout
                    </Button>
                  </li>
                </ul>
              </PopoverContent>
            </Popover>
          </>
        ) : (
          <>
            <Link
              href="/auth/login"
              className="cursor-pointer hover:bg-slate-100 p-2 rounded-lg text-sm"
              onClick={() => setOpenPopOver(false)}
            >
              <Button className="text-blue-600 bg-gray-50 font-semibold">
                Login
              </Button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}