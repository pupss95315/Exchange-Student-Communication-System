import React, { useState } from 'react';
import { Accordion, Card, Button, Form, Col } from 'react-bootstrap';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import HighlightOffOutlinedIcon from '@material-ui/icons/HighlightOffOutlined';
import { useMutation } from '@apollo/client';
import {
    DELETE_REPLY_MUTATION,
    UPDATE_REPLY_MUTATION
} from '../graphql';

const Reply = ({
    key,
    UID,
    reply,
    setShow,
    setMsg}) => {

    const [deleteReply] = useMutation(DELETE_REPLY_MUTATION);
    const [updateReply] = useMutation(UPDATE_REPLY_MUTATION);
    const [replyEdit, setReplyEdit] = useState(false);
    const [replyValue, setReplyValue] = useState("");

    const handleDeleteReply = async () => {
        const res = await deleteReply({ variables: { RID: reply.id } })
        if(res.data.deleteReply === "success"){
            setMsg("回覆刪除成功")
            setShow(true)
        }
    }

    const handleUpdateReply = async () => {
        const res = await updateReply({ variables: { RID: reply.id, content: replyValue} })
        if(res.data.updateReply === "success"){
            setReplyEdit(false)
            setMsg("回覆新增成功")
            setShow(true)
        }
    }

    return(
        <Accordion.Collapse eventKey="0">
            <Card.Body className="d-flex align-items-center justify-content-between">
                <Col className="d-flex align-items-center">    
                    <AccountCircleIcon className="me-2" style={{ fontSize:"45", color:"#E0E0E0" }}></AccountCircleIcon>
                    {
                        replyEdit ? 
                        (<Form.Control 
                            type="text" 
                            placeholder="留言..." 
                            value={reply.content} 
                            onChange={(e) => setReplyValue(e.target.value)} 
                            onKeyPress={e => e.key === "Enter" && handleUpdateReply()}
                        />) :
                        (<>
                        <span className = "me-2" style={{fontWeight: "bold", fontSize:"18px"}}>{UID}</span>
                        <span style={{fontSize:"18px"}}>{reply.content}</span>
                        </>)
                    }
                </Col>
                {
                    reply.author.user_id === UID? 
                    (<div>
                        <Button variant="outline-secondary" size="sm" onClick={() => setReplyEdit(!replyEdit)}>編輯</Button>
                        <a className='ms-3' style={{color: "grey"}} variant="light" onClick={()=>handleDeleteReply()}>
                            <HighlightOffOutlinedIcon style={{fontSize: "30px"}}></HighlightOffOutlinedIcon>
                        </a>
                    </div>):
                    null
                }
            </Card.Body>
        </Accordion.Collapse>
    )
}

export default Reply;