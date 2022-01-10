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
      school {
        school_name
      },
      isRegistered,
      duration,
      languageExam,
      apply_list {
        school_name
      },
      password
    }
  }
`;

export const SCHOOL_QUERY = gql`
  query ($group: GroupType) {
    schools (group: $group) {
      id,
      school_name, 
      semeQuota, 
      headQuota, 
      group
    }
  }
`;

export const COMMENT_QUERY = gql`
  query ($CID: ID, $group: GroupType, $type: QueryType, $data: String) {
    comments (CID: $CID, group: $group, type: $type, data: $data) {
      author {
        id
        user_id
      }
      id
      content
      replies {
        id
        author {
          user_id
        }
        content
      }
      followers {
        user_id
      }
      datetime
    }
  }
`;