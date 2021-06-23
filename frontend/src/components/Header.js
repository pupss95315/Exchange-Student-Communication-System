import React from "react";
import { Container, Navbar, Nav, NavDropdown, Row, Col, Accordion, Card, Button,Form} from 'react-bootstrap';

export default (props) => (
    <Navbar bg="dark" variant="dark" className="mb-5">
        <Navbar.Brand >110 級交換學生搓湯圓系統</Navbar.Brand>
        <Nav>  
            <Nav.Item>
                    <Nav.Link href="mainPage" >首頁</Nav.Link>
            </Nav.Item>
            <NavDropdown title="法文組" id="navbarScrollingDropdown">
                <NavDropdown.Item href="infoPage">志願表</NavDropdown.Item>
                <NavDropdown.Item href="groupBulletin">聊天室</NavDropdown.Item>
            </NavDropdown>
            <Nav.Item>
                    <Nav.Link href="/">登出</Nav.Link>
            </Nav.Item>
        </Nav>
    </Navbar>
)
