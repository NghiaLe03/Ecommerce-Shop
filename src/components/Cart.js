import React, { useState, useEffect } from 'react'
import { Row, Col, Card, Container, Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Cart() {

    const [cart, setCart] = useState(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart'));
        return storedCart ? storedCart.sort((a, b) => a.id - b.id) : [];
    });

    const calculateTotal = () => {
        let total = 0;
        cart.forEach(item => {
            total += item.price * item.quantity;
        });
        total = total + (total * 8 / 100);
        return total;
    };

    const handleClick = () => {
        localStorage.removeItem('cart');
        localStorage.removeItem('cartCount');
        window.location.reload();
    }

    return (
        <div className='mt-3 mb-3' style={{ minHeight: "600px" }}>
            <Row>
                <h1 style={{ textAlign: "center" }}>Cart</h1>
            </Row>

            {cart.length === 0 ? (<span style={{ textAlign: "center" }}>
                <h2>Cart Empty</h2>
                <p><Link to="/">Return to home page</Link></p>
            </span>) :
                <Row>

                    <div style={{ textAlign: "end" }}><Button onClick={() => handleClick()}>Clear cart</Button></div>
                    <p><Link to="/">Return to home page</Link></p>
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
                        <Col>
                            <Button><Link to="/cart/verify-order" style={{ textDecoration: "none", color: "white" }}>Verify Order</Link></Button>
                        </Col>

                    </Row>



                </Row>
            }



        </div>
    )
}

export default Cart