import { csvParse, csvStringify } from '../deps.js'

let pokelist = await fetch("https://pokeapi.co/api/v2/pokemon")

pokelist = await pokelist.text()
pokelist = JSON.parse(pokelist).results

async function fetchPokeData(url) {
  const resp = await fetch(url)
  const text = await resp.text()
  const data = JSON.parse(text)
  const emp = ""
  const types = data.types.reduce((acc, curr) => {
    // return acc.push(curr.type.name)
    return acc + curr.type.name + ", "
  }, emp, )
  const pokeData = {
    order: data.order,
    name: data.name,
    weight: data.weight,
    height: data.height,
    types: data.types[0].type.name,
    // types: types,
    sprite: data.sprites["front_default"],
    cries: data.cries.latest,
  }
  return pokeData
}

let pokemap = await Promise.all( pokelist.map(poke => fetchPokeData(poke.url)))

let pokeCSV = csvStringify(pokemap, {
  columns: [
    'order',
    'name',
    'weight',
    'height',
    'types',
  ] 
})

console.log(pokemap)

await Deno.writeTextFile("poke.csv", pokeCSV)
console.log(await Deno.readTextFile("poke.csv"))
