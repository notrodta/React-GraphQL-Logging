import { gql } from "@apollo/client";

export const LOAD_USERS = gql`
  query {
    getAllUsers {
      testsa
      id
      firstName
      email
      password
    }
  }
`;
