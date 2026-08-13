import { useState, useEffect, useCallback } from "react";
import axios from "axios";

function TotalUsers() {
  const [users, setUsers] = useState([]);

  const fetchUsers = useCallback(async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/admin/users`, {
        withCredentials: true,
      });
      setUsers(res.data.users); // matches backend's "users" key
    } catch (err) {
      console.error("Failed to fetch users", err);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const toggleStatus = async (id) => {
    try {
      await axios.patch(
        `http://localhost:8000/api/admin/users/${id}/status`,
        {},
        {
          withCredentials: true,
        },
      );
      fetchUsers();
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {users.length > 0 && (
            <table className="w-full  text-left text-sm">
              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Role</th>
                  <th className="px-6 py-3">Email</th>
                  <th className="px-6 py-3">Registered</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u._id} className="border-t border-gray-100">
                    <td className="px-6 py-3 font-medium text-gray-800">
                      {u.fullname}
                    </td>
                    <td className="px-6 py-3 text-gray-600">{u.role}</td>
                    <td className="px-6 py-3 text-gray-600">{u.email}</td>
                    <td className="px-6 py-3 text-gray-600">
                      {new Date(u.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-3">
                      <span
                        className={
                          u.isActive ? "text-green-600" : "text-red-500"
                        }
                      >
                        {u.isActive ? "Active" : "Blocked"}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-right space-x-2">
                      <button
                        onClick={() => toggleStatus(u._id)}
                        className={`font-medium hover:underline ${
                          u.isActive ? "text-red-500" : "text-[#0FA88A]"
                        }`}
                      >
                        {u.isActive ? "Block" : "Activate"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {users.length === 0 && (
            <p className="px-6 py-6 text-center text-gray-400 text-sm">
              No users found
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default TotalUsers;
