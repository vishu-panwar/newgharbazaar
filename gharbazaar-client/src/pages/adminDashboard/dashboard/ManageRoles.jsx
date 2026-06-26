import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Search, UserCog, Loader2, ShieldCheck, Briefcase, User as UserIcon } from "lucide-react";

// Roles this panel is allowed to assign.
// label = shown in UI, value = sent to backend, icon/color = visual cue.
const ROLES = [
  { value: "admin", label: "Admin", icon: ShieldCheck, color: "indigo" },
  { value: "employee", label: "Employee", icon: Briefcase, color: "emerald" },
  { value: "client", label: "Client", icon: UserIcon, color: "amber" },
];

const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function ManageRoles() {
  const [query, setQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const [results, setResults] = useState([]);
  const [searchedOnce, setSearchedOnce] = useState(false);
  const [updatingId, setUpdatingId] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setSearching(true);
    setSearchedOnce(true);

    try {
      // Expecting: GET /admin/users/search?query=<email-or-phone-or-name>
      // -> { success: true, data: [{ _id, fullName, email, phoneNumber, role }] }
      const res = await axios.get(`${BASE_URL}/admin/users/search`, {
        params: { query: query.trim() },
        withCredentials: true,
      });
      setResults(res?.data?.data || []);
    } catch (err) {
      console.error("User search failed", err);
      toast.error(
        err?.response?.data?.message || "Could not search users. Check the API endpoint."
      );
      setResults([]);
    } finally {
      setSearching(false);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    setUpdatingId(userId);
    try {
      // Expecting: PATCH /admin/users/:id/role  body: { role: "admin" | "employee" | "client" }
      // -> { success: true, message: "Role updated", user: {...} }
      await axios.patch(
        `${BASE_URL}/admin/users/${userId}/role`,
        { role: newRole },
        { withCredentials: true }
      );

      setResults((prev) =>
        prev.map((u) => (u._id === userId ? { ...u, role: newRole } : u))
      );

      toast.success(`Role updated to ${newRole}`);
    } catch (err) {
      console.error("Role update failed", err);
      toast.error(
        err?.response?.data?.message || "Could not update role. Check the API endpoint."
      );
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="flex flex-col gap-6 pb-8 w-full">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight flex items-center gap-3">
          <span className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <UserCog size={22} />
          </span>
          Manage Roles
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Search for a user and assign them the Admin, Employee, or Client role.
        </p>
      </div>

      {/* SEARCH BAR */}
      <form
        onSubmit={handleSearch}
        className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 shadow-sm flex flex-col sm:flex-row gap-3"
      >
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, email, or phone number..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition"
          />
        </div>
        <button
          type="submit"
          disabled={searching || !query.trim()}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-bold rounded-xl shadow-sm transition-colors"
        >
          {searching ? <Loader2 size={16} className="animate-spin" /> : <Search size={16} />}
          Search
        </button>
      </form>

      {/* RESULTS */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        {!searchedOnce && (
          <div className="p-10 text-center text-sm text-gray-500">
            Search for a user above to view and change their role.
          </div>
        )}

        {searchedOnce && !searching && results.length === 0 && (
          <div className="p-10 text-center">
            <p className="text-sm font-semibold text-gray-700">No users found</p>
            <p className="text-xs text-gray-500 mt-1">
              Try a different name, email, or phone number.
            </p>
          </div>
        )}

        {results.length > 0 && (
          <div className="divide-y divide-gray-100">
            {results.map((u) => (
              <div
                key={u._id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 sm:p-5"
              >
                {/* USER INFO */}
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 text-white flex items-center justify-center font-bold shrink-0">
                    {u.fullName?.trim()?.charAt(0)?.toUpperCase() || "U"}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-gray-900 truncate">{u.fullName || "Unnamed user"}</p>
                    <p className="text-xs text-gray-500 truncate">
                      {u.email || u.phoneNumber || "No contact info"}
                    </p>
                  </div>
                </div>

                {/* ROLE PICKER */}
                <div className="flex items-center gap-2 flex-wrap">
                  {ROLES.map((r) => {
                    const RoleIcon = r.icon;
                    const isCurrent = u.role === r.value;
                    const isUpdating = updatingId === u._id;

                    return (
                      <button
                        key={r.value}
                        disabled={isUpdating || isCurrent}
                        onClick={() => handleRoleChange(u._id, r.value)}
                        className={`
                          inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold
                          border transition-colors duration-150
                          disabled:cursor-not-allowed
                          ${
                            isCurrent
                              ? r.color === "indigo"
                                ? "bg-indigo-600 text-white border-indigo-600"
                                : r.color === "emerald"
                                ? "bg-emerald-600 text-white border-emerald-600"
                                : "bg-amber-500 text-white border-amber-500"
                              : "bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                          }
                        `}
                      >
                        {isUpdating ? (
                          <Loader2 size={14} className="animate-spin" />
                        ) : (
                          <RoleIcon size={14} />
                        )}
                        {r.label}
                        {isCurrent && !isUpdating && (
                          <span className="ml-0.5 text-[10px] uppercase tracking-wide opacity-80">
                            current
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* API NOTE — remove once wired to real endpoints */}
      <div className="bg-amber-50 border border-dashed border-amber-200 rounded-xl p-4 text-xs text-amber-800 leading-relaxed">
        <strong className="font-bold">Wiring note:</strong> this page calls{" "}
        <code className="bg-amber-100 px-1.5 py-0.5 rounded">GET /admin/users/search?query=</code>{" "}
        and{" "}
        <code className="bg-amber-100 px-1.5 py-0.5 rounded">PATCH /admin/users/:id/role</code>.
        Update the routes/controllers (or the URLs in this file) to match your actual backend.
      </div>
    </div>
  );
}