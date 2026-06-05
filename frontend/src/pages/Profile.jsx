import Navbar from "../components/Navbar";

function Profile() {

  const user =
    JSON.parse(
      localStorage.getItem("user")
    );




  const logoutHandler = () => {

    localStorage.removeItem(
      "user"
    );




    alert(
      "Logged Out"
    );




    window.location.href =
      "/login";
  };




  return (

    <div className="min-h-screen bg-gray-100">

      <Navbar />




      <div className="max-w-4xl mx-auto p-10">

        <div className="bg-white rounded-xl shadow-lg p-10">

          <h1 className="text-4xl font-bold mb-5">

            User Profile

          </h1>




          <h2 className="text-2xl mb-3">

            Name:
            {" "}
            {user?.name}

          </h2>




          <h2 className="text-2xl mb-5">

            Email:
            {" "}
            {user?.email}

          </h2>




          <button

            onClick={logoutHandler}

            className="bg-red-500 text-white px-5 py-3 rounded-lg"

          >

            Logout

          </button>

        </div>

      </div>

    </div>
  );
}

export default Profile;