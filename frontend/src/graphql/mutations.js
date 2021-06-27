import { gql } from '@apollo/client';

export const UPDATE_USER_MUTATION = gql`
  mutation updateUser($UID: String!, $data: UpdateUserInput!) {
        updateUser(UID: $UID, data: $data)
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
  mutation createComment($UID: String!, $content: String!, $group: GroupType) {
        createComment(UID: $UID, content: $content, group: $group) {
            content
        }
    }
`;

export const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($CID: String!) {
        deleteComment(CID: $CID)
    }
`;

export const UPDATE_COMMENT_MUTATION = gql`
  mutation updateComment($CID: String!, $type: UpdateType!, $data: String!) {
    updateComment(CID: $CID, type: $type, data: $data){
            id, 
            content
        }
    }
`;

export const CREATE_REPLY_MUTATION = gql`
  mutation createReply($UID: String!, $CID: String!, $content: String!) {
    createReply(UID: $UID, CID: $CID, content: $content){
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