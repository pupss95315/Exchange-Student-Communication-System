import React from 'react';
import { useState } from 'react';
import Bulletin from "../components/Bulletin";
import Header from "../components/Header";
import '../App.css';
import { Form, Row, Col, Card, Container, Nav, Button, Modal } from 'react-bootstrap';
import SearchIcon from '@material-ui/icons/Search';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import { useQuery } from '@apollo/client';
import { USER_QUERY } from '../graphql';

const MainPage = props => {
    const [section, setSection] = useState("全體留言板")
    const [viewType, setViewType] = useState("ALL")
    const [search, setSearch] = useState("");
    const { match } = props;
    const [show, setShow] = useState(false);
    const [msg, setMsg] = useState("")

    let id = localStorage.getItem("id")
    const { loading, error, data } = useQuery(USER_QUERY, { variables: { UID: id } });
    //if (!loading)
    //    console.log("user's group: ", data.users[0].group)
    
    const showAlert = (
        <Modal
            size="sm"
            show={show}
            onHide={() => setShow(false)}
            aria-labelledby="example-modal-sizes-title-sm"
        >
            <Modal.Header closeButton>{msg}</Modal.Header>
        </Modal>
    )

    return( 
        <>
            <Header />
            <Container>
                {showAlert}
                <div>
                    <h6 style={{fontSize:"50px", textAlign: "center", fontWeight: "bold"}} className="mb-4">交換學生搓湯圓平台</h6>
                    <h1 style={{fontSize:"24px", textAlign: "center", color:"grey", fontWeight: "lighter"}} className="mb-5">一個讓大家搓湯圓的地方</h1>
                </div>
                <Row className="justify-content-center">
                    <Col md="3" style={{borderRadius: "30px"}}>
                        <Nav className="flex-column" variant="pills">
                          <Button style={{borderRadius: "30px"}} className="d-flex justify-content-center pt-3" variant= {section === "全體留言板" ? "secondary" : null} eventKey="mainPage"  onClick={e => setSection("全體留言板")}>
                              <DashboardIcon className="mr-2"></DashboardIcon>
                              <h5>全體留言板</h5>
                            </Button>
                          <Button style={{borderRadius: "30px"}} className="d-flex justify-content-center pt-3" variant= {section === "分組留言板" ? "secondary" : null} eventKey="link-2" onClick={e => setSection("分組留言板")}>
                                <PeopleAltIcon className="mr-2"></PeopleAltIcon>
                                <h5>分組留言板</h5>
                            </Button>
                        </Nav>
                    </Col>
                    <Col md="9">
                        <Card className="align-items-start mb-5" style={{borderRadius: "30px" }}>
                            <Card.Body style={{ width: '100%' }}>
                                <Row className="justify-content-between align-items-center pr-3 pb-3">
                                    <Nav className="col-md-5" defaultActiveKey="ALL" variant="tabs" style={{ margin: "10px" }} onSelect={(selectedKey) => setViewType(selectedKey)}>
                                            <Nav.Item className=" pr-3 ps-3">
                                                <Nav.Link  className="nav-link" eventKey="ALL" style={{ fontSize: "22px", color: "grey"}}>全部</Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item className="pr-3 ps-3">
                                                <Nav.Link className="nav-link" eventKey="FOLLOW" style={{ fontSize: "22px", color: "grey" }}>關注</Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item className="pr-3 ps-3">
                                                <Nav.Link className="nav-link" eventKey="SELF" style={{ fontSize: "22px", color: "grey" }}>我的留言</Nav.Link>
                                            </Nav.Item>
                                    </Nav>
                                    <div className="col-md-4 d-flex align-items-center">
                                        {(viewType === "ALL" || viewType === "SEARCH")?
                                            <Form.Row className=" align-items-center justify-content-center" >
                                                <Col className="d-flex" >
                                                    <Form.Control psaceholder="搜尋" onChange={(e) => {setSearch(e.target.value); setViewType("SEARCH");}} />
                                                    <Button type="submit" variant="secondary" size="sm" ><SearchIcon></SearchIcon></Button>    
                                                </Col>
                                            </Form.Row>:null
                                        }
                                    </div>
                                </Row>
                                <Bulletin 
                                    UID={id}
                                    setShow={setShow}
                                    setMsg={setMsg}
                                    group={(data && section === "分組留言板")? data.users[0].group: null}
                                    type={viewType}
                                    search={search}
                                ></Bulletin>
                            </Card.Body>
                        </Card>
                    </Col> 
                </Row>
            </Container>
        </>
    )
}

export default MainPage