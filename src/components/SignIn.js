import React, { useState, useEffect } from 'react'
import { Card, Row, Col, CardBody, Container, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function SignIn() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState([]);
    const nav = useNavigate();

    useEffect(() => {
        fetch("http://localhost:9999/accounts")
            .then(res => res.json())
            .then(result => setUser(result))
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newUser = { email, password };
        if (checkValid(newUser)) {
            const existUser = user.find(u => u.email === email && u.password === password);
            localStorage.setItem('user', JSON.stringify(existUser));
            alert("Login successful");
            nav("/");
        }
    }

    const checkValid = ({ email, password }) => {
        let msg = "";
        if (email.length === 0) {
            msg += "Please enter email\n";
        }
        if (password.length === 0) {
            msg += "Please enter password\n";
        }
        if (user.find(u => u.password !== password && u.email === email)) {
            msg += "Wrong email or password!\n";
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
                        Sign In
                    </h5>
                    <Form onSubmit={(e) => handleSubmit(e)}>
                        <Form.Group as={Row} className="mb-4" controlId="email">
                            <Col sm={2}>
                                <Form.Label>Email*</Form.Label>
                            </Col>
                            <Col sm={10}>
                                <Form.Control type="email" placeholder="Enter email" name='email' onChange={(e) => setEmail(e.target.value)} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-4" controlId="password">
                            <Col sm={2}>
                                <Form.Label>Password*</Form.Label>
                            </Col>
                            <Col sm={10}>
                                <Form.Control type="password" placeholder="Enter password" name='password' onChange={(e) => setPassword(e.target.value)} />
                            </Col>
                        </Form.Group>
                        <Row className='justify-content-center'>
                            <Button variant="primary" className='mb4 w-auto' type="submit">
                                Login
                            </Button>

                        </Row>
                    </Form>

                </CardBody>
            </Card>

        </Container>
    )
}

export default SignIn