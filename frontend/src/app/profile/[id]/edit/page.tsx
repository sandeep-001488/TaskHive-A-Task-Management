// "use client";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import axios from "axios";
// import { toast } from "sonner";
// export default function EditProfile() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const router = useRouter();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (password !== confirmPassword) {
//       alert("Passwords do not match");
//       return;
//     }

//     const token = localStorage.getItem("token");
//     if (!token) {
//       router.push("/login");
//       return;
//     }

//     try {
//       await axios.put(
//         "https://task-hive-api.vercel.app/api/user/profile",
//         {
//           name: username,
//           password,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       toast("Profile has been updated successfully", {
//         style: {
//           backgroundColor: "blue",
//           color: "white",
//         },
//       });
//       router.push("/profile");
//     } catch (error) {
//       console.error("Error updating profile", error);
//       alert("Failed to update profile");
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
//       >
//         <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
//           Edit Profile
//         </h2>
//         <div className="mb-4">
//           <label
//             htmlFor="username"
//             className="block text-sm font-medium text-gray-600 mb-2"
//           >
//             Username
//           </label>
//           <input
//             type="text"
//             id="username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             placeholder="New Username"
//             className="w-full px-4 py-2 border text-teal-500 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//           />
//         </div>
//         <div className="mb-4">
//           <label
//             htmlFor="password"
//             className="block text-sm font-medium text-gray-600 mb-2"
//           >
//             New Password
//           </label>
//           <input
//             type="password"
//             id="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder="New Password"
//             className="w-full px-4 py-2 border text-teal-500 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//           />
//         </div>
//         <div className="mb-6">
//           <label
//             htmlFor="confirmPassword"
//             className="block text-sm font-medium text-gray-600 mb-2"
//           >
//             Confirm New Password
//           </label>
//           <input
//             type="password"
//             id="confirmPassword"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             placeholder="Confirm New Password"
//             className="w-full px-4 py-2 border text-teal-500 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//           />
//         </div>
//         <button
//           type="submit"
//           className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
//         >
//           Update Profile
//         </button>
//       </form>
//     </div>
//   );
// }
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";

export default function EditProfile() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [photo, setPhoto] = useState<File | null>(null); // <-- added
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    const formData = new FormData();
    formData.append("name", username);
    formData.append("password", password);
    if (photo) {
      formData.append("profilePhoto", photo); // <-- add photo
    }

    try {
      await axios.put(
        "https://task-hive-api.vercel.app/api/user/profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast("Profile has been updated successfully", {
        style: {
          backgroundColor: "blue",
          color: "white",
        },
      });
      router.push("/profile");
    } catch (error) {
      console.error("Error updating profile", error);
      alert("Failed to update profile");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
          Edit Profile
        </h2>
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-600 mb-2"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="New Username"
            className="w-full px-4 py-2 border text-teal-500 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-600 mb-2"
          >
            New Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="New Password"
            className="w-full px-4 py-2 border text-teal-500 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-600 mb-2"
          >
            Confirm New Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm New Password"
            className="w-full px-4 py-2 border text-teal-500 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="photo"
            className="block text-sm font-medium text-gray-600 mb-2"
          >
            Update Profile Photo
          </label>
          <input
            type="file"
            id="photo"
            accept="image/*"
            onChange={(e) => setPhoto(e.target.files?.[0] ?? null)}
            className="w-full px-4 py-2 text-teal-500 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
}
