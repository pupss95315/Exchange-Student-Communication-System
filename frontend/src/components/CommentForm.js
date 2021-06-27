import React, { useState } from 'react';
import { Form, Col, Button, Modal } from 'react-bootstrap';
import AddIcon from '@material-ui/icons/Add';
import CreateIcon from '@material-ui/icons/Create';

const CommentForm = ({UID, addCmt}) => {
    const [value, setValue] = useState("");
    const [show, setShow] = useState(false);

    const handleSubmit = e => {
        e.preventDefault();
        if (!value) return;
        // addCmt({ variables: {
        //         author: author,
        //         content: value,
        //     }
        // });
        console.log()
        addCmt({ variables: {UID: UID, content: value}})
        setValue("");
        setShow(false)
    };

    const handleCancel = () => {
        setValue("");
        setShow(false)
    };


    return (
        // <Form.Row className="mt-3 mb-4">
        //     <Col className="d-flex">
        //         <Form.Control value={value} onChange={ e => setValue(e.target.value)} placeholder="新增留言" />
        //         <Button  onClick={ e => handleSubmit(e) } type="submit"  variant="secondary" size="sm">
        //             <AddIcon></AddIcon>
        //         </Button>
        //     </Col>
        // </Form.Row>
        <>
            <Button 
                style={{ borderRadius: "30px", fontSize: "18px"}} 
                variant="outline-secondary" 
                onClick={() => setShow(true)}
                className="mb-2 d-flex align-items-center"
            >
                <CreateIcon className="mr-2"></CreateIcon>新增留言
            </Button>
            <Modal 
                show={show} 
                onHide={() => setShow(false)} 
                backdrop="static"
                aria-labelledby="contained-modal-title-vcenter"
                id="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title style={{fontWeight:"bold"}}>
                        <h3 >新增留言</h3>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Control size="lg" as="textarea" value={value} onChange={ e => setValue(e.target.value)} placeholder="說些什麼吧..." rows={3} />
                    </Form.Group>
                    {/* <Form.Control value={value} onChange={ e => setValue(e.target.value)} placeholder="新增留言" /> */}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary" onClick={handleCancel}>取消</Button>
                    <Button  onClick={ e => handleSubmit(e) } type="submit"  variant="outline-secondary">
                        送出
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default CommentForm;