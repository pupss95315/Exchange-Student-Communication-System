import { gql } from '@apollo/client';

export const UPDATE_USER_MUTATION = gql`
  mutation updateUser($id: ID!, $data: UpdateUserInput!) {
        updateUser(id: $id, data: $data) {
            id
        }
    }
`;

export const CREATE_USER_MUTATION = gql`
  mutation createUser($UID: String!, $password: String!) {
        createUser(UID: $UID, password: $password){
            pasword
        }
    }
`;

export const CREATE_COMMENT_MUTATION = gql`
  mutation createComment($data: CreateCommentInput!) {
        createComment(data: $data) {
            id,
            content
        }
    }
`;

export const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($id: ID!) {
        deleteComment(id: $id){
            id, 
            content
        }
    }
`;

export const UPDATE_COMMENT_MUTATION = gql`
  mutation updateComment($id: ID!, $data: UpdateCommentInput!) {
    updateComment(id: $id, data: $data){
            id, 
            content
        }
    }
`;

export const CREATE_REPLY_MUTATION = gql`
  mutation createReply($data: CreateReplyInput!) {
    createReply(data: $data){
            id,
            content
        }
    }
`;

export const DELETE_REPLY_MUTATION = gql`
  mutation deleteReply($id: ID!) {
    deleteReply(id: $id){
            id,
            content
        }
    }
`;

export const UPDATE_REPLY_MUTATION = gql`
  mutation updateReply($id: ID!, $data: UpdateReplyInput!) {
    updateReply(id: $id, data: $data){
            id,
            content
        }
    }
`;