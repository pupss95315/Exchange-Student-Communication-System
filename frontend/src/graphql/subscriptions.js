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
            data {
                id,
                author{
                    id
                },
                content,
                followers{
                    id
                },
            }
        }
    }
`;