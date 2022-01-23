import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  NavLink,
} from "reactstrap";
import { registerUser } from "../../redux/actions/authActions";

function RegisterModal() {
  const [modal, setModal] = useState(false);
  const toggle = () => {
    setModal(!modal);
  };
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const handleRegister = () => {
    const newUser = { name, lastName, email, password };
    dispatch(registerUser(newUser));
    history.push("/dashboard");
    setEmail("");
    setName("");
    setLastName("");
    setPassword("");
  };

  return (
    <div style={{ padding: "0 15px" }}>
      <NavLink onClick={toggle} href="#">
        Register
      </NavLink>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Register</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                type="text"
                name="name"
                value={name}
                id="name"
                placeholder="Name"
                className="mb-3"
                onChange={(e) => setName(e.target.value)}
              />

              <Label for="name">Last Name</Label>
              <Input
                type="text"
                name="lastName"
                id="lastName"
                value={lastName}
                placeholder="Last Name"
                className="mb-3"
                onChange={(e) => setLastName(e.target.value)}
              />
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                value={email}
                id="email"
                placeholder="email"
                className="mb-3"
                onChange={(e) => setEmail(e.target.value)}
              />
              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                value={password}
                id="password"
                placeholder="Password"
                className="mb-3"
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                color="dark"
                style={{ marginTop: "2rem" }}
                block
                onClick={handleRegister}
              >
                Register
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default RegisterModal;
