import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { ADMIN_API_END_POINT } from "../utils/constant.js";

function TotalUsers() {
  const [users, setUsers] = useState([]);

  const fetchUsers = useCallback(async () => {
    try {
      const res = await axios.get(`${ADMIN_API_END_POINT}/get/user`, {
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
        `${ADMIN_API_END_POINT}/user/${id}/status`,
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
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {users.length > 0 && (
            <>
              {/* Desktop / tablet table view */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50 text-gray-600">
                    <tr>
                      <th className="px-4 lg:px-6 py-3 whitespace-nowrap">
                        Name
                      </th>
                      <th className="px-4 lg:px-6 py-3 whitespace-nowrap">
                        Role
                      </th>
                      <th className="px-4 lg:px-6 py-3 whitespace-nowrap">
                        Email
                      </th>
                      <th className="px-4 lg:px-6 py-3 whitespace-nowrap">
                        Registered
                      </th>
                      <th className="px-4 lg:px-6 py-3 whitespace-nowrap">
                        Status
                      </th>
                      <th className="px-4 lg:px-6 py-3 text-right whitespace-nowrap">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((u) => (
                      <tr key={u._id} className="border-t border-gray-100">
                        <td className="px-4 lg:px-6 py-3 font-medium text-gray-800 whitespace-nowrap">
                          {u.fullname}
                        </td>
                        <td className="px-4 lg:px-6 py-3 text-gray-600 whitespace-nowrap">
                          {u.role}
                        </td>
                        <td className="px-4 lg:px-6 py-3 text-gray-600 max-w-[200px] truncate">
                          {u.email}
                        </td>
                        <td className="px-4 lg:px-6 py-3 text-gray-600 whitespace-nowrap">
                          {new Date(u.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-4 lg:px-6 py-3 whitespace-nowrap">
                          <span
                            className={
                              u.isActive ? "text-green-600" : "text-red-500"
                            }
                          >
                            {u.isActive ? "Active" : "Blocked"}
                          </span>
                        </td>
                        <td className="px-4 lg:px-6 py-3 text-right whitespace-nowrap">
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
              </div>

              {/* Mobile card view */}
              <div className="md:hidden divide-y divide-gray-100">
                {users.map((u) => (
                  <div key={u._id} className="p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-800">
                        {u.fullname}
                      </span>
                      <span
                        className={`text-xs font-medium ${
                          u.isActive ? "text-green-600" : "text-red-500"
                        }`}
                      >
                        {u.isActive ? "Active" : "Blocked"}
                      </span>
                    </div>

                    <div className="text-xs text-gray-500 space-y-1">
                      <p>
                        <span className="text-gray-400">Role: </span>
                        {u.role}
                      </p>
                      <p className="break-all">
                        <span className="text-gray-400">Email: </span>
                        {u.email}
                      </p>
                      <p>
                        <span className="text-gray-400">Registered: </span>
                        {new Date(u.createdAt).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="pt-2">
                      <button
                        onClick={() => toggleStatus(u._id)}
                        className={`text-sm font-medium hover:underline ${
                          u.isActive ? "text-red-500" : "text-[#0FA88A]"
                        }`}
                      >
                        {u.isActive ? "Block" : "Activate"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {users.length === 0 && (
            <p className="px-4 sm:px-6 py-6 text-center text-gray-400 text-sm">
              No users found
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default TotalUsers;
