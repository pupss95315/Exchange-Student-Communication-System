import React, { useState } from 'react';
import { Form, Col, Button, Row } from 'react-bootstrap';

const ReplyForm = ({UID, CID, addReply}) => {
    const [replyValue, setReplyValue] = useState("");
    const handleSubmit = e => {
        e.preventDefault();
        if (!replyValue) return;
        addReply({ variables: { UID: UID, CID: CID, content: replyValue} });
        //addReply({ variables: {}}replyValue);
        setReplyValue("");
    };

    return (
        <Row className="ml-1">
            <Col className="p-0">
                <Form.Control  
                    value={replyValue} 
                    onChange={ e => setReplyValue(e.target.value)} 
                    placeholder="回覆..." />
            </Col>
            <Button onClick={ e => handleSubmit(e) } type="submit"  variant="secondary">送出</Button>
        </Row>
    )
}

export default ReplyForm;