import { useContext, useEffect } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { GlobalContext } from "../context/appState";

const AppData = () => {
  const { users, getData, deleteData } = useContext(GlobalContext);

  useEffect(() => {
    getData();
  });

  const handleDelete = (email) => {
    const newData = users.filter((item) => item.email !== email);
    deleteData(email, newData);
  };

  return (
    <Container>
      <Row>
        <Col>Name</Col>
        <Col>Email</Col>
        <Col>DOB</Col>
        <Col>Gender</Col>
        <Col>Address</Col>
        <Col>Action</Col>
      </Row>
      {users.map((item) => (
        <Row key={item._id}>
          <Col>{item.name}</Col>
          <Col>{item.email}</Col>
          <Col>{item.dob}</Col>
          <Col>{item.gender}</Col>
          <Col>{item.address}</Col>
          <Col>
            <Button
              outline
              color="danger"
              onClick={() => handleDelete(item.email)}
            >
              Delete
            </Button>
          </Col>
        </Row>
      ))}
    </Container>
  );
};

export default AppData;
