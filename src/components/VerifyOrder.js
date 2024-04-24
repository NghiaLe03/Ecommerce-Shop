import React, { useState, useEffect } from 'react'
import { Row, Col, Container, Button, Table, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

function VerifyOrder() {
    const currentDate = new Date().toISOString().split('T')[0];
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [address, setAddress] = useState("");
    const [mobile, setMobile] = useState("");
    const [orderDate, setOrderDate] = useState(currentDate);
    const [requestDate, setRequestDate] = useState("");
    const [email, setEmail] = useState("");
    const [orderId, setOrderId] = useState(0);

    const cart = JSON.parse(localStorage.getItem('cart'));

    const nav = useNavigate();



    const [user, setUser] = useState(() => {
        const existUser = JSON.parse(localStorage.getItem('user'));
        return existUser || null;
    })

    useEffect(() => {
        fetch("http://localhost:9999/orderDetails")
            .then(res => res.json())
            .then(result => {
                const orders = result.length;
                if (orders === 0) {
                    setOrderId(1);
                } else {
                    setOrderId(orders + 1);
                }
            })

        if (user !== null) {
            setFirstName(user.firstName);
            setLastName(user.lastName);
            setEmail(user.email);
        }
    }, [])


    const calculateTotal = () => {
        let total = 0;
        cart.forEach(item => {
            total += item.price * item.quantity;
        });
        total = total + (total * 8 / 100);
        return total;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const newForm = { firstName, lastName, address, mobile, requestDate, email };
        if (checkValid(newForm)) {
            const updatedOrderDetail = {
                id: orderId,
                orderDate,
                requestDate,
                customer: {
                    custId: user ? user.id : null,
                    firstName,
                    lastName,
                    address,
                    mobile,
                    email
                },
                products: cart.map(item => ({
                    pId: item.id,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                    tax: "8%",
                    discount: false
                }))
            };
            localStorage.setItem('orderDetail', JSON.stringify(updatedOrderDetail));
            fetch('http://localhost:9999/orderDetails', {
                method: 'POST',
                body: JSON.stringify(updatedOrderDetail),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
                .then(res => res.json())
                .then(result => {
                    const vnpAmount = calculateTotal();
                    const url = new URL('http://localhost:8888/order/create_payment_url');
                    url.searchParams.append('amount', vnpAmount);
                    window.location.href = url.toString();
                })
        }
    }

    const checkValid = ({ firstName, lastName, address, mobile, requestDate, email }) => {
        let msg = "";
        if (firstName === "") {
            msg += "Please enter First Name\n";
        }
        if (lastName.length === 0) {
            msg += "Please enter Last Name\n";
        }
        if (address.length === 0) {
            msg += "Please enter Address\n";
        }
        if (mobile.length === 0) {
            msg += "Please enter Phone Number\n";
        }
        if (requestDate.length === 0) {
            msg += "Please enter Request Date\n";
        }
        if (email.length === 0) {
            msg += "Please enter Email\n";
        }
        if (!mobile.match(/^\d{10}$/)) {
            msg += "Wrong Phone Number Format";
        }
        if (msg !== "") {
            alert(msg);
            return false;
        }
        return true;
    }


    return (
        <Container>
            <Row style={{ textAlign: "center" }}>
                <h1>Verify Order Detail</h1>
            </Row>
            <Row className='mt-3 mb-3'>
                <Row>
                    <span><Link to="/cart">Back to cart</Link></span>
                </Row>
                <Table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Image</th>
                            <th>Quantity</th>
                            <th>Total</th>
                        </tr>

                    </thead>
                    <tbody>
                        {
                            cart.map(c => (
                                <tr key={c.id}>
                                    <td>{c.id}</td>
                                    <td>{c.name}</td>
                                    <td>{c.price}</td>
                                    <td><img src={`/assets/${c.image}`} style={{ width: "100px" }}></img></td>
                                    <td>{c.quantity}</td>
                                    <td>{
                                        c.price * c.quantity
                                    }</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
                <Row style={{ textAlign: "end" }}>
                    <h3>VAT:8%</h3>
                    <h3>Total:{calculateTotal()}</h3>
                </Row>
            </Row>
            <Row>
                <h3>Shipping Detail</h3>
                <Form onSubmit={(e) => handleSubmit(e)}>
                    <Row className='mt-2'>
                        <Form.Group as={Col} sm={6}>
                            <Form.Label>First Name</Form.Label>
                            <Col sm={9}>
                                <Form.Control type='text' name='firstName' defaultValue={firstName} onChange={(e) => setFirstName(e.target.value)} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Col} sm={6}>
                            <Form.Label>Last Name</Form.Label>
                            <Col sm={9}>
                                <Form.Control name='lastName' defaultValue={lastName} type='text' onChange={(e) => setLastName(e.target.value)} />
                            </Col>
                        </Form.Group>
                    </Row>
                    <Row className='mt-2'>
                        <Form.Group as={Col} sm={6}>
                            <Form.Label>Address</Form.Label>
                            <Col sm={9}>
                                <Form.Control name='address' type='text' onChange={(e) => setAddress(e.target.value)} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Col} sm={6}>
                            <Form.Label>Mobile</Form.Label>
                            <Col sm={9}>
                                <Form.Control name='mobile' type='text' onChange={(e) => setMobile(e.target.value)} />
                            </Col>
                        </Form.Group>
                    </Row>
                    <Row className='mt-2'>
                        <Form.Group as={Col} sm={6}>
                            <Form.Label>Order Date</Form.Label>
                            <Col sm={9}>
                                <Form.Control name='orderDate' type='date' defaultValue={currentDate} disabled />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Col} sm={6}>
                            <Form.Label>Request Date</Form.Label>
                            <Col sm={9}>
                                <Form.Control name='requestDate' type='date' min={currentDate} onChange={(e) => setRequestDate(e.target.value)} />
                            </Col>
                        </Form.Group>
                    </Row>
                    <Row className='mt-2'>
                        <Form.Group as={Col} sm={6}>
                            <Form.Label>Email</Form.Label>
                            <Col sm={9}>
                                <Form.Control name='email' type='email' defaultValue={email} onChange={(e) => setEmail(e.target.value)} />
                            </Col>
                        </Form.Group>
                    </Row>
                    <Row className='mt-3'>
                        <Col>
                            <Button type='submit'>Check Out</Button>
                        </Col>
                    </Row>
                </Form>
            </Row>
        </Container>
    )
}

export default VerifyOrder