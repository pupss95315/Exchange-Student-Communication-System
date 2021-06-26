import { useState } from 'react';
import Bulletin from "../components/Bulletin";
import CommentForm from "../components/CommentForm";
import Sort from "../components/Sort";
import InfoPage from "./InfoPage";
import '../App.css';
import { Row, Col, Card, Container, Nav, Button } from 'react-bootstrap';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import GradeIcon from '@material-ui/icons/Grade';
const MainPage = props => {
    const [me, setMe] = useState("")
    const [section, setSection] = useState("全體留言板")
    const [sort, setSort] = useState("最新");
    const { match } = props;

    let {id} = match.params;
    console.log(id)
    // API functions
    // const getAllCmts = async () => {
    //     const {
    //         data: { allComments },
    //     } = await axios.get('/api/getCmt');
    //     setComments(allComments);
    // };
    
    // const addCmt = async (text) => {
    //     const {
    //         data: { msg },
    //     } = await axios.post('/api/addCmt', {
    //         text, 
    //         UID
    //     });
    
    //     if(msg === "success"){
    //         // show sucess msg
    //     }
    // };
    
    // const deleteCmt = async (id) => {
    //     const {
    //         data: { msg },
    //     } = await axios.delete('/api/deleteCmt', {
    //         id
    //     });
    
    //     if(msg === "success"){
    //         // show sucess msg
    //     }
    // };
    
    // const updateCmt = async (id, text) => {
    //     const {
    //         data: { msg },
    //     } = await axios.post('/api/deleteCmt', {
    //         id,
    //         text
    //     });
    
    //     if(msg === "success"){
    //         // show sucess msg
    //     }
    // };
    
    // const makeCmtQuery = async () => {
    //     const {
    //         data: { queryComments },
    //     } = await axios.get('/api/makeCmtQuery', {
    //         queryType, 
    //         queryValue
    //     });
    //     setComments(queryComments)
    // };

    // const removeComment = id => {
    //     const newComments = [...comments];
    //     newComments.splice(id, 1);
    //     setComments(newComments);
    // };

    // const editComment = (id) => {
    //     setEdit(true);
    // };
    
    // const updateComment = (id, text) => {
    //     console.log(text)
    //     let newComments = comments.map((comment) => {
    //         if (comment.id === id) {
    //           comment.text = text;
    //         }
    //         return comment;
    //     });
    //     setComments(newComments);
    //     setEdit(false)
    // };

    // const handleSubmit = e => {
    //     e.preventDefault();
    //     if (!value) return;
    //     addComment(value);
    //     setValue("");
    // };
    // const handleSort = (e) => {
    //    setSort(e.target.value)
    //    switch(e.target.value) {
    //     case '最多人回覆':
    //         comments.sort(function(a, b){
    //             if (a[replyNum] < b[replyNum])
    //                 return -1 
    //             if (a[replyNum] > b[replyNum])
    //                 return 1
    //             return 0
    //         })
  
    //     case '最受歡迎':
  
    //       return 'You are a Manager.';
  
    //     default:
    //   }
    // };

    return( 
        <>
            <Container>
                {/* {showAlert} */}
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
                                    <Nav md="5" defaultActiveKey="/mainPage" style={{ borderBottom: "10px"}}>
                                            <Nav.Item className=" pr-3 pl-3">
                                                <Nav.Link className="nav-link" href="/mainPage" style={{ color: "black", fontSize: "22px"}}>全部</Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item className="pr-3 pl-3">
                                                <Nav.Link eventKey="focus" style={{ color: "grey", fontSize: "22px" }}>關注</Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item className="pr-3 pl-3">
                                                <Nav.Link eventKey="reply" style={{ color: "grey", fontSize: "22px" }}>回覆</Nav.Link>
                                            </Nav.Item>
                                    </Nav>
                                    <div className="d-flex align-items-center">
                                        <Sort sort={sort} setSort={setSort}></Sort>
                                    </div>
                                </Row>
                                <Bulletin 
                                    me={me}
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