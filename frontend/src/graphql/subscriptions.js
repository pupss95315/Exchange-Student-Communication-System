import { gql } from '@apollo/client';

export const REPLY_SUBSCRIPTION = gql`
    subscription($CID: ID!){
        reply(CID: $CID){
            mutation
            data {
                id
                author{
                  user_id
                }
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
    }
`;