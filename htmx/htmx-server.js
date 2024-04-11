import { serveDir, serveFile } from "https://deno.land/std@0.207.0/http/file_server.ts";

// Misc

const randomNumber = () => {
  return Math.floor(Math.random() * 100) + 1;
};

// HTMX

const main = () => `<main>
<h1>HTMX ${randomNumber()}</h1>
<p>Hello, world!</p>
<button hx-get="http://localhost:8000/htmx" hx-trigger="click" hx-target="main" hx-swap="outerHTML">
  Get <code>htmx</code> fragment.
</button>
</main>
`

// # Server

const port = 8000

// ## Response Vars

const body_error = { error: "Unsupported method" }
const response_status_200 = 200
const response_status_200_msg = "OK"

const status_ok = {
  status: response_status_200,
  statuText: response_status_200_msg
}

const response_header = {
  beep: true,
  cat: 9,
  "content-type": "application/json"
}

async function handler(req) {
  const url = new URL(req.url)
  const request_info = {
    method: req.method,
    protocal: url.protocol,
    host: url.host,
    path_name: url.pathname,
    queryString_num: url.searchParams.get("num"),
  }

  const request_headers = {
    headers: req.headers, // returns empty object {}
    header_Code: req.headers.get("Code"),
  }

  const body = { request_info, request_headers }

  // Routes

  if (request_info.path_name.startsWith("/fragment")) {
    return serveDir(req, {
      fsRoot: "fragments",
      urlRoot: "fragments",
      showDirListing: true,
      showIndex: false
    });
  } else if (request_info.method == "GET") {
    switch (request_info.path_name) {
      case "/":
        return serveFile(req, './htmx.html');
      case "/htmx":
        return new Response(
      main(),
      {
              status: 200,
              statusText: "OK",
              headers: { "Access-Control-Allow-Origin": "*"}
            }
        );
      // case "/list":
      //   return serveFile(req, './static-fragments/list.html');
      default:
        return new Response(
          "",
          {
            status: 404,
            statusText: "Not Found",
          }
        );

    }
  } else if (request_info.method == "OPTIONS") {
    return new Response(
      "",
      {
        status: 200,
        statusText: "Not allowed",
        headers: {
          "Access-Control-Allow-Origin":  "*",
          "Access-Control-Allow-Headers": "*"
          // "Access-Control-Allow-Origin":  "http://localhost:8080",
          // "Access-Control-Allow-Methods": "GET",
          // "Access-Control-Allow-Headers": "Content-Type, Authorization"
        },
      }
    );
  }else {
    return new Response(
      "",
      {
        status: 405,
        statusText: "Not allowed",
      }
    );
  }
}

Deno.serve({ port }, handler)

console.log(`Server is running on http://localhost:${port}`);

