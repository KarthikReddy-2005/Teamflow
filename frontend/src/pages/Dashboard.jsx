import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();
  return (
    <>
      <h1>hello {user?.username}</h1>
    </>
  );
};

export default Dashboard;
