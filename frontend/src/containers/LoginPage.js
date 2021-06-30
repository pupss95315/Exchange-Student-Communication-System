import { Button,Form, Card, Container, Modal, Row, InputGroup } from 'react-bootstrap';
import { useHistory } from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import '../App.css';
import { useMutation, useLazyQuery } from '@apollo/client';
import {
    UPDATE_USER_MUTATION,
    USER_QUERY
} from '../graphql';

const LoginPage = () => {
    const [queryUser, { loading, error, data }] = useLazyQuery(USER_QUERY)
    const [updateUser] = useMutation(UPDATE_USER_MUTATION);
    
    const [UID, setUID] = useState("");
    const [password, setPassword] = useState("");
    const [regisUID, setRegisUID] = useState("");
    const [regisPassword, setRegisPassword] = useState("");
    const [msg, setMsg] = useState("");
    const [page, setPage] = useState("login");
    const [show, setShow] = useState(false);
    const [validated, setValidated] = useState(false);
    const history = useHistory();

    useEffect(() => {
        if (data && !loading) {
            console.log(data)
            handleAfterQuery()
        }
    }, [data, loading]);
    
    const handleAfterQuery = async () => {
        if(page === "login"){
            if(! data.users[0]){
                setMsg("序號不存在")
                setShow(true)
            }
            else if(data.users[0].password === null){
                setMsg("序號未註冊")
                setShow(true)
            }
            else if(password !== data.users[0].password){
                setMsg("密碼錯誤")
                setShow(true)
            }
            else if(password === data.users[0].password){
                setValidated(true)
                window.localStorage.setItem("id", UID)
                window.localStorage.setItem("group", data.users[0].group)
                window.localStorage.setItem("isLogin", true)
                history.push(`/mainPage/${UID}`)
            }
        }
        else{
            if(! data.users[0]){
                setMsg("序號不存在")
                setShow(true)
            }
            else if(data.users[0].password !== null){
                setMsg("序號已註冊")
                setShow(true)
            }
            else{
                const msg = await updateUser({ variables: { UID: regisUID, data: { password: regisPassword }}})
                if(msg.data.updateUser === "success"){
                    console.log(true)
                    setMsg("註冊成功")
                    setShow(true)
                    setPage("login")
                }
            }
        }
    }

    const handleLogin = (e) => {
        e.preventDefault()
        if(e.currentTarget.checkValidity()){
            queryUser({ variables: { UID: UID }})
        }
        else{
            if(UID.length === 0 && password.length === 0){
                setMsg("交換學生序號及密碼不能為空")
            }
            else if(UID.length === 0){
                setMsg("交換學生序號不能為空")
            }
            else if(password.length === 0){
                setMsg("密碼不能為空")
            }
            setShow(true)
        }
    };

    const handleRegister = (e) => {
        if(e.currentTarget.checkValidity()){
            queryUser({ variables: { UID: regisUID }})
        }
        else{
            if(regisUID.length === 0 && regisPassword.length === 0){
                setMsg("交換學生序號及密碼不能為空")
            }
            else if(regisUID.length === 0){
                setMsg("交換學生序號不能為空")
            }
            else if(regisPassword.length === 0){
                setMsg("密碼不能為空")
            }
            setShow(true)
        }
    };

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

    const login = (
        <>
            <Form noValidate validated={validated} onSubmit={handleLogin} style={{width: "60%"}}>
                <Form.Group controlId="UID" className="mb-4">
                    <Form.Control
                        autoFocus
                        required
                        type="text"
                        value={UID}
                        onChange={(e) => setUID(e.target.value)}
                        className="form-control"
                        placeholder="交換學生序號"
                        style={{borderRadius: "30px"}}
                    />
                </Form.Group>
                <Form.Group controlId="password">
                    <Form.Control
                        required 
                        type="password"
                        value={password}
                        placeholder="密碼"
                        style={{borderRadius: "30px"}}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Button style={{ borderRadius: "30px", margin: "5px"}} variant="secondary" block size="lg" type="submit"> 登入 </Button>
                <div className="d-flex justify-content-center mt-3">
                還沒有帳號嗎? <Card.Link style={{ color: "#B5838D" }} className="ml-2" onClick={(e) => setPage("register")}>註冊</Card.Link>
            </div>
            </Form>
        </>
    )
    const register = (
        <>
            <Form noValidate validated={validated} onSubmit={handleRegister} style={{width: "60%"}}>
                <Form.Group size="lg" controlId="regisUID" className="mb-4">
                    <Form.Control
                        autoFocus
                        required
                        type="text"
                        value={regisUID}
                        placeholder="交換學生序號"
                        style={{borderRadius: "30px"}}
                        onChange={(e) => setRegisUID(e.target.value)}
                        className="form-control"
                    />
                </Form.Group>
                <Form.Group size="lg" controlId="password">
                    <Form.Control
                        required
                        type="password"
                        value={regisPassword}
                        placeholder="密碼"
                        style={{borderRadius: "30px"}}
                        onChange={(e) => setRegisPassword(e.target.value)}
                    />
                </Form.Group>
                <Button variant="secondary" style={{borderRadius: "30px", margin: "5px"}} block size="lg" type="submit"> 註冊 </Button>
                <div className="d-flex justify-content-center mt-3">
                    返回 <Card.Link style={{ color: "#B5838D" }} className="ml-2" onClick={(e) => setPage("login")}>登入</Card.Link>
                </div>
            </Form>
        </>
    )

    return (
        <>
            <Container className="center d-flex justify-content-center">
                {showAlert}
                <Card style={{width: "50%", borderRadius: "30px"}}>
                    <Card.Title style={{fontSize: "18px"}} className="d-flex justify-content-center">
                        <h2 className="m-4" style={{fontWeight: "bold"}}>交換學生搓湯圓系統</h2>
                    </Card.Title>
                    <div className="d-flex justify-content-center mb-4">
                        { page === "login" ? login : register }
                    </div>
                </Card>
            </Container>
        </>
    )
};

export default LoginPage;