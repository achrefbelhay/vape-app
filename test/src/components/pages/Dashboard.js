import React from "react";
import { useSelector } from "react-redux";

function Dashboard() {
  const user = useSelector((state) => state.authReducer.data);
  return (
    <div>
      <h1>{`Bonjour ${user.name}`}</h1>
    </div>
  );
}

export default Dashboard;
