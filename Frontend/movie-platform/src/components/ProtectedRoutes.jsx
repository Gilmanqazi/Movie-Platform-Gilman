import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  // Redux se loading state bhi nikalo
  const { user, loading } = useSelector((state) => state.auth);

  // Jab tak backend se user ka status confirm nahi hota, loading dikhao
  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Agar loading khatam ho gayi aur user nahi mila, tabhi login par bhejo
  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;