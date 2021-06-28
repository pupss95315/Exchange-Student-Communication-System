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

const Bulletin = ({ UID, setShow, msg, setMsg, group }) => {
    console.log(group);
    const [comments, setComments] = useState([]);
    const [isEdit, setEdit] = useState(false);

    // Mutation functions
    const [addCmt] = useMutation(CREATE_COMMENT_MUTATION);
    const [deleteCmt] = useMutation(DELETE_COMMENT_MUTATION);
    const [updateCmt] = useMutation(UPDATE_COMMENT_MUTATION);

    // Query functions
    const { loading, error, data, subscribeToMore } = useQuery(COMMENT_QUERY, { variables: { group: group } });
    console.log(data)

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
  
    const editCmt = (id) => {
        setEdit(true);
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
              isEdit={isEdit}
              handleDeleteCmt={handleDeleteCmt}
              handleFollow={handleFollow}
              editComment={editCmt}
          />
        )): null
        }
    </>
  )
}

export default Bulletin ;