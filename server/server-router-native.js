class Router {
  constructor() {
    this.routes = {
      'GET': [],
      'POST': [],
      'PUT': []
    };
  }

  add(method, pathname, handler) {
    this.routes[method].push({ pattern: new URLPattern({pathname}), handler });
  }

  get(pathname, response) {
    this.add('GET', pathname, response)
  }

  post(pathname, response) {
    this.add('POST', pathname, response)
  }

  put(pathname, response) {
    this.add('PUT', pathname, response)
  }

  async route(req) {
    for (const r of this.routes[req.method]) {
      if (r.pattern.test(req.url)) {
        const params = r.pattern.exec(req.url).pathname.groups;
        return await r.handler(req, params);
      }
    }

    return new Response(null, { status: 404 });
  }
}

const router = new Router();

const getUser = async (req, params) => new Response('get user handler sdlkfjdsf');

const addUser = async (req, params) => new Response('add user handler');

const updateUser = async (req, params) => new Response('update user handler');

const addImage = async (req, params) => new Response('add image handler');

router.get( '/api/users/:userid', getUser);
router.add('POST', '/api/users/:userid', updateUser);
router.add('PUT', '/api/users/', addUser);
router.add('GET', '/api/users/:userid/images/:imageid', addImage);

async function reqHandler(req) {
  return await router.route(req);
}

Deno.serve(reqHandler, { port: 8000 });

