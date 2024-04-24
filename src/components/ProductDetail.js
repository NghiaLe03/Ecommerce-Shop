import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

function ProductDetail({ data = [] }) {
    const [product, setProduct] = useState({});
    const [category, setCategory] = useState(data);
    const { id } = useParams();

    useEffect(() => {
        fetch(`http://localhost:9999/products/${id}`)
            .then(res => res.json())
            .then(result => setProduct(result));

    }, [id]);

    return (
        <Container fluid>
            <Row>
                <h2>Detail for {product.name}</h2>
            </Row>
            <Row>
                <Col sm={2}>ID:</Col>
                <Col sm={10}>{product.id}</Col>
            </Row>
            <Row>
                <Col sm={2}>Name:</Col>
                <Col sm={10}>{product.name}</Col>
            </Row>
            <Row>
                <Col sm={2}>Price:</Col>
                <Col sm={10}>{product.price}</Col>
            </Row>
            <Row>
                <Col sm={2}>Quantity:</Col>
                <Col sm={10}>{product.quantity}</Col>
            </Row>
            <Row>
                <Col sm={2}>Category:</Col>
                <Col sm={10}>{
                    category && category.find(c => parseInt(c.id) === parseInt(product.catId))?.name
                }</Col>
            </Row>
            <Row>
                <Col sm={2}>CreateAt:</Col>
                <Col sm={10}>{product.createAt}</Col>
            </Row>
            <Row>
                <Col sm={2}>Status:</Col>
                <Col sm={10}>{product.status ? "Còn hàng" : "Hết hàng"}</Col>
            </Row>
        </Container>
    )
}

export default ProductDetail