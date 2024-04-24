import React, { useState, useEffect } from 'react'
import { Card, Row, Col, CardBody, Container, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function SignUp() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [id, setId] = useState(0);
  const [user, setUser] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    fetch("http://localhost:9999/accounts")
      .then(res => res.json())
      .then(result => {
        const existUserId = result.length;
        if (existUserId === 0) {
          setId(1);
        } else {
          setId(existUserId + 1);
        }
        setUser(result);
      })
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = { id, email, firstName, lastName, password };
    if (checkValid(newUser)) {
      fetch("http://localhost:9999/accounts", {
        method: 'POST',
        body: JSON.stringify(newUser),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then(res => res.json())
        .then(result => {
          localStorage.setItem('user', JSON.stringify(newUser));
          alert("Create account successful");
          nav("/");
        })

    }
  }

  const checkValid = ({ id, email, firstName, lastName, password }) => {
    let msg = "";
    if (email.length === 0) {
      msg += "Please enter Email\n";
    }
    if (password.length === 0) {
      msg += "Please enter Password\n";
    }
    if (firstName.length === 0) {
      msg += "Please enter First Name\n";
    }
    if (lastName.length === 0) {
      msg += "Please enter Last Name\n";
    }
    if (user.find(u => u.email === email)) {
      msg += "User already exist!\n";
    }
    if (msg !== "") {
      alert(msg);
      return false;
    }
    return true;
  }

  return (
    <Container className='p-3 my-5 d-flex flex-column w-50'>
      <Card>
        <CardBody>
          <h5 className='text-center'>
            Create new account
          </h5>
          <Form onSubmit={(e) => handleSubmit(e)}>
            <Form.Group as={Row} className="mb-4" controlId="email">
              <Col sm={3}>
                <Form.Label>Email*</Form.Label>
              </Col>
              <Col sm={9}>
                <Form.Control type="email" placeholder="Enter email" name='email' onChange={(e) => setEmail(e.target.value)} />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-4" controlId="password">
              <Col sm={3}>
                <Form.Label>Password*</Form.Label>
              </Col>
              <Col sm={9}>
                <Form.Control type="password" placeholder="Enter password" name='password' onChange={(e) => setPassword(e.target.value)} />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-4" controlId="email">
              <Col sm={3}>
                <Form.Label>First Name*</Form.Label>
              </Col>
              <Col sm={9}>
                <Form.Control type="text" placeholder="Enter First Name" name='firstName' onChange={(e) => setFirstName(e.target.value)} />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-4" controlId="email">
              <Col sm={3}>
                <Form.Label>Last Name*</Form.Label>
              </Col>
              <Col sm={9}>
                <Form.Control type="text" placeholder="Enter Last Name" name='lastName' onChange={(e) => setLastName(e.target.value)} />
              </Col>
            </Form.Group>
            <Row className='justify-content-center'>
              <Button variant="primary" className='mb4 w-auto' type="submit">
                Create
              </Button>

            </Row>
          </Form>

        </CardBody>
      </Card>

    </Container>
  )
}

export default SignUp