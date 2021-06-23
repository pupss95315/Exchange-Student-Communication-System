import { useState } from 'react';
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import Bulletin from "../components/Bulletin";
import '../App.css';
import axios from '../api';
import { Row, Col, Card, Container, Nav, Form, Button, Alert, Modal } from 'react-bootstrap';
function MainPage() {
    const [me, setMe] = useState("")
    
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

    // const addComment = text => {
    //     const newComments = [...comments, text];
    //     setComments(newComments);
    //     setShow(true);
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
        <Container>
            <Header></Header>
            {/* {showAlert} */}
            <Row className="justify-content-center">
                {/* <Col md="2">
                    <Nav className="flex-column" variant="pills">
                      <Button className="d-flex justify-content-center" variant= {section === "全體留言板" ? "secondary" : null} eventKey="mainPage"  onClick={e => setSection("全體留言板")}>全體留言板</Button>
                      <Button className="d-flex justify-content-center" variant= {section === "分組留言板" ? "secondary" : null} eventKey="link-2" onClick={e => setSection("分組留言板")}>分組留言板</Button>
                      <Button className="d-flex justify-content-center" variant= {section === "分組志願表" ? "secondary" : null} eventKey="disabled" onClick={e => setSection("分組志願表")}>分組志願表</Button>
                    </Nav>
                </Col> */}
                <Col md="12">
                    <Card className="align-items-start" style={{ height: '200rem' }}>
                        <Card.Header style={{ width: '100%' }}as="h5">
                            <SearchBar></SearchBar>
                        </Card.Header>
                        <Card.Body style={{ width: '100%' }}>
                            <Bulletin me={me}></Bulletin>
                        </Card.Body>
                    </Card>
                </Col> 
            </Row>
        </Container>
    )
}

export default MainPage