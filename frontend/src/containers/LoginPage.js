import { Button,Form, Card, Container, Modal } from 'react-bootstrap';
import React, { useState } from 'react';
import axios from '../api';
import '../App.css';
import { useMutation } from '@apollo/react-hooks';
import {
    UPDATE_USER_MUTATION,
} from '../graphql';

const LoginPage = () => {

    const [UID, setUID] = useState("");
    const [password, setPassword] = useState("");
    const [regisUID, setRegisUID] = useState("");
    const [regisPassword, setRegisPassword] = useState("");
    const [page, setPage] = useState("login")
    const [show, setShow] = useState(false)

    // Mutation functions
    const [register] = useMutation(UPDATE_USER_MUTATION);

    const validateForm = () => {
        return UID.length > 0 && password.length > 0;
    }
    const validateRegisForm = () => {
        return regisUID.length > 0 && regisPassword.length > 0;
    }

    // const handleLogin = async(e) => {
    //     e.preventDefault();
    //     const {
    //         data: { msg },
    //     } = await axios.get('/api/login', {
    //         UID, 
    //         password
    //     });

    //     if(msg === "success"){
    //         // 將 UID 設成 local storage
    //     }
    // }

    // const handleRegister = async(e) => {
    //     const {
    //         data: { msg },
    //     } = await axios.post('/api/register', {
    //         UID, 
    //         password
    //     });

    //     if(msg === "success"){
    //         setShow(true)
    //     }
    // }
    
    const showAlert = (
        <Modal
            size="sm"
            show={show}
            onHide={() => setShow(false)}
            aria-labelledby="example-modal-sizes-title-sm"
        >
            <Modal.Header closeButton>註冊成功 !</Modal.Header>
        </Modal>
    )
    
    const login = (
        <>
            <Form>
                <Form.Group size="lg">
                    <Form.Label>交換學生序號</Form.Label>
                    <Form.Control
                        autoFocus
                        type="text"
                        value={UID}
                        onChange={(e) => setUID(e.target.value)}
                        className="form-control"
                    />
                </Form.Group>
                <Form.Group size="lg" controlId="password">
                    <Form.Label>密碼</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Button href="mainPage" variant="dark" block size="lg" type="submit" disabled={!validateForm()}> 登入 </Button>
            </Form>
            <div className="d-flex justify-content-center mt-3">
                還沒有帳號嗎? <Card.Link href="#" className="ml-2" onClick={(e) => setPage("register")}>註冊</Card.Link>
            </div>
        </>
    )
    const register = (
        <>
            <Form>
                <Form.Group size="lg">
                    <Form.Label>交換學生序號</Form.Label>
                    <Form.Control
                        autoFocus
                        type="text"
                        value={regisUID}
                        onChange={(e) => setRegisUID(e.target.value)}
                        className="form-control"
                    />
                </Form.Group>
                <Form.Group size="lg" controlId="password">
                    <Form.Label>密碼</Form.Label>
                    <Form.Control
                        type="password"
                        value={regisPassword}
                        onChange={(e) => setRegisPassword(e.target.value)}
                    />
                </Form.Group>
                <Button onClick={(e) => handleRegister(e)} variant="dark" block size="lg" type="submit" disabled={!validateRegisForm()}> 註冊 </Button>
                <div className="d-flex justify-content-center mt-3">
                    返回 <Card.Link href="#" className="ml-2" onClick={(e) => setPage("login")}>登入</Card.Link>
                </div>
            </Form>
        </>
    )
    
    // const forgetPsw = (

    // )
    return (
        <Container className="center d-flex justify-content-center">
            {showAlert}
            <Card bg="light">
                <Card.Header className="d-flex justify-content-center">交換學生搓湯圓系統</Card.Header>
                <Card.Body>
                    { page === "login" ? login : register }
                </Card.Body>
            </Card>
        </Container>
    )
};

export default LoginPage;