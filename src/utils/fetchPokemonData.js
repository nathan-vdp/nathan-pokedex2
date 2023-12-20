export async function fetchPokemonData(pokemonName) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
  const data = await response.json();
  const types = data.types.map(typeInfo => typeInfo.type.name); // get the types of the Pokemon
  return { ...data, types }; // return the data along with the types
}
