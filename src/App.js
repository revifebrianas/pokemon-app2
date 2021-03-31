import React, {useState, useMemo} from 'react';
import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client';
import {HashRouter, NavLink, Route} from "react-router-dom";
import {css} from "@emotion/css";
import {PokemonList} from "./components/PokemonList";
import {MyPokemonList} from "./components/MyPokemonList";
import {PokemonDetail} from "./components/PokemonDetail";
import {PokemonContext} from "./context/PokemonContext";

export function App() {
    const client = new ApolloClient({
        uri: 'https://graphql-pokemon2.vercel.app/',
        cache: new InMemoryCache(),
    });

    const [myPokemons, setMyPokemons] = useState([])
    const [selectedPokemon, setSelectedPokemon] = useState({})
    const pokemonProviderValue = useMemo(()=>({myPokemons, setMyPokemons, selectedPokemon, setSelectedPokemon}), [myPokemons, setMyPokemons, selectedPokemon, setSelectedPokemon])

    return (
        <ApolloProvider client={client}>
            <HashRouter>
                <div>
                    <ul className={css({
                        backgroundColor: "#A7A8A2",
                        padding: 0,
                        fontVariantCaps: "small-caps",
                        textAlign: "center",
                        fontSize: 20,
                        fontWeight: "bold",
                        borderRadius: 15
                    })}>
                        <li className={css`
                            display: inline;
                            list-style-type: none;
                            margin: 0;
                        `}>
                            <NavLink to="/">
                                <div className={css`
                                    font-weight: bold;
                                    text-decoration: none;
                                    padding: 20px;
                                    display: inline-block;
                                    &:hover {
                                        color: white;
                                    }
                                    color: #5a5a5a
                                `}>
                                    Pokemon List
                                </div>
                            </NavLink>
                        </li>
                        <li className={css`
                            display: inline;
                            list-style-type: none;
                            margin: 0;
                        `}>
                            <NavLink to="/my-pokemon-list">
                                <div className={css`
                                    font-weight: bold;
                                    text-decoration: none;
                                    padding: 20px;
                                    display: inline-block;
                                    &:hover {
                                        color: white;
                                    }
                                     color: #5a5a5a
                                `}>
                                    My Pokemon List
                                </div>
                            </NavLink>
                        </li>
                    </ul>
                    <div>
                        <PokemonContext.Provider value={pokemonProviderValue}>
                            <Route exact path="/" component={PokemonList}/>
                            <Route path="/my-pokemon-list" component={MyPokemonList}/>
                            <Route path="/detail" component={PokemonDetail}/>
                        </PokemonContext.Provider>
                    </div>
                </div>
            </HashRouter>
        </ApolloProvider>
    );
}

