import React, { useEffect, useState } from 'react'
import { Row, Col, Card, Container, Pagination, Button } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';

export default function ProductList() {

    const [products, setProducts] = useState([]);
    const { catId } = useParams();

    const [cartCount, setCartCount] = useState(() => {
        const storedCount = JSON.parse(localStorage.getItem('cartCount'));
        return storedCount || 0;
    });
    const [cart, setCart] = useState(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart'));
        return storedCart || [];
    });
    // localStorage.clear();


    const chunkArray = (array, size) => {
        const chunkedArr = [];
        const numOfChunks = Math.ceil(array.length / size);
        for (let i = 0; i < numOfChunks; i++) {
            chunkedArr.push(array.slice(i * size, (i + 1) * size));
        }
        return chunkedArr;
    };

    const chunkedData = chunkArray(products, 4);

    useEffect(() => {
        fetch(catId ? `http://localhost:9999/products/?catId=${catId}` : "http://localhost:9999/products")
            .then(res => res.json())
            .then(result => {
                let searchResult = [];
                if (catId) {
                    searchResult = result.filter(p => parseInt(p.catId) === parseInt(catId));
                } else {
                    searchResult = result;
                }
                setProducts(searchResult);
            });
    }, [catId]);

    useEffect(() => {
        localStorage.setItem('cartCount', JSON.stringify(cartCount));
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cartCount, cart]);

    const handleClick = (id) => {
        const product = products.find(d => d.id === id);
        let storedCart = cart;
        let updatedCart = [];

        const existingProductIndex = storedCart.findIndex(item => item.id === product.id);

        if (existingProductIndex !== -1) {
            // If the product already exists in the cart, update its quantity
            storedCart[existingProductIndex].quantity = (storedCart[existingProductIndex].quantity || 1) + 1;
            updatedCart = [...storedCart];
        } else {
            // If the product is not in the cart, add it with quantity 1
            setCartCount(prevCount => prevCount + 1);
            product.quantity = 1; // Initialize quantity attribute
            updatedCart = [...storedCart, product];
        }

        // Update cart state
        setCart(updatedCart);

    }

    return (

        <div className='mt-3 mb-3'>
            <Row>
                <h3 style={{ textAlign: "end" }}>
                    Cart:  <Link to="/cart">{cartCount}</Link>
                </h3>
            </Row>
            {chunkedData.map((chunk, rowIndex) => (
                <Row key={rowIndex}>
                    {chunk.map((c, colIndex) => (
                        <Col key={colIndex} xs={12} sm={3} className='pb-3' >
                            <Card className='m-1'>
                                <Card.Img variant="top" src={`/assets/${c.image}`} alt="hihi" style={{ width: "100%" }} className='p-3' />
                                <Card.Body style={{ textAlign: "center" }}>
                                    <Card.Title className='text-center'><Link to={`/product/${c.id}`}>{c.name}</Link></Card.Title>
                                    <Card.Text className='text-center'>{c.price}</Card.Text>
                                    <Button variant='success' onClick={() => handleClick(c.id)}>Add to Cart</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                    {chunk.length < 4 && (
                        Array.from({ length: 4 - chunk.length }).map((_, i) => (
                            <Col key={`empty_${i}`} sm={3}></Col>
                        ))
                    )}
                </Row>
            ))}

            <Row className='mt-3'>
                <Pagination style={{ justifyContent: 'center' }}>
                    {[1, 2, 3, 4].map(pageNumber => (
                        <Pagination.Item key={pageNumber}>{pageNumber}</Pagination.Item>
                    ))}
                </Pagination>
            </Row>
        </div>

    )
}

function Category({ data = [] }) {
    return (
        <ul className='mb-5'>
            {
                data.map(c => (
                    <li key={c.id}><Link to={`/products/category/${c.id}`}>{c.name}</Link></li>
                ))
            }
        </ul>
    );
}

export {
    Category
};