import { csvParse, csvStringify } from '../deps.js'

// CSV string

let csv = `name,emoji
cat,🐈
dog,🐕
car,🏎️`

// read CSV file

csv = await Deno.readTextFile('test.csv')

// parse string into array of objects
 
const parsedCSV = await csvParse(csv, {
  skipFirstRow: true,
  strip: true,
})

// filter 

let filterCSV = parsedCSV.filter(item => item.name == 'unicorn')
console.log(filterCSV)

console.log("\n\nCSV Parser\n")
console.log(parsedCSV)
console.log(parsedCSV[1])
console.log(parsedCSV[1].name)

// add object to array

parsedCSV.push({ name: "unicorn", emoji: "🦄" })

for (const item of parsedCSV) {
  let csvHTML = `<strong>${item.emoji}</strong>`
  console.log(csvHTML)
}

// convert object to string

let stringCSV = csvStringify(parsedCSV, { columns: ["name", "emoji"] })

console.log(stringCSV)

// write string to file

await Deno.writeTextFile("test.csv", stringCSV)

