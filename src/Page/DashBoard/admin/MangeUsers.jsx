
import React from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxios from "../../../Hooks/useAxios";


const ManageUsers = () => {
  const axiosSecure = useAxios(); 

  // Fetch all users 
  const {
    data: users = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users"); 
      console.log("Fetched users:", res.data); 
      return res.data;
    },
    retry: 1,
  });

  // Handle role update
  const handleUpdateRole = (userId, newRole) => {
    Swal.fire({
      title: `Change role to ${newRole}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/users/${userId}`, { role: newRole })
          .then(() => {
            refetch(); // Refetch users after update
            Swal.fire(
              "Updated!",
              "User role updated successfully.",
              "success"
            );
          })
          .catch((err) => {
            console.error(err);
            Swal.fire("Error", "Failed to update user role.", "error");
          });
      }
    });
  };

  if (isLoading)
    return <p className="text-center mt-10">Loading users...</p>;

  if (isError)
    return (
      <p className="text-center mt-10 text-red-500">
        Error fetching users: {error.message}
      </p>
    );

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6">Manage Users</h2>

      {users.length === 0 ? (
        <p className="text-center py-6 text-gray-500">No users found.</p>
      ) : (
        <table className="table-auto w-full border">
          <thead className="bg-gray-700 text-white">
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="text-center border-b">
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">{user.role}</td>
                <td className="px-4 py-2 flex justify-center gap-2">
                  {user.role !== "manager" && (
                    <button
                      className="px-2 py-1 bg-green-500 text-white rounded"
                      onClick={() => handleUpdateRole(user._id, "manager")}
                    >
                      Make Manager
                    </button>
                  )}
                  {user.role !== "suspended" && (
                    <button
                      className="px-2 py-1 bg-red-500 text-white rounded"
                      onClick={() => handleUpdateRole(user._id, "suspended")}
                    >
                      Suspend
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManageUsers;
