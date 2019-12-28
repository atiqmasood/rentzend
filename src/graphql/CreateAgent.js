import { gql } from "apollo-boost";

export const CREATE_AGENT = gql`
    mutation createAgent($name: String!, $email: String!, $phone: String!, $address: String!, $zipcode: String!) {
        createAgent(name: $name, email: $email, phone: $phone, address: $address, zipcode: $zipcode) {
            id
            name
            email
            phone
            address
            zipcode
        }
    }
`;