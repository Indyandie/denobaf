import { serveDir, serveFile } from "https://deno.land/std@0.207.0/http/file_server.ts";

const port = 8000

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


  if (request_info.path_name.startsWith("/static")) {
    return serveDir(req, {
      fsRoot: "dir",
      urlRoot: "static",
      showDirListing: true,
      showIndex: false
    });
  } else if (request_info.method == "GET") {
    switch (request_info.path_name) {
      case "/file":
        return serveFile(req, './files/index.html');
      case "/list":
        return serveFile(req, './files/list.html');
      default:
    }
  } else {
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

