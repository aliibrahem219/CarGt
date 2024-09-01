import AdminSidebar from "./AdminSidebar";
import AdminMain from "./AdminMain";
import "./admin.css";
const AdminDashBoard = () => {
  return (
    <section className="admin-dashboard">
      <AdminSidebar />
      <AdminMain />
    </section>
  );
};

export default AdminDashBoard;
