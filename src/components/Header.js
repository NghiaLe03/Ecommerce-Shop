import React, { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Header() {
    const [user, setUser] = useState(() => {
        const existUser = JSON.parse(localStorage.getItem('user'));
        return existUser || null;
    })

    const handleSignOut = () => {
        localStorage.clear();
        window.location.reload();
    }

    return (
        <Container>
            <Row>
                <h1 style={{textAlign:"center"}}>Header</h1>
            </Row>
            <Row style={{ textAlign: "end", minHeight: "150px", alignContent: "end" }}>
                {user ? (<span style={{ display: "inline-block" }}>
                    Hello {user.email}
                    <Link style={{ marginLeft: "10px" }} onClick={() => handleSignOut()}>Sign Out</Link>
                </span>) : (<span style={{ display: "inline-block" }}>
                    <Link to={"/auth/sign-up"} style={{ marginRight: "10px" }}>Sign Up</Link>
                    <Link to={"/auth/sign-in"}>Sign In</Link>
                </span>)}
            </Row>
        </Container>
    )
}

export default Header