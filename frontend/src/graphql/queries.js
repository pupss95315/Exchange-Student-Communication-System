import { gql } from '@apollo/client';

export const USER_QUERY = gql`
  query($UID: String, $group: GroupType){
    users(UID: $UID, group: $group){
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
  query{
    comments{
        id,
        author{
            user_id
        },
        content,
        followers{
            id
        },
        replies
    }
  }
`;

export const ME_QUERY = gql`
  query{
    me{
        id
    }
  }
`;
