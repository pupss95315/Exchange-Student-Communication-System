import React, { useState } from 'react';
import Comment from "./Comment";
import Sort from "./Sort";
import CommentForm from "./CommentForm";
import { Row, Col, Card, Container, Nav, Form, Button, Alert, Modal } from 'react-bootstrap';
import { useQuery, useMutation } from '@apollo/client';
import {
    CREATE_COMMENT_MUTATION,
    DELETE_COMMENT_MUTATION,
    UPDATE_COMMENT_MUTATION,
    COMMENT_QUERY
} from '../graphql';

const Bulletin = ({me, UID, show, setShow, showAlert, msg, setMsg}) => {
    const [comments, setComments] = useState([]);
    const [isEdit, setEdit] = useState(false);
    const [section, setSection] = useState("全體留言板");
    const [isAlert, setIsAlert] = useState(false);

    // Mutation functions
    const [addCmt] = useMutation(CREATE_COMMENT_MUTATION);
    const [deleteCmt] = useMutation(DELETE_COMMENT_MUTATION);
    const [updateCmt] = useMutation(UPDATE_COMMENT_MUTATION);

    // Query functions
    const { loading, error, data, subscribeToMore } = useQuery(COMMENT_QUERY);
    // console.log(id)
    console.log(data)
    const handleDeleteCmt = async (id) => {
      console.log(id)
      const res = await deleteCmt({ variables: {CID: id } })
      // if(res.deleteCmt === "success")
      console.log(res)
      setMsg("留言刪除成功")
      setShow(true)
    }
    // useEffect(() => {
    //     try {
    //         subscribeToMore({
    //             document: COMMENT_SUBSCRIPTION,
    //             updateQuery: (prev, { subscriptionData }) => {
    //                 if (!subscriptionData.data) return prev;
    //                     const newComment = subscriptionData.data.comment.data;
    //                     return {
    //                         ...prev,
    //                         comments: [newComment, ...prev.comments],
    //                     };
    //                 },
    //             });
    //         } catch (e) {}
    // }, [subscribeToMore]);

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

    const removeComment = id => {
        const newComments = [...comments];
        newComments.splice(id, 1);
        setComments(newComments);
    };
  
    const editCmt = (id) => {
        setEdit(true);
    };
    
    const updateComment = (id, text) => {
        console.log(text)
        let newComments = comments.map((comment) => {
            if (comment.id === id) {
              comment.text = text;
            }
            return comment;
        });
        setComments(newComments);
        setEdit(false)
    };

    return (
      <>
        <CommentForm md="9" UID={UID} addCmt={addCmt}></CommentForm>
        <Row md="9" className="mt-4 align-items-cneter justify-content-between">
          <Col md="4">
              {/* <Sort sort={sort} setSort={setSort}></Sort> */}
          </Col>
        </Row>
        { data?data.comments.map((comment, index) => (
          <Comment
              key={index}
              UID={UID}
              comment={comment}
            //   removeComment={removeComment}
            //   editComment={editComment}
            //   updateComment={updateComment}
              isEdit={isEdit}
              handleDeleteCmt={handleDeleteCmt}
            //   updateCmt={updateCmt}
              editComment={editCmt}
          />
        )): null
        }
    </>
  )
}

export default Bulletin ;