import React, {useContext} from 'react';
import {css, keyframes} from '@emotion/css'
import {PokemonContext} from "../context/PokemonContext";

export function PokemonDetail() {

    const bounce = keyframes({
        'from, 90%, 93%, 80%, to': {
            transform: 'translate3d(0,0,0)'
        },
        '90%, 90%': {
            transform: 'translate3d(0, -100px, 0)'
        }
    })

    const {myPokemons, setMyPokemons} = useContext(PokemonContext)
    const {selectedPokemon} = useContext(PokemonContext)
    const selectedPokemonLS = localStorage.getItem("selectedPokemon");
    const tempSelectedPokemonLS = JSON.parse(selectedPokemonLS);
    console.log("tempSelectedPokemonLS", tempSelectedPokemonLS)

    function onClickCatchPokemon(imageUrl) {
        let myPokemonsLS = localStorage.getItem("myPokemons");
        let pokemonNickname = prompt("Please enter your pokemon nickname:");
        if (pokemonNickname === null || pokemonNickname === "") {
            alert("Pokemon Nickname is required")
        } else {
            let found = false;
            let tempMyPokemons = JSON.parse(myPokemonsLS);
            if (tempMyPokemons !== null) {
                for (let i = 0; i < tempMyPokemons.length; i++) {
                    if (tempMyPokemons[i].pokemonNickName === pokemonNickname) {
                        found = true;
                        break;
                    }
                }
            }

            if (found) {
                alert("Pokemon Nickname already exists")
            } else {
                myPokemons.push({"pokemonNickName": pokemonNickname, "imageUrl": imageUrl})
                setMyPokemons(myPokemons);
                localStorage.setItem("myPokemons", JSON.stringify(myPokemons))
            }
        }
    }

    return (
        <div className={css({
            textAlign: "center"
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
                Pokemon Detail
            </div>
            <div className={css({
                height: "auto",
                width: "auto",
                backgroundColor: "#CDB997",
                borderRadius: 15,
                padding: 5,
                marginBottom: 5,
                color: "white",
                fontFamily: "monospace",
                fontSize: 18
            })}>
                No : {tempSelectedPokemonLS === null ? selectedPokemon.number : tempSelectedPokemonLS.number}
            </div>
            <div className={css({
                height: "auto",
                width: "auto",
                backgroundColor: "#CDB997",
                borderRadius: 15,
                padding: 5,
                marginBottom: 5,
                color: "white",
                fontFamily: "monospace",
                fontSize: 18
            })}>
                Name : {tempSelectedPokemonLS === null ? selectedPokemon.name : tempSelectedPokemonLS.name}
            </div>
            <div className={css({
                height: "auto",
                width: "auto",
                backgroundColor: "#CDB997",
                borderRadius: 15,
                padding: 5,
                marginBottom: 5,
                color: "white",
                fontFamily: "monospace",
                fontSize: 18
            })}>
                Classification
                : {tempSelectedPokemonLS === null ? selectedPokemon.classification : tempSelectedPokemonLS.classification}
            </div>
            <div className={css({
                height: "auto",
                width: "auto",
                backgroundColor: "#CDB997",
                borderRadius: 15,
                padding: 5,
                marginBottom: 5,
                color: "white",
                fontFamily: "monospace",
                fontSize: 18
            })}>
                <p>Types : {tempSelectedPokemonLS === null ? selectedPokemon.types : tempSelectedPokemonLS.types}</p>
            </div>
            <div>
                <img src={tempSelectedPokemonLS === null ? selectedPokemon.image : tempSelectedPokemonLS.image}
                     alt={tempSelectedPokemonLS === null ? selectedPokemon.name : tempSelectedPokemonLS.name}
                     className={css({
                         animation: `${bounce} 1s ease infinite`,
                         width: 150,
                         height: 150,
                         marginTop: 70
                     })}
                />
            </div>
            <button className={css({
                marginTop: 50,
                backgroundColor: "#B6D7C2",
                borderRadius: 15,
                padding: 15,
                color: "#5a5a5a",
                border: "white"
            })}
                    onClick={() => onClickCatchPokemon(tempSelectedPokemonLS === null ? selectedPokemon.image : tempSelectedPokemonLS.image)}
            >
                Catch Me!
            </button>
        </div>
    )
}