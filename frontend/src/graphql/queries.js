import { gql } from '@apollo/client';

export const USER_QUERY = gql`
  query{
    users{
        id,
        GPA,
        college,
        school,
        isRegistered,
        duration,
        languageExam,
        apply_list
    }
  }
`;

export const COMMENT_QUERY = gql`
  query{
    comments{
        id,
        author{
            id
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
