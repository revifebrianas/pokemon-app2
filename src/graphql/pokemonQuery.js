import {gql} from "@apollo/client/core";

export const GET_POKEMONS = gql`
    query pokemons($first:Int!) {
        pokemons(first: $first) {
           id
            name
            image
            number
            classification
            types
        }
    }
    `;

export const GET_POKEMON = gql`
    query pokemon($id:String) {
        pokemon(id: $id) {
            id
            name
            image
            number
            classification
            types
        }
    }
    `;