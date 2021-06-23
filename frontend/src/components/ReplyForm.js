import React, { useState } from 'react';
import { Form, Col, Button } from 'react-bootstrap';

const ReplyForm = ({addReply}) => {
    const [replyValue, setReplyValue] = useState("");
    const handleSubmit = e => {
        e.preventDefault();
        if (!replyValue) return;
        props.addReply(replyValue);
        //addReply({ variables: {}}replyValue);
        setReplyValue("");
    };

    return (
        <Form.Row className="ml-3">
            <Col>
                <Form.Control  size="sm"value={replyValue} onChange={ e => setReplyValue(e.target.value)} placeholder="Leave your reply !" />
            </Col>
            <Button  onClick={ e => handleSubmit(e) } type="submit"  variant="secondary" size="sm">Submit</Button>
        </Form.Row>
    )
}

export default ReplyForm;