import React, { useState, useEffect } from 'react';
import Reply from "./Reply";
import ReplyForm from "./ReplyForm";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import ModeCommentOutlinedIcon from '@material-ui/icons/ModeCommentOutlined';
import ReplyOutlinedIcon from '@material-ui/icons/ReplyOutlined';
import HighlightOffOutlinedIcon from '@material-ui/icons/HighlightOffOutlined';
import { Accordion, Card, Button, Form } from 'react-bootstrap';
import { useQuery, useMutation } from '@apollo/client';
import {
    DELETE_COMMENT_MUTATION,
    UPDATE_COMMENT_MUTATION,
    COMMENT_QUERY,
    REPLY_SUBSCRIPTION
} from '../graphql';

const Comment = ({key, UID, comment, setShow, setMsg}) => {
    const { loading, error, data, subscribeToMore } = useQuery(COMMENT_QUERY, { variables: {CID: comment.id} });
    const [deleteCmt] = useMutation(DELETE_COMMENT_MUTATION);
    const [updateCmt] = useMutation(UPDATE_COMMENT_MUTATION);
    const [isReplied, setIsReplied] = useState(false);
    const [cmtEdit, setCmtEdit] = useState(false);
    const [cmtValue, setCmtValue] = useState(comment.content);

    useEffect(() => {
        try {
            subscribeToMore({
                document: REPLY_SUBSCRIPTION,
                variables: { CID: comment.id },
                updateQuery: (prev, { subscriptionData }) => {
                    console.log(subscriptionData.data.reply.mutation)
                    const mutation = subscriptionData.data.reply.mutation
                    var newReply, newReplies;
                    switch(mutation){
                        case "CREATED":
                            newReply = subscriptionData.data.reply.data;
                            newReplies = [...prev.comments[0].replies]
                            return {
                                comments: [
                                    {
                                        __typename:　prev.comments[0].__typename,
                                        author: prev.comments[0].author,
                                        id: prev.comments[0].id,
                                        content: prev.comments[0].content,
                                        replies: [newReply, ...newReplies],
                                    }
                                ]
                            }
                        case "DELETED":
                            newReply = subscriptionData.data.reply.data;
                            newReplies = prev.comments[0].replies.filter(reply => reply.id !== newReply.id)
                            return {
                                comments: [
                                    {
                                        __typename:　prev.comments[0].__typename,
                                        author: prev.comments[0].author,
                                        id: prev.comments[0].id,
                                        content: prev.comments[0].content,
                                        replies: newReplies,
                                    }
                                ]
                            }
                        case "UPDATED":
                            var newReply = subscriptionData.data.reply.data;
                            var index = prev.comments[0].replies.findIndex(reply => reply.id === newReply.id)
                            var newReplies = [...prev.comments[0].replies]
                            newReplies.splice(index, 1, newReply)
                            //console.log(newReplies)
                            return {
                                comments: [
                                    {
                                        __typename:　prev.comments[0].__typename,
                                        author: prev.comments[0].author,
                                        id: prev.comments[0].id,
                                        content: prev.comments[0].content,
                                        replies: newReplies,
                                    }
                                ]
                            }
                        default :
                            break;
                    }
                },
            });
        } catch (e) {}
    }, [subscribeToMore]);

    const handleDeleteCmt = async (id) => {
        console.log(id)
        const res = await deleteCmt({ variables: { CID: id } })
        if(res.data.deleteComment === "success"){
            console.log(res)
            setMsg("留言刪除成功")
            setShow(true)
        }
    }

    const handleUpdateCmt = async (CID, type, data) => {
        console.log(CID)
        const res = await updateCmt( { variables: { CID: CID, type: type, data: data } } )
        if(res.data.updateComment === "success"){
            if(type === "EDIT"){
            setCmtEdit(false)
            setMsg("留言更新成功")
            setShow(true)
            }
            else{
                console.log(true)
            }
        }
    }

    return (
        <div className="mb-4">
            <div className="mt-2 d-flex justify-content-between button">
                <div className="mt-2 d-flex align-items-center justify-content-start button">
                    <AccountCircleIcon color="action" className="me-2" style={{ fontSize:"45" }}></AccountCircleIcon>
                    <div>
                        <h6 className="mb-0">{comment.author.user_id}</h6>
                        <span style={{ fontSize:"small" }}>Posted at {comment.datetime}</span>
                    </div>
                </div>
                {
                    comment.author.user_id === UID ? 
                    (<div className="d-flex align-items-center">
                        <Button variant="outline-secondary" size="sm" onClick={() => setCmtEdit(! cmtEdit)}>編輯</Button>
                        <a className='ms-3' style={{color: "grey"}} variant="light" onClick={() => handleDeleteCmt(comment.id)}>
                            <HighlightOffOutlinedIcon style={{fontSize: "30px"}}></HighlightOffOutlinedIcon>
                        </a>
                    </div>):
                    null
                }
            </div>
            <Accordion className='mt-4'defaultActiveKey="1">
                <Card>
                    <Accordion.Toggle md="8" style={{ backgroundColor: "white"}}as={Card.Header} eventKey="0" className="d-flex pl-2">
                        {
                            cmtEdit ? 
                            (<Form.Control 
                                type="text" 
                                placeholder="留言..." 
                                value={comment.content} 
                                onChange={(e) => setCmtValue(e.target.value)} 
                                onKeyPress={e => e.key === "Enter" && handleUpdateCmt(comment.id, "EDIT", cmtValue)}
                            />) :
                            (<span style={{fontSize:"18px"}}>{comment.content}</span>)
                        }
                    </Accordion.Toggle>
                    {data? (data.comments[0].replies.length === 0? 
                        (<Accordion.Collapse eventKey="0">
                            <Card.Body style={{fontSize:"18px"}}>
                                目前尚無回覆
                            </Card.Body>
                        </Accordion.Collapse>) :
                        (data.comments[0].replies.map((reply, index) => (
                            <Reply
                                key={index}
                                UID={UID}
                                reply={reply}
                                setShow={setShow}
                                setMsg={setMsg}
                            />
                        )))):null
                    }
                </Card>
            </Accordion>
            <div className="mt-4 me-3 d-flex justify-content-end align-items-center">
                    {
                        comment.followers && comment.followers.length && comment.followers.some(user => user.user_id === UID) ? 
                        <FavoriteIcon style={{color: "red"}} onClick={() => handleUpdateCmt(comment.id, "FOLLOW", UID)}></FavoriteIcon > :
                        <FavoriteBorderOutlinedIcon style={{color: "grey"}} onClick={() => handleUpdateCmt(comment.id, "FOLLOW", UID)}></FavoriteBorderOutlinedIcon>
                    }
                    <span className='me-3 ms-3'>{comment.followers.length}</span>
                    <ModeCommentOutlinedIcon style={{color: "grey"}} >回覆</ModeCommentOutlinedIcon>
                    <span className='me-3 ms-3'>{comment.replies.length}</span> 
                    <ReplyOutlinedIcon color={isReplied?"disabled":"grey"}  size="md" onClick={() => setIsReplied(! isReplied)}>新增回覆</ReplyOutlinedIcon>
                    {isReplied ? <ReplyForm setIsReplied={setIsReplied} UID={UID} CID={comment.id} setShow={setShow} setMsg={setMsg} />:null}
            </div>
        </div>
    )
};
 
export default Comment;