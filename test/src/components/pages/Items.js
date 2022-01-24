import React from "react";
import { useSelector } from "react-redux";
import { Button } from "reactstrap";
export default function Items() {
  const isAdmin = useSelector((state) => state.authReducer.isAdmin);

  return <div>{isAdmin ? <Button>Add Item</Button> : " "}</div>;
}
