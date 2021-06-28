import { gql } from '@apollo/client';

export const REPLY_SUBSCRIPTION = gql`
    subscription reply{
        reply{
            mutation
            data {
                id,
                author{
                    user_id
                },
                comment{
                    id
                },
                content
            }
        }
    }
`;

export const COMMENT_SUBSCRIPTION = gql`
    subscription comment{
        comment{
            mutation
            data {
                author{
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
    }
`;