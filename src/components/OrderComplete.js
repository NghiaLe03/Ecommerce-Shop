import React, { useEffect, useState } from 'react';
import emailjs from "@emailjs/browser";
import { Table, Row, Col, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';


function OrderComplete() {
    const [orderDetail, setOrderDetail] = useState(() => {
        const existOrderDetail = JSON.parse(localStorage.getItem('orderDetail'));
        return existOrderDetail || {};
    });
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        emailjs.init("kwWOgcF4mPgtYh93G");
        const sendMail = async () => {
            const serviceId = "service_06zjc1s";
            const templateId = "template_j1lu5he";
            try {
                setLoading(true);
                await emailjs.send(serviceId, templateId, {
                    recipient: orderDetail.customer.email,
                    firstName: orderDetail.customer.firstName,
                    lastName: orderDetail.customer.lastName,
                    address: orderDetail.customer.address,
                    mobile: orderDetail.customer.mobile,
                    orderDate: orderDetail.orderDate,
                    requestDate: orderDetail.requestDate,
                    products: orderDetail.products
                });
            } catch (error) {
                console.error('Error sending email:', error);
            } finally {
                setLoading(false);
                localStorage.removeItem('orderDetail');
                localStorage.removeItem('cart');
                localStorage.removeItem('cartCount');
            }
        }
        sendMail();

    }, []);

    return (
        <Container style={{ textAlign: "center", minHeight:"500px" }}>
            <Row>
                <h1>Order Complete</h1>
            </Row>
            <Row>
                <h3>Please check your email for detail information of your order</h3>
                <Link to="/">Return to home page</Link>
            </Row>
        </Container>
    )
}

export default OrderComplete