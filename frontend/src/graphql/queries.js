import { gql } from '@apollo/client';

export const USER_QUERY = gql`
  query ($UID: String, $group: GroupType) {
    users (UID: $UID, group: $group) {
      id,
      user_id,
      password,
      group,
      GPA,
      college,
      school,
      isRegistered,
      duration,
      languageExam,
      password
    }
  }
`;

export const COMMENT_QUERY = gql`
  query ($CID: ID, $group: GroupType, $type: QueryType, $data: String) {
    comments(CID: $CID, group: $group, type: $type, data: $data){
      author{
        id
        user_id
      }
      id
      content
      replies{
        id
        author{
          user_id
        }
        content
      }
      followers{
        user_id
      }
      datetime
    }
  }
`;