import { useState } from 'react';
import Bulletin from "../components/Bulletin";
import Sort from "../components/Sort";
import InfoPage from "./InfoPage";
import '../App.css';
import { Row, Col, Card, Container, Nav, Button, Modal } from 'react-bootstrap';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import { useQuery } from '@apollo/client';
import { USER_QUERY } from '../graphql';

const MainPage = props => {
    const [section, setSection] = useState("全體留言板")
    const [viewType, setViewType] = useState("ALL")
    const [sort, setSort] = useState("最新");
    const { match } = props;
    const [show, setShow] = useState(false);
    const [msg, setMsg] = useState("")

    let {id} = match.params;
    console.log(id)
    // Query the user's group
    const { loading, error, data } = useQuery(USER_QUERY, { variables: { UID: id } });
    while (loading) {
        // do nothing, just wait for loading
    }
    console.log("user's group: ", data.users[0].group)
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
            <Container>
                {showAlert}
                <div>
                    <h6 style={{fontSize:"60px", textAlign: "center", fontWeight: "bold"}} className="mb-4">交換學生搓湯圓平台</h6>
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
                          {/* <Button style={{borderRadius: "30px"}} className="d-flex justify-content-center pt-3" variant= {section === "分組志願表" ? "secondary" : null} eventKey="disabled" onClick={e => setSection("分組志願表")}>
                              <GradeIcon className="mr-2"></GradeIcon>
                              <h5>分組志願表</h5>
                            </Button> */}
                        </Nav>
                    </Col>
                    <Col md="9">
                        <Card className="align-items-start" style={{ height: '200rem', borderRadius: "30px" }}>
                            {/* <Card.Header style={{ width: '100%' }}as="h5"> */}
                            {/* </Card.Header> */}
                            <Card.Body style={{ width: '100%' }}>
                                <Row className="justify-content-between align-items-center pr-3 pb-5">
                                    <Nav md="5" defaultActiveKey="/mainPage" variant="tabs" style={{ margin: "10px" }} onSelect={(selectedKey) => setViewType(selectedKey)}>
                                            <Nav.Item className=" pr-3 pl-3">
                                                <Nav.Link className="nav-link" eventKey="ALL" style={{ fontSize: "22px" }}>全部</Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item className="pr-3 pl-3">
                                                <Nav.Link className="nav-link" eventKey="FOLLOW" style={{ fontSize: "22px" }}>關注</Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item className="pr-3 pl-3">
                                                <Nav.Link className="nav-link" eventKey="SELF" style={{ fontSize: "22px" }}>我的留言</Nav.Link>
                                            </Nav.Item>
                                    </Nav>
                                    <div className="d-flex align-items-center">
                                        <Sort sort={sort} setSort={setSort}></Sort>
                                    </div>
                                </Row>
                                <Bulletin 
                                    UID={id}
                                    setShow={setShow}
                                    setMsg={setMsg}
                                    group={(data && section === "分組留言板")? data.users[0].group: null}
                                    type={viewType}
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