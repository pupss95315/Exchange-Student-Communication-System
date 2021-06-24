import React, { useState } from 'react';
import Reply from "./Reply";
import ReplyForm from "./ReplyForm";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import ModeCommentOutlinedIcon from '@material-ui/icons/ModeCommentOutlined';
import ReplyOutlinedIcon from '@material-ui/icons/ReplyOutlined';
import { Accordion, Card, Button } from 'react-bootstrap';
import { useQuery, useMutation } from '@apollo/react-hooks';
import {
    CREATE_REPLY_MUTATION,
    DELETE_REPLY_MUTATION,
    UPDATE_REPLY_MUTATION,
    REPLY_QUERY
} from '../graphql';

const Comment = ({key, id, comment, deleteCmt, updateCmt, editCmt}) => {
    //const [input, setInput] = useState(props.comment.text);
    const [replies, setReplies] = useState([]);
    const [isReplyEdit, setReplyEdit] = useState(false);
    const [isReplied, setIsReplied] = useState(false);
    const [replyNum, setReplyNum] = useState(0);
    const [focusNum, setFocusNum] = useState(0);
    const [isFocus, setIsFocus] = useState(false);
    const [time, setTime] = useState(Date().toLocaleString());

    //const { loading, error, data, subscribeToMore } = useQuery(REPLY_QUERY, {variables: {query: id} });

    // Mutation functions
    // const [addReply] = useMutation(CREATE_REPLY_MUTATION);
    // const [deleteReply] = useMutation(DELETE_REPLY_MUTATION);
    // const [updateReply] = useMutation(UPDATE_REPLY_MUTATION);

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
    
    const addReply = text => {
        const newReplies = [...replies, text];
        setReplies(newReplies);
        setReplyNum(replyNum + 1)
    };

    const removeReply = id => {
        const newReplies = [...replies];
        newReplies.splice(id, 1);
        setReplies(newReplies);
    };

    const editReply = (id) => {
        setReplyEdit(true);
        //setEdit(false);
    };
    const updateReply = (id, text) => {
        console.log(text)
        let newReplies = replies.map((Reply) => {
            if (Reply.id === id) {
              Reply.text = text;
            }
            return Reply;
        });
        setReplies(newReplies);
        setReplyEdit(false)
    };
    const handleFocus = (e) => {
        isFocus ? setFocusNum(focusNum - 1) : setFocusNum(focusNum + 1)
        setIsFocus(!isFocus)
    }

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
                <div className="mt-2 d-flex justify-content-start button">
                    <AccountCircleIcon color="action" className="mr-2" style={{ fontSize:"45" }}></AccountCircleIcon>
                    <div>
                        <h6 className="mb-0">G01</h6>
                        <span style={{ fontSize:"small" }}>發布於 {new Date().toLocaleString()}</span>
                    </div>
                </div>
                <div className="d-flex align-items-center">
                    {
                        isFocus ? 
                        <FavoriteIcon color="secondary" onClick={(e) => handleFocus(e)}></FavoriteIcon > :
                        <FavoriteBorderOutlinedIcon onClick={(e) => handleFocus(e)}></FavoriteBorderOutlinedIcon>
                    }
                    <span className='mr-3 ml-3'>{focusNum}</span>
                    <ModeCommentOutlinedIcon variant="outline-dark" >回覆</ModeCommentOutlinedIcon>
                    <span className='mr-3 ml-3'>{replyNum}</span> 
                    <ReplyOutlinedIcon  className='ml-3' color={isReplied?"disabled":"outline-dark"}  size="md" onClick={() => setIsReplied(! isReplied)}>新增回覆</ReplyOutlinedIcon>
                    {isReplied ? <ReplyForm addReply={addReply} />:null}
                </div>
                
                {/* <div>
                    <Button variant="outline-dark" size="sm" onClick={() => props.editComment(props.id)}>編輯</Button>
                    <Button className='ml-3' variant="outline-dark" size="sm" onClick={() => props.removeComment(props.id)}>x</Button>
                </div> */}
            </div>
            <Accordion className='mt-3'defaultActiveKey="1">
                <Card>
                    <Accordion.Toggle md="8" as={Card.Header} eventKey="0" className="d-flex pl-2">
                        {/* <span className="font-weight-bold mr-3">{id}</span> */}
                        <span>{comment}</span>
                    </Accordion.Toggle>
                    {replies.length === 0 ? 
                        (<Accordion.Collapse eventKey="0">
                            <Card.Body>
                                目前尚無回覆
                            </Card.Body>
                        </Accordion.Collapse>) :
                        (replies.map((reply, index) => (
                            <Reply
                                key={index}
                                id={index}
                                reply={reply}
                                //deleteReply={deleteReply}
                                //removeReply={removeReply}
                                editReply={editReply}
                                updateReply={updateReply}
                                isEdit={isReplyEdit}
                            />
                        )))
                    }
                </Card>
            </Accordion>
        </div>
    )
};
 
export default Comment;