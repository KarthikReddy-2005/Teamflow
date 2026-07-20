import React, { useEffect, useState } from "react";
import { getUserName } from "../services/authService";

const Dashboard = () => {
  const [name, setName] = useState("");

  useEffect(() => {
    async function fetchUserName() {
      try {
        const result = await getUserName();
        setName(result.username);
      } catch (error) {
        console.error(error);
      }
    }
    fetchUserName();
  }, []);

  return <h1>hello {name}</h1>;
};

export default Dashboard;
