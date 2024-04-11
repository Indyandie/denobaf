const port = 8000

const htmx = `<h1>HTMX</h1>
<p>This is an <code>HTML</code> fragment.</p>`

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


  if (request_info.method == "GET") {
    switch (request_info.path_name) {
      case "/htmx":
        return new Response(
          htmx,
          {
            ...status_ok,
            headers: response_header
          }
        );
      default:
        return new Response(
          JSON.stringify(body),
          {
            status: response_status_200,
            statusText: response_status_200_msg,
            headers: response_header
          }
        );
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

