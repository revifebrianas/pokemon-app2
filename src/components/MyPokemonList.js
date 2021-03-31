import React, {useContext} from 'react';
import {PokemonContext} from "../context/PokemonContext";
import {css} from "@emotion/css";
import {AMP} from 'react-amp-template';

// TODO : Paging, Lazy Load, Responsive

export function MyPokemonList() {
    const {setMyPokemons} = useContext(PokemonContext);
    const myPokemons = localStorage.getItem("myPokemons");
    const poks = JSON.parse(myPokemons);
    const {Title} = AMP

    function onClickRemovePokemon(pokemonNickname) {
        let resultMyPokemons = poks.filter(myPokemon => myPokemon.pokemonNickName !== pokemonNickname);
        setMyPokemons(resultMyPokemons);
        localStorage.setItem("myPokemons", JSON.stringify(resultMyPokemons))
    }

    return (
        <div>
            <div className={css({
                padding: 20,
                fontSize: 18,
                fontFamily: "monospace",
                letterSpacing: 7,
                textAlign: "center",
                color: "#5a5a5a",
                fontWeight: "bold"
            })}>
                <Title>My Pokemon List</Title>
            </div>
            {

                poks === null ? <div>Empty</div> : poks.map(
                    myPokemon =>
                        <div key={myPokemon.pokemonNickName}
                             className={css({
                                 border: "5px solid #B6D7C2",
                                 marginBottom: 10,
                                 display: "flex",
                                 alignItems: "center",
                                 borderRadius: 15,
                                 justifyContent: "center"
                             })}>
                            <div className={css({})}>
                                <img src={myPokemon.imageUrl}
                                     alt={myPokemon.pokemonNickName}
                                     className={css({
                                         width: 100,
                                         height: 100,
                                         padding: 10
                                     })}
                                />
                            </div>
                            <div className={css({
                                marginLeft: 5,
                                color: "#5a5a5a",
                                fontFamily: "monospace",
                                fontSize: 18,
                                border: "2px solid #B6D7C2",
                                padding: "5px",
                                borderRadius: 5,
                                letterSpacing: 2,
                                width: 300
                            })}>
                                {myPokemon.pokemonNickName}
                            </div>
                            <div className={css({
                                backgroundColor: "#CDB997",
                                marginLeft: 5,
                                borderRadius: 10
                            })}>
                                <div className={css({
                                    padding: "5px",
                                    color: "white",
                                    fontFamily: "monospace",
                                    fontSize: 16,
                                    letterSpacing: 1,
                                })}
                                     onClick={() => onClickRemovePokemon(myPokemon.pokemonNickName)}
                                >
                                    Remove
                                </div>
                            </div>
                        </div>
                )
            }
        </div>
    )
}