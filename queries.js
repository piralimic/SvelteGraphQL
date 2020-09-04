import { gql } from "apollo-boost";

export const GET_ANIMALS = gql`
  {
    animal {
      id
      name
      type {
        value
      }
      sex {
        value
      }
      birthdate
      description
      picture_url
      reference_number
      sponsorings {
        sponsor {
          first_name
          last_name
        }
      }
    }
  }
`;
