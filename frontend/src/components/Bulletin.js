import React, { useState, useEffect } from 'react';
import Comment from "./Comment";
import Sort from "./Sort";
import CommentForm from "./CommentForm";
import { Row, Col } from 'react-bootstrap';
import { useQuery } from '@apollo/client';
import {
    COMMENT_QUERY,
    COMMENT_SUBSCRIPTION,
} from '../graphql';

const Bulletin = ({ UID, setShow, setMsg, group, type, search }) => {
    //console.log("group, type: ", group, type)
    if (type === "ALL")
      type = null;
    var queryData = (type === null)? null: UID;
    if (type === "SEARCH")
      queryData = search;
    
    //console.log("queryData: ", queryData)
    const { loading, error, data, subscribeToMore } = useQuery(COMMENT_QUERY, { variables: { group: group, type: type, data: queryData } });
    const [sort, setSort] = useState("最新");

    const handleSort = (attribute) => {
      console.log(attribute)
      // if(data){
      //   switch(attribute){
      //     case "datetime":
      //       console.log(true)
      //       data.comments.sort(function(a, b){
      //         return b[attribute]-a[attribute]
      //       })
      //     case "關注":
      //       console.log(true)
      //       var temp = data.comments.sort(function(a, b){
      //         return b.followers.length-a.followers.length
      //       })
      //       console.log(temp)
      //   }
      // }
    }
    console.log("comment data: ", data)
    if (!loading)
      console.log("comment data: ", data)

    useEffect(() => {
        try {
            subscribeToMore({
                document: COMMENT_SUBSCRIPTION,
                updateQuery: (prev, { subscriptionData }) => {
                  console.log(subscriptionData.data.comment.mutation)
                    if (!subscriptionData.data) return prev;
                    const mutation = subscriptionData.data.comment.mutation
                    var newComment, newComments;
                    switch(mutation){
                      case "CREATED":
                        newComment = subscriptionData.data.comment.data;
                        return {
                          comments: [newComment, ...prev.comments],
                        }
                      case "DELETED":
                        newComment = subscriptionData.data.comment.data;
                        //const deletedComment = subscriptionData.data.comment.data;
                        newComments = prev.comments.filter(cmt => cmt.id !== newComment.id)
                        //console.log(newComments)
                        return {
                          comments: newComments
                        }
                      case "UPDATED":
                        //console.log(true)
                        newComment = subscriptionData.data.comment.data;
                        var index = prev.comments.findIndex(cmt => cmt.id === newComment.id)
                        newComments = [...prev.comments]
                        newComments.splice(index, 1, newComment)
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
        <Row md="9" className="m-1 pb-5 align-items-cneter justify-content-between">
          <CommentForm md="9" UID={UID} group={group} ></CommentForm>
          <Sort sort={sort} handleSort={handleSort} setSort={setSort}></Sort>
        </Row>
        { data? data.comments.map((comment, index) => (
          <Comment
              key={index}
              UID={UID}
              comment={comment}
              setShow={setShow}
              setMsg={setMsg}
          />
        )): null
        }
    </>
  )
}

export default Bulletin ;