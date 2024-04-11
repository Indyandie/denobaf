const port = 8000
function handler(_req) {
  const body = "Hello, world!"
  const statNum = 200
  const statText = "OK"
  const respHeaders = {
    beep: true,
    cat: 9,
  }
  return new Response(body,{status: statNum, statusText: statText, headers: respHeaders});
}

Deno.serve({port}, handler)

console.log("Server is running on http://localhost:8000");
