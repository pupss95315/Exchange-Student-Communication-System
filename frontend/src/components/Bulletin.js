import React, { useState, useEffect } from 'react';
import Comment from "./Comment";
import Sort from "./Sort";
import CommentForm from "./CommentForm";
import { Row } from 'react-bootstrap';
import { useQuery } from '@apollo/client';
import {
    COMMENT_QUERY,
    COMMENT_SUBSCRIPTION,
} from '../graphql';
import { Pagination } from '@material-ui/lab'

const Bulletin = ({ UID, setShow, setMsg, group, type, search }) => {
    if (type === "ALL")
      type = null;
    var queryData = (type === null)? null: UID;
    if (type === "SEARCH")
      queryData = search;
      
    const [comments, setComments] = useState([]);
    const [sort, setSort] = useState("最新");
    const [pageNum, setPageNum] = useState(0)
    const [page, setPage] = useState(1)

    const { loading, error, data, subscribeToMore } = useQuery(COMMENT_QUERY, { variables: { group: group, type: type, data: queryData } },
      {
        onCompleted: data => {
            setComments(data.comments)
        },
        fetchPolicy: "no-cache"
      }
     );

    const handlePageChange = (event, value) => {
      setPage(value);
    };

    useEffect(()=>{
      if(data){
        var temp = [...data.comments]
        setComments(temp.reverse())
        setSort("最新")
        //console.log(temp.length)
        if(temp.length % 10 === 0){
          setPageNum(parseInt(temp.length / 10) - 1)
        }
        else{
          setPageNum(parseInt(temp.length / 10))
        }
      }
    }, [data])
    
    
    useEffect(() => {
      if(! loading){
        var temp = JSON.parse(JSON.stringify(data.comments));
        //console.log("comments: ", comments);
        switch(sort) {
          case "最新":
            temp.reverse();
            setComments(temp)
            setPage(1)
            break;
          case "關注":
            temp.reverse();
            temp.sort((a, b) => b.followers.length-a.followers.length);
            setComments(temp)
            setPage(1)
            break;
          case "回覆":
            temp.sort((a, b) => b.replies.length-a.replies.length);
            temp.reverse();
            setComments(temp)
            setPage(1)
            break;
          default:
            break;
        }
      }
    }, [sort])
  
    useEffect(() => {
        try {
            subscribeToMore({
                document: COMMENT_SUBSCRIPTION,
                updateQuery: (prev, { subscriptionData }) => {
                    if (!subscriptionData.data) return prev;
                    const mutation = subscriptionData.data.comment.mutation
                    var newComment, newComments;
                    switch(mutation){
                      case "CREATED":
                        newComment = subscriptionData.data.comment.data;
                        newComments = {
                          comments: [...prev.comments, newComment],
                        }
                        return newComments
                      case "DELETED":
                        newComment = subscriptionData.data.comment.data;
                        newComments = prev.comments.filter(cmt => cmt.id !== newComment.id)
                        return {
                          comments: newComments
                        }
                      case "UPDATED":
                        newComment = subscriptionData.data.comment.data;
                        var index = prev.comments.findIndex(cmt => cmt.id === newComment.id)
                        newComments = [...prev.comments]
                        newComments.splice(index, 1, newComment)
                        console.log(newComment)
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

    //console.log(page)
    return (
      <>
        <Row md="9" className="m-1 pb-5 d-flex align-items-cneter justify-content-between">
          <Sort sort={sort} setSort={setSort}></Sort>
          { (type === null)? <CommentForm UID={UID} group={group} ></CommentForm>: null }
        </Row>
        { data? comments.map((comment, index) => (
          ( index < (page)*10 && index >= (page-1)*10) ? 
            (<Comment
                key={index}
                UID={UID}
                comment={comment}
                setShow={setShow}
                setMsg={setMsg}
            />) 
            : null
        )): null}
        {data && comments.length > 0? <Pagination onChange={handlePageChange} page={page} className="mt-5" count={pageNum + 1} />:null}
    </>
  )
}

export default Bulletin ;