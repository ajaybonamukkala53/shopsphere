import Navbar from "../components/Navbar";

function AdminDashboard() {

  return (

    <div>

      <Navbar />



      <div
        className="
        p-10
        text-center
        "
      >

        <h1
          className="
          text-4xl
          font-bold
          "
        >
          Admin Dashboard
        </h1>



        <p
          className="
          mt-5
          text-lg
          "
        >
          Manage Products & Orders
        </p>

      </div>

    </div>
  );
}

export default AdminDashboard;