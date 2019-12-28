import { gql } from "apollo-boost";

export const LOAD_AGENT = gql`
    {
        agents {
            id
            name
            email
            phone
            address
            zipcode
        }
    }
`;