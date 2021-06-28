import React, { useState, useEffect } from 'react';
import Comment from "./Comment";
// import Sort from "./Sort";
import CommentForm from "./CommentForm";
import { Row, Col } from 'react-bootstrap';
import { useQuery, useMutation } from '@apollo/client';
import {
    COMMENT_QUERY,
    COMMENT_SUBSCRIPTION,
    DELETE_COMMENT_MUTATION,
    DELETE_REPLY_MUTATION,
    UPDATE_COMMENT_MUTATION

} from '../graphql';
// import InputGroupWithExtras from 'react-bootstrap/esm/InputGroup';
// import { UniqueFieldDefinitionNamesRule } from 'graphql';

const Bulletin = ({ UID, setShow, msg, setMsg, group, type, search }) => {
    const [isEdit, setEdit] = useState(false);

    // Mutation functions
    //const [addCmt] = useMutation(CREATE_COMMENT_MUTATION);
    const [deleteCmt] = useMutation(DELETE_COMMENT_MUTATION);
    const [updateCmt] = useMutation(UPDATE_COMMENT_MUTATION);
    const [deleteReply] = useMutation(DELETE_REPLY_MUTATION);

    // Query functions
    console.log("group, type: ", group, type)
    if (type === "ALL")
      type = null;
    var queryData = (type === null)? null: UID;
    if (type === "SEARCH")
      queryData = search;
    console.log("queryData: ", queryData)
    const { loading, error, data, subscribeToMore } = useQuery(COMMENT_QUERY, { variables: { group: group, type: type, data: queryData } });
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

    // const handleUpdateCmt = async (CID, type, data) => {
    //   console.log(CID)
    //   const res = await updateCmt( { variables: { CID: CID, type: type, data: data } } )
    //   if(res.data.updateComment === "success"){
    //     if(type === "EDIT"){
    //       setMsg("留言更新成功")
    //       setShow(true)
    //     }
    //   }
    // }

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
                        var newComment = subscriptionData.data.comment.data;
                        console.log(newComment.followers)
                        var index = prev.comments.findIndex(cmt => cmt.id === newComment.id)
                        var newComments = [...prev.comments]
                        newComments.splice(index, 1, newComment)
                        console.log(newComments)
                        return {
                          comments: newComments
                        }
                      default :
                        break;
                    }
                  },
                });
            } catch (e) {}
    }, [subscribeToMore]);

    return (
      <>
        <CommentForm md="9" UID={UID} group={group} ></CommentForm>
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
              setShow={setShow}
              setMsg={setMsg}
              //handleUpdateCmt={handleUpdateCmt}
          />
        )): null
        }
    </>
  )
}

export default Bulletin ;