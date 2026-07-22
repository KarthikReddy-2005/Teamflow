import { useOutletContext } from "react-router-dom";

const Dashboard = () => {
  const user = useOutletContext();
  return (
    <>
      <h1>hello {user?.username}</h1>
    </>
  );
};

export default Dashboard;
