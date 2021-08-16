import axios from 'axios';

const fetchPokemon = async (pokemonUrl) => {
    try {
        const response = await axios.get(pokemonUrl);
        const pokemonAttribute = await axios.get(response.data.species.url);

        if (response.status === 200) {
            const pokemon = response.data;

            return {
                status: response.status,
                message: response.message,
                id: pokemon.id.toString(),
                name: pokemon.name,
                imageUrl: pokemon.sprites.other["official-artwork"].front_default,
                moves: [pokemon.moves[0].move.name, pokemon.moves[1].move.name, pokemon.moves[2].move.name],
                types: pokemon.types.map(type => type.type.name),
                color: pokemonAttribute.data.color.name
            };
        } else {
            return {
                status: response.status,
                message: response.message
            };
        }
    } catch (error) {
        return error;
    };
}

export default fetchPokemon;