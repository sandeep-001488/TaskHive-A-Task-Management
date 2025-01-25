"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FaUserEdit } from "react-icons/fa";
import Loading from "@/components/Loader";

interface User {
  name: string;
  email: string;
  id:string;
}

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
  }, [router]);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await axios.get(
          "http://localhost:5000/api/user/profile",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUser(response.data.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

 const capitalizeFirstName = (str: string) => {
   const firstName = str.split(" ")[0];
   return firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
 };

  return (
    <div className="min-h-screen bg-gray-100 py-6 mt-0 flex items-center justify-center ">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 relative ">
        {user && (
          <button
            className="text-red-500 hover:text-red-700 font-medium absolute top-0 right-2"
            onClick={() => router.push(`/profile/${user?.id}/edit`)}
          >
            <FaUserEdit size={24} />
          </button>
        )}
        {user ? (
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2 text-teal-800">
              <span className="text-blue-800">Welcome,</span> {capitalizeFirstName(user.name)}
            </h1>

            <div className="bg-gray-50 p-4 rounded-lg mt-6">
              <p className="text-sm text-gray-600 mb-2">Email</p>
              <p className="text-lg font-semibold text-gray-900">
                {user.email}
              </p>
            </div>
          </div>
        ) : (
          // <div className="text-center">
          //   <p className="text-gray-500">Loading profile...</p>
          // </div>
          <Loading/>
        )}
      </div>
    </div>
  );
}
