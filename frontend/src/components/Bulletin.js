import React, { useState, useEffect } from 'react';
import Comment from "./Comment";
// import Sort from "./Sort";
import CommentForm from "./CommentForm";
import { Row, Col, Card, Container, Nav, Form, Button, Alert, Modal } from 'react-bootstrap';
import { useQuery, useMutation } from '@apollo/client';
import {
    CREATE_COMMENT_MUTATION,
    DELETE_COMMENT_MUTATION,
    UPDATE_COMMENT_MUTATION,
    COMMENT_QUERY,
    COMMENT_SUBSCRIPTION,
    DELETE_REPLY_MUTATION,

} from '../graphql';
import InputGroupWithExtras from 'react-bootstrap/esm/InputGroup';

const Bulletin = ({ UID, setShow, msg, setMsg, group }) => {
    const [comments, setComments] = useState([]);
    const [isEdit, setEdit] = useState(false);

    // Mutation functions
    const [addCmt] = useMutation(CREATE_COMMENT_MUTATION);
    const [deleteCmt] = useMutation(DELETE_COMMENT_MUTATION);
    const [updateCmt] = useMutation(UPDATE_COMMENT_MUTATION);
    const [deleteReply] = useMutation(DELETE_REPLY_MUTATION);

    // Query functions
    console.log("group: ", group)
    const { loading, error, data, subscribeToMore } = useQuery(COMMENT_QUERY, { variables: { group: group } });
    console.log("comment data: ", data)

    const handleDeleteCmt = async (id) => {
      console.log(id)
      const res = await deleteCmt({ variables: { CID: id } })
      // if(res.deleteCmt === "success")
      console.log(res)
      setMsg("留言刪除成功")
      setShow(true)
    }

    const handleFollow = async (CID, type, data) => {
      // isFocus ? setFocusNum(focusNum - 1) : setFocusNum(focusNum + 1)
      // setIsFocus(!isFocus)
      console.log(CID)
      console.log(type)
      console.log(data)
      const res = await updateCmt( { variables: { CID: CID, type: type, data: data } } )
      console.log(res)

      // if(res.updateCmt === "success"){
      //}
    }

    const handleDeleteReply = async (RID) => {
      console.log(RID)
      const res = await deleteReply({ variables: { RID: RID } })
      console.log(res)
      if(res.deleteReply === "success"){
          setMsg("回覆新增成功")
          setShow(true)
      }
    }

    useEffect(() => {
        try {
            subscribeToMore({
                document: COMMENT_SUBSCRIPTION,
                updateQuery: (prev, { subscriptionData }) => {
                  console.log(subscriptionData.data.comment.mutation)
                    if (!subscriptionData.data) return prev;
                    const mutation = subscriptionData.data.comment.mutation
                    switch(mutation){
                      case "CREATED":
                        var newComment = subscriptionData.data.comment.data;
                        return {
                          comments: [newComment, ...prev.comments],
                        }
                      case "DELETED":
                        var newComment = subscriptionData.data.comment.data;
                        //const deletedComment = subscriptionData.data.comment.data;
                        var newComments = prev.comments.filter(cmt => cmt.id !== newComment.id)
                        //console.log(newComments)
                        return {
                          comments: newComments
                        }
                      case "UPDATED":
                        console.log(true)
                        console.log(subscriptionData.data.reply)
                        if(subscriptionData.data.comment){
                          var newComment = subscriptionData.data.comment.data;
                          var index = prev.comments.findIndex(cmt => cmt.id === newComment.id)
                          var newComments = [...prev.comments]
                          newComments.splice(index, 1, newComment)
                          console.log(newComments)
                          return {
                            comments: newComments
                          }
                        }
                        else if(subscriptionData.data.reply){
                          
                        }
                      default :
                        break;
                    }
                  },
                });
            } catch (e) {}
    }, [subscribeToMore]);

    // const addComment = text => {
    //   const newComments = [...comments, text];
    //   setComments(newComments);
    //   setShow(true);
    // };

    // const addCmt = text => {
    //   const newComments = [...comments, text];
    //   setComments(newComments);
    //   //setShow(true);
    // };

    // const removeComment = id => {
    //     const newComments = [...comments];
    //     newComments.splice(id, 1);
    //     setComments(newComments);
    // };
  
    const editCmt = (id) => {
        setEdit(true);
    };
    
    // const updateComment = (id, text) => {
    //     console.log(text)
    //     let newComments = comments.map((comment) => {
    //         if (comment.id === id) {
    //           comment.text = text;
    //         }
    //         return comment;
    //     });
    //     setComments(newComments);
    //     setEdit(false)
    // };

    // console.log(data)

    return (
      <>
        <CommentForm md="9" UID={UID} addCmt={addCmt} group={group} ></CommentForm>
        <Row md="9" className="mt-4 align-items-cneter justify-content-between">
          <Col md="4">
              {/* <Sort sort={sort} setSort={setSort}></Sort> */}
          </Col>
        </Row>
        { data? data.comments.map((comment, index) => (
          <Comment
              key={index}
              UID={UID}
              comment={comment}
              isEdit={isEdit}
              handleDeleteCmt={handleDeleteCmt}
              handleFollow={handleFollow}
              handleDeleteReply={handleDeleteReply}
              editComment={editCmt}
          />
        )): null
        }
    </>
  )
}

export default Bulletin ;