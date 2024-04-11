import { log } from '../widgets/main.js'

let resp = await fetch("https://pokeapi.co/api/v2/pokemon/ditto")

// console.log(resp)
// console.log(resp.headers)
log("content-type", resp.headers.get("Content-Type"))
// console.log(await resp.text())


resp = await fetch("https://example.com");
log("arrayBuffer", await resp.arrayBuffer())


// stream response body

// TypeScript
/* resp = await fetch("https://example.com");
for await (const chunk of resp.body!) {
  console.log("chunk", chunk);
} */

fetch("https://example.com")
  .then(async (resp) => {
    const reader = resp.body.getReader();
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      log("chunk", value);
    }
  })
  .catch((error) => {
    console.error("Fetch error:", error);
  });


// request: method, headers, body
const body = `{"name": "Deno"}`;
resp = await fetch("https://example.com", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "X-API-Key": "foobar",
  },
  body,
});

const resp_info = {
  method: resp.status,
  headers: resp.headers,
  body: await resp.text(),
}
log("basic-request", await resp_info)
  
const req = new Request("https://example.com", {
  method: "GET",
});
resp = await fetch(req);

log("Request", resp)

