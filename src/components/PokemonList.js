import React, {useContext} from 'react';
import {useQuery} from "@apollo/client";
import {GET_POKEMONS} from "../graphql/pokemonQuery";
import {Link} from "react-router-dom";
import {css} from '@emotion/css';
import {PokemonContext} from "../context/PokemonContext";

export function PokemonList() {
    const {selectedPokemon, setSelectedPokemon} = useContext(PokemonContext);

    const {
        data: {
            pokemons = []
        } = {}
    } = useQuery(GET_POKEMONS, {
        variables: {first: 15},
    });

    function onClickDetailPokemon(pokemon) {
        setSelectedPokemon(pokemon);
        localStorage.setItem("selectedPokemon", JSON.stringify({
            "id": pokemon.id,
            "name": pokemon.name,
            "image": pokemon.image,
            "classification": pokemon.classification,
            "number": pokemon.number,
            "types": pokemon.types
        }))
    }

    return (
        <div className={css({
            maxWidth: '1200px',
            margin: '0 auto'
        })}>
            <div className={css({
                padding: 20,
                fontSize: 18,
                fontFamily: "monospace",
                letterSpacing: 7,
                textAlign: "center",
                color: "#5a5a5a",
                fontWeight: "bold"
            })}>
                Pokemon List
            </div>
            <ul className={css({
                display: 'flex',
                flexWrap: 'wrap',
                listStyle: 'none'
            })}>
                {pokemons.map(pokemon =>
                    <li className="cards_item" key={pokemon.id}>
                        <div className={css({
                            backgroundColor: 'white',
                            borderRadius: '0.25rem',
                            boxShadow: '0 20px 40px -14px rgba(0, 0, 0, 0.25)',
                            display: 'flex',
                            flexDirection: 'column',
                            overflow: 'hidden'
                        })}>
                            <Link to="/detail">
                                <img src={pokemon.image}
                                     alt={pokemon.name}
                                     className={css({
                                         width: 200,
                                         height: 200,
                                         padding: 20
                                     })}
                                     onClick={() => onClickDetailPokemon(pokemon)}
                                />
                            </Link>
                            <div className={css({
                                padding: '1rem',
                                backgroundColor: '#CDB997'
                            })}>
                                <div className={css({
                                    textAlign: "center",
                                    color: "white",
                                    fontFamily: "monospace",
                                    fontSize: 18,
                                    letterSpacing: 7,
                                    fontWeight: "bold"
                                })}>
                                    {pokemon.name}
                                </div>
                            </div>
                        </div>
                    </li>
                )}
            </ul>
        </div>
    )
}
