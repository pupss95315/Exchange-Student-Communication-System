import { Button,Form, Card, Container, Modal, OverlayTrigger, Tooltip, Col } from 'react-bootstrap';
import { useHistory } from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import '../App.css';
import { useMutation, useLazyQuery } from '@apollo/client';
import {
    CREATE_USER_MUTATION,
    USER_QUERY
} from '../graphql';

const LoginPage = () => {
    const [queryUser, { loading, error, data }] = useLazyQuery(USER_QUERY);
    //const [addUser] = useMutation(CREATE_USER_MUTATION)
    //const [register] = useMutation(UPDATE_USER_MUTATION);
    
    const [UID, setUID] = useState("");
    const [password, setPassword] = useState("");
    const [regisUID, setRegisUID] = useState("");
    const [regisPassword, setRegisPassword] = useState("");
    const [page, setPage] = useState("login")
    const [show, setShow] = useState(false)
    const [msg, setMsg] = useState("")
    const [validated, setValidated] = useState(false);
    //const [isCorrectPsw, setIsCorrectPsw] = useState(false)
    const history = useHistory();
    useEffect(() => {
        if (data && !loading) {
            handleAfterQuery()
        }
    }, [data, loading]);
      
    const handleAfterQuery = () => {
        if(page === "login"){
            if(! data.users[0]){
                setMsg("序號不存在")
                setShow(true)
            }
            else if(!data.users[0].isRegistered){
                setMsg("序號未註冊")
                setShow(true)
            }
            else if(password !== data.users[0].password){
                setMsg("密碼錯誤")
                setShow(true)
            }
            else{
                history.push(`/mainPage`)
                setValidated(true)
            }
        }
        else{
            if(! data.users[0]){
                setMsg("序號不存在")
                setShow(true)
            }
            else if(data.users[0].isRegistered){
                setMsg("序號已註冊")
                setShow(true)
            }
            else{
                setMsg("註冊成功")
                setPage(register)
            }
        }
    }
    // const validateForm = () => {
    //     return UID.length > 0 && password.length > 0;
    // }
    // const validatePassword = () => {
    //     console.log(password)
    //     //queryUser({ variables: { query: UID } });
    //     if(password === "123") 
    //         return true;
    //     //setShow(true)
    //     console.log(true)
    // }
    // const validateRegisForm = () => {
    //     return regisUID.length > 0 && regisPassword.length > 0;
    // }
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

    const handleLogin = (e) => {
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
        //console.log(e.currentTarget.checkValidity())
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

    const login = (
        <>
            <Form noValidate validated={validated} onSubmit={handleLogin}>
                <Form.Group controlId="UID">
                    <Form.Label>交換學生序號</Form.Label>
                    <Form.Control
                        autoFocus
                        required
                        //isInvalid = {UID.length === 0}
                        type="text"
                        value={UID}
                        onChange={(e) => setUID(e.target.value)}
                        className="form-control"
                    />
                    {/* <Form.Control.Feedback type="invalid"></Form.Control.Feedback> */}
                </Form.Group>
                <Form.Group controlId="password">
                    <Form.Label>密碼</Form.Label>
                    <Form.Control
                        required 
                        //isInvalid={password.length === 0}
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {/* <Form.Control.Feedback type="invalid"></Form.Control.Feedback> */}
                </Form.Group>
                <Button variant="dark" block size="lg" type="submit"> 登入 </Button>
            </Form>
            <div className="d-flex justify-content-center mt-3">
                還沒有帳號嗎? <Card.Link href="#" className="ml-2" onClick={(e) => setPage("register")}>註冊</Card.Link>
            </div>
        </>
    )
    const register = (
        <>
            <Form noValidate validated={validated} onSubmit={handleRegister}>
                <Form.Group size="lg" controlId="regisUID">
                    <Form.Label>交換學生序號</Form.Label>
                    <Form.Control
                        autoFocus
                        required
                        type="text"
                        value={regisUID}
                        onChange={(e) => setRegisUID(e.target.value)}
                        className="form-control"
                    />
                    {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback> */}
                </Form.Group>
                <Form.Group size="lg" controlId="password">
                    <Form.Label>密碼</Form.Label>
                    <Form.Control
                        required
                        type="password"
                        value={regisPassword}
                        onChange={(e) => setRegisPassword(e.target.value)}
                    />
                    {/* <Form.Control.Feedback type="invalid">
                      Please choose a username.
                    </Form.Control.Feedback> */}
                </Form.Group>
                {/* <OverlayTrigger placement="top" overlay={renderTooltip}> */}
                <Button variant="dark" block size="lg" type="submit"> 註冊 </Button>
                {/* </OverlayTrigger> */}
                {/* <OverlayTrigger
                  key="top"
                  placement="top"
                  overlay={
                    <Tooltip id={`tooltip-top`}>
                      Tooltip on <strong>top</strong>.
                    </Tooltip>
                  }
                >
                <Button variant="secondary">Tooltip on top</Button>
                </OverlayTrigger> */}
                <div className="d-flex justify-content-center mt-3">
                    返回 <Card.Link href="#" className="ml-2" onClick={(e) => setPage("login")}>登入</Card.Link>
                </div>
            </Form>
        </>
    )
    if (loading) return <p>ERROR</p>;
    if (error) return <p>ERROR</p>;
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