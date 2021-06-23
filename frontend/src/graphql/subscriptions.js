import { gql } from '@apollo/client';

export const REPLY_SUBSCRIPTION = gql`
    subscription reply($cid: ID!) {
        reply(cid: cid) {
            data {
                id,
                author{
                    id
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