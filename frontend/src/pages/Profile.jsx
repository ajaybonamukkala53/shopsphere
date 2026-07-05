import Navbar from "../components/Navbar";
import { FaUser, FaEnvelope, FaSignOutAlt, FaShieldAlt } from "react-icons/fa";

function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));

  const logoutHandler = () => {
    localStorage.removeItem("user");
    alert("Logged Out Successfully ✅");
    window.location.href = "/login";
  };

  return (
    <div className="bg-flipkartBg dark:bg-gray-950 min-h-screen text-black dark:text-white transition-colors duration-300">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 py-10">
        <div className="bg-white dark:bg-gray-900 rounded-sm shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden flex flex-col md:flex-row">
          
          {/* Left profile menu visual */}
          <div className="bg-flipkartBlue text-white p-8 md:w-1/3 flex flex-col items-center justify-center text-center gap-4 border-b md:border-b-0 md:border-r border-gray-100 dark:border-gray-800">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center text-3xl font-black shadow-inner">
              {user?.name ? user.name.charAt(0).toUpperCase() : <FaUser />}
            </div>
            <div>
              <h2 className="text-lg font-black">{user?.name}</h2>
              <span className="text-[10px] bg-white/25 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                {user?.role || "Customer"}
              </span>
            </div>
          </div>

          {/* Details dashboard */}
          <div className="p-8 flex-grow space-y-6">
            <h1 className="text-xl md:text-2xl font-black text-gray-800 dark:text-gray-100 border-b border-gray-100 dark:border-gray-800 pb-3 flex items-center gap-2">
              <FaShieldAlt className="text-flipkartBlue" />
              Account Information
            </h1>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <FaUser className="text-gray-400" size={16} />
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Full Name</p>
                  <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">{user?.name}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <FaEnvelope className="text-gray-400" size={16} />
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Email Address</p>
                  <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">{user?.email}</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex justify-end">
              <button
                onClick={logoutHandler}
                className="bg-red-500 hover:bg-red-600 text-white font-bold text-xs uppercase tracking-wider py-3 px-6 shadow transition-colors duration-200 cursor-pointer flex items-center gap-1.5"
              >
                <FaSignOutAlt />
                <span>Log Out</span>
              </button>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

export default Profile;