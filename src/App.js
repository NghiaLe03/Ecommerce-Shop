import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import Header from "./components/Header";
import Footer from "./components/Footer";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import ProductList, { Category } from "./components/ProductList";
import ProductDetail from "./components/ProductDetail";
import Cart from "./components/Cart";
import VerifyOrder from "./components/VerifyOrder";
import OrderComplete from "./components/OrderComplete";

function App() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:9999/categories")
      .then(res => res.json())
      .then(result => setCategories(result));

  }, []);

  return (
    <BrowserRouter>
      <Container>
        <Routes>
          <Route path="/auth/sign-up" element={
            <>
              <SignUp />
            </>
          } />
          <Route path="/auth/sign-in" element={
            <>
              <SignIn />
            </>
          } />
          <Route path="/" element={
            <>
              <Header />
              <Row style={{ minHeight: "500px" }}>
                <Col sm={2}>
                  <Category data={categories} />
                </Col>
                <Col sm={10}>
                  <ProductList />
                </Col>
              </Row>
              <Footer />
            </>
          } />
          <Route path="/order/success" element={
            <>
              <Header />
              <OrderComplete />
              <Footer />
            </>
          } />
          <Route path="/products/category/:catId" element={
            <>
              <Header />
              <Row style={{ minHeight: "500px" }}>
                <Col sm={2}>
                  <Category data={categories} />
                </Col>
                <Col sm={10}>
                  <ProductList />
                </Col>
              </Row>
              <Footer />
            </>
          } />
          <Route path="/product/:id" element={
            <>
              <Header />
              <Row style={{ minHeight: "500px" }}>
                <ProductDetail data={categories} />
              </Row>
              <Footer />
            </>
          } />
          <Route path="/cart" element={
            <>
              <Cart />
            </>
          } />
          <Route path="/cart/verify-order" element={
            <>
              <VerifyOrder />
            </>
          } />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
