import React from "react";
import { Container, Navbar, Nav, NavDropdown, Row, Col, Accordion, Card, Button,Form} from 'react-bootstrap';
// console.log(localStorage.getItem("id"))
let UID = localStorage.getItem("id")
let group = localStorage.getItem("group")

export default (props) => (
    <Navbar bg="light" className="mb-5 py-4 pr-5 pl-5 align-items-center" expand="xl">
        <Navbar.Brand>
            <h2 style={{fontsize:"80px"}}>110 級交換學生搓湯圓系統</h2>
        </Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
            {/* <Nav>  
                <Nav.Item id="navbarItem">
                        <Nav.Link href="mainPage" >
                            <h3>首頁</h3>
                        </Nav.Link>
                </Nav.Item>
                <NavDropdown title="法文組" style={{fontSize:"1.8em"}}>
                    <NavDropdown.Item href="infoPage">
                        <h5>志願表</h5>
                    </NavDropdown.Item>
                    <NavDropdown.Item href="groupBulletin">
                        <h5>聊天室</h5>
                    </NavDropdown.Item>
                </NavDropdown>
            </Nav> */}
            <Nav>  
                <Nav.Item id="navbarItem">
                    <Nav.Link href={"/mainPage/"+UID}>
                        <h4>首頁</h4>
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item id="navbarItem">
                    <Nav.Link href={"/infoPage/"+group+"/"+UID}>
                        <h4>志願表</h4>
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item id="navbarItem">
                    <Nav.Link href="/">
                        <h4>登出</h4>
                    </Nav.Link>
                </Nav.Item>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
)
