import React, { useState } from 'react';
import { Form, Col, Button, Modal } from 'react-bootstrap';
import CreateIcon from '@material-ui/icons/Create';
import { useMutation } from '@apollo/client';
import {
    CREATE_COMMENT_MUTATION
} from '../graphql';

const CommentForm = ({ UID, group }) => {
    const [value, setValue] = useState("");
    const [show, setShow] = useState(false);
    const [addCmt] = useMutation(CREATE_COMMENT_MUTATION);

    const handleSubmit = e => {
        e.preventDefault();
        if (!value) return;
        addCmt({ variables: { UID: UID, content: value, group: group }})
        setValue("");
        setShow(false)
    };

    const handleCancel = () => {
        setValue("");
        setShow(false)
    };


    return (
        <>
            <Button 
                style={{ borderRadius: "30px", fontSize: "18px"}} 
                variant="outline-secondary" 
                onClick={() => setShow(true)}
                className="col-md-2 mb-2 d-flex align-items-center"
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