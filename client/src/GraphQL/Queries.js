import { gql } from "@apollo/client";

export const LOAD_USERS = gql`
  query {
    getAllUsers {
      test
      id
      firstName
      email
      password
    }
  }
`;
