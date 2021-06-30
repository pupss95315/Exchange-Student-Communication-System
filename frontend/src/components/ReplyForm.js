import React, { useState } from 'react';
import { Form, Col, Button } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import {
    CREATE_REPLY_MUTATION
} from '../graphql';

const ReplyForm = ({UID, CID, setIsReplied, setShow, setMsg}) => {
    const [replyValue, setReplyValue] = useState("");
    const [addReply] = useMutation(CREATE_REPLY_MUTATION);

    const handleSubmit = e => {
        e.preventDefault();
        if (!replyValue) return;
        addReply({ variables: { UID: UID, CID: CID, content: replyValue} });
        setReplyValue("")
        setMsg("回覆新增成功")
        setIsReplied(false)
        setShow(true)
    };

    return (
        <Col className="d-flex col-md-4">
            <Form.Control  
                value={replyValue} 
                
                onChange={ e => setReplyValue(e.target.value)} 
                placeholder="回覆..." 
            />
            <Button style={{width: "30%"}}onClick={ e => handleSubmit(e) } type="submit"  variant="secondary">送出</Button>
        </Col>
    )
}

export default ReplyForm;