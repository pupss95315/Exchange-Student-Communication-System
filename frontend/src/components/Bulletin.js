import React, { useState } from 'react';
import Comment from "../components/Comment";
import CommentForm from "../components/CommentForm";
import { Row, Col, Card, Container, Nav, Form, Button, Alert, Modal } from 'react-bootstrap';
import { useQuery, useMutation } from '@apollo/react-hooks';
import {
    CREATE_COMMENT_MUTATION,
    DELETE_COMMENT_MUTATION,
    UPDATE_COMMENT_MUTATION,
    COMMENT_QUERY
} from '../graphql';

const Bulletin = ({me}) => {
    const [comments, setComments] = useState([]);
    const [isEdit, setEdit] = useState(false);
    const [sort, setSort] = useState("最新");
    const [section, setSection] = useState("全體留言板");
    const [show, setShow] = useState(false);
    const [isAlert, setIsAlert] = useState(false);

    // Mutation functions
    const [addCmt] = useMutation(CREATE_COMMENT_MUTATION);
    const [deleteCmt] = useMutation(DELETE_COMMENT_MUTATION);
    const [updateCmt] = useMutation(UPDATE_COMMENT_MUTATION);

    // Query functions
    const { loading, error, data, subscribeToMore } = useQuery(COMMENT_QUERY);
    
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

    const addComment = text => {
      const newComments = [...comments, text];
      setComments(newComments);
      setShow(true);
    };

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

    const showAlert = (
        <Modal
            size="sm"
            show={show}
            onHide={() => setShow(false)}
            aria-labelledby="example-modal-sizes-title-sm"
        >
            <Modal.Header closeButton>留言新增成功 !</Modal.Header>
        </Modal>
    )


    return (
      <>
        <Row md="9" className="align-items-cneter justify-content-between">
          <Nav md="8" variant="tabs" defaultActiveKey="/mainPage">
              <Nav.Item>
                  <Nav.Link href="/mainPage" style={{ color: "black" }}>全部</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                  <Nav.Link eventKey="focus" style={{ color: "black" }}>已關注</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                  <Nav.Link eventKey="reply" style={{ color: "black" }}>已回覆</Nav.Link>
              </Nav.Item>
          </Nav>
          <Col md="4">
              <div className="d-flex align-items-end justify-content-end"> 
                  <h6 style={{ width: '20%' }}>排序依</h6>
                  <Form.Control as="select" value={sort} className="ml-3" style={{ width: '5%' }} onChange={e => setSort(e.target.value)}>
                      <option value="最新">最新</option>
                      <option value="最受歡迎">最受歡迎</option>
                      <option value="最多人回覆">最多人回覆</option>
                  </Form.Control>
              </div>
          </Col>
        </Row>
        <CommentForm md="9" addCmt={addCmt}></CommentForm>
        {comments.map((comment, index) => (
          <Comment
              key={index}
              id={index}
              comment={comment}
            //   removeComment={removeComment}
            //   editComment={editComment}
            //   updateComment={updateComment}
              isEdit={isEdit}
              deleteCmt={deleteCmt}
              updateCmt={updateCmt}
              editComment={editCmt}
          />
        ))}
    </>
  )
}

export default Bulletin ;