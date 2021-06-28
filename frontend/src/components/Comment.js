import React, { useState } from 'react';
import Reply from "./Reply";
import ReplyForm from "./ReplyForm";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import ModeCommentOutlinedIcon from '@material-ui/icons/ModeCommentOutlined';
import ReplyOutlinedIcon from '@material-ui/icons/ReplyOutlined';
import HighlightOffOutlinedIcon from '@material-ui/icons/HighlightOffOutlined';
import { Accordion, Card, Button } from 'react-bootstrap';
import { useQuery, useMutation } from '@apollo/client';
import {
    CREATE_REPLY_MUTATION,
    DELETE_REPLY_MUTATION,
    UPDATE_REPLY_MUTATION,
    REPLY_QUERY
} from '../graphql';

const Comment = ({key, UID, comment, handleDeleteCmt, handleFollow, updateCmt, editCmt}) => {
    //const [input, setInput] = useState(props.comment.text);
    const [replies, setReplies] = useState([]);
    const [isReplyEdit, setReplyEdit] = useState(false);
    const [isReplied, setIsReplied] = useState(false);
    const [replyNum, setReplyNum] = useState(0);
    const [focusNum, setFocusNum] = useState(0);
    const [isFocus, setIsFocus] = useState(false);
    const [time, setTime] = useState(Date().toLocaleString());
    console.log(UID)
    console.log(comment)
    //const { loading, error, data, subscribeToMore } = useQuery(REPLY_QUERY, {variables: {query: id} });
    
    // Mutation functions
    const [addReply] = useMutation(CREATE_REPLY_MUTATION);
    const [deleteReply] = useMutation(DELETE_REPLY_MUTATION);
    const [updateReply] = useMutation(UPDATE_REPLY_MUTATION);

    // useEffect(() => {
    //     try {
    //         var a = subscribeToMore({
    //             document: REPLY_SUBSCRIPTION,
    //             updateQuery: (prev, { subscriptionData }) => {
    //                 // console.log(prev)
    //                 // console.log(subscriptionData)
    //                 if (!subscriptionData.data) return prev;
    //                 const newReply = subscriptionData.data.messages.data;
    //                 var newData = Object.assign({}, prev, {
    //                     comments: {
    //                         __typename:　prev.chatBoxes.__typename,
    //                         id: prev.chatBoxes.id,
    //                         name:prev.chatBoxes.name,
    //                         users:prev.chatBoxes.users,
    //                         messages: [...prev.chatBoxes.messages, newMessage]
    //                     }
    //                 })
    //                 handleReply(newData, name)
    //                 return newData
    //             },
    //         });
    //     } catch (e) {}
    // }, [subscribeToMore]);
    
    // const addReply = (UID, text) => {
    //     const newReplies = [...replies, text];
    //     setReplies(newReplies);
    //     setReplyNum(replyNum + 1)
    // };

    // const removeReply = id => {
    //     const newReplies = [...replies];
    //     newReplies.splice(id, 1);
    //     setReplies(newReplies);
    // };

    // const editReply = (id) => {
    //     setReplyEdit(true);
    //     //setEdit(false);
    // };
    // const updateReply = (id, text) => {
    //     console.log(text)
    //     let newReplies = replies.map((Reply) => {
    //         if (Reply.id === id) {
    //           Reply.text = text;
    //         }
    //         return Reply;
    //     });
    //     setReplies(newReplies);
    //     setReplyEdit(false)
    // };

    /* API function*/
    // const getReply = async () => {
    //     const {
    //         data: { allReplies },
    //     } = await axios.get('/api/getReply');
    //     setReplies(allReplies);
    // };
    
    // const addReply = async (text) => {
    //     const {
    //         data: { msg },
    //     } = await axios.post('/api/addReply', {
    //         CID,
    //         text, 
    //         UID
    //     });
    
    //     if(msg === "success"){
    //         // show sucess msg
    //        setReplyNum(replyNum + 1)
    //     }
    // };
    
    // const deleteReply = async (id) => {
    //     const {
    //         data: { msg },
    //     } = await axios.delete('/api/deleteReply', {
    //         CID,
    //         id
    //     });
    
    //     if(msg === "success"){
    //         // show sucess msg
    //         setReplyNum(replyNum - 1)
    //     }
    // };
    
    // const updateReply = async (id, text) => {
    //     const {
    //         data: { msg },
    //     } = await axios.post('/api/updateReply', {
    //         RID, CID, UID, Content
    //     });
    
    //     if(msg === "success"){
    //         // show sucess msg
    //        setReplyEdit(false)
    //     }
    // };
    

    //const id = props.index > 8 ? (props.index +1) : "0" + (props.index +1)

    return (
        <div className="mb-4">
            <div className="mt-2 d-flex justify-content-between button">
                <div className="mt-2 d-flex align-items-center justify-content-start button">
                    <AccountCircleIcon color="action" className="mr-2" style={{ fontSize:"45" }}></AccountCircleIcon>
                    <div>
                        <h6 className="mb-0">{comment.author.user_id}</h6>
                        <span style={{ fontSize:"small" }}>發布於 {new Date().toLocaleString()}</span>
                    </div>
                </div>
                {
                    comment.author.user_id === UID ? 
                    (<div className="d-flex align-items-center">
                        {/* <Button variant="outline-secondary" size="sm" onClick={() => editCmt(id)}>編輯</Button> */}
                        <a className='ml-3' style={{color: "grey"}}variant="light" onClick={()=>handleDeleteCmt(comment.id)}>
                            <HighlightOffOutlinedIcon style={{fontSize: "30px"}}></HighlightOffOutlinedIcon>
                        </a>
                    </div>):
                    null
                }
            </div>
            <Accordion className='mt-4'defaultActiveKey="1">
                <Card>
                    <Accordion.Toggle md="8" style={{ backgroundColor: "white"}}as={Card.Header} eventKey="0" className="d-flex pl-2">
                        {/* <span className="font-weight-bold mr-3">{id}</span> */}
                        <span style={{fontSize:"18px"}}>{comment.content}</span>
                    </Accordion.Toggle>
                    {comment.replies.length === 0 ? 
                        (<Accordion.Collapse eventKey="0">
                            <Card.Body style={{fontSize:"18px"}}>
                                目前尚無回覆
                            </Card.Body>
                        </Accordion.Collapse>) :
                        (comment.replies.map((reply, index) => (
                            <Reply
                                key={index}
                                UID={UID}
                                reply={reply}
                                //deleteReply={deleteReply}
                                //removeReply={removeReply}
                                // editReply={editReply}
                                // updateReply={updateReply}
                                isEdit={isReplyEdit}
                            />
                        )))
                    }
                </Card>
            </Accordion>
            <div className="mt-4 mr-3 d-flex justify-content-end align-items-center">
                    {
                        comment.followers && comment.followers.length && comment.followers.user_id.includes(UID) ? 
                        <FavoriteIcon style={{color: "red"}} onClick={() => handleFollow(comment.id, "FOLLOW", UID)}></FavoriteIcon > :
                        <FavoriteBorderOutlinedIcon style={{color: "grey"}} onClick={() => handleFollow(comment.id, "FOLLOW", UID)}></FavoriteBorderOutlinedIcon>
                    }
                    <span className='mr-3 ml-3'>{comment.followers.length}</span>
                    <ModeCommentOutlinedIcon style={{color: "grey"}} >回覆</ModeCommentOutlinedIcon>
                    <span className='mr-3 ml-3'>{comment.replies.length}</span> 
                    <ReplyOutlinedIcon color={isReplied?"disabled":"grey"}  size="md" onClick={() => setIsReplied(! isReplied)}>新增回覆</ReplyOutlinedIcon>
                    {isReplied ? <ReplyForm UID={UID} CID={comment.id} addReply={addReply} />:null}
            </div>
        </div>
    )
};
 
export default Comment;