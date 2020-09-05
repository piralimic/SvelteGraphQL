import { gql } from "apollo-boost";

export const GET_ANIMALS = gql`
  {
    animals {
      id
      name
      species {
        value
      }
      gender {
        id
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
