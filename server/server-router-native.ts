/** https://medium.com/deno-the-complete-reference/a-comprehensive-guide-to-http-servers-in-deno-410227c1a45a
*/
type RequestHandler = (
  request: Request,
  params: Record<string, string>
) => Promise<Response>;

class Router {
  #routes: Record<string, Array<any>> = {
    'GET': [],
    'POST': [],
    'PUT': []
  }
  add(method: string, pathname: string, handler: RequestHandler) {
    this.#routes[method].push({ pattern: new URLPattern({ pathname }), handler });
  }
  async route(req: Request) {
    for (const r of this.#routes[req.method]) {
      if (r.pattern.test(req.url)) {
        const params = r.pattern.exec(req.url).pathname.groups;
        return await r['handler'](req, params);
      }
    }
    return new Response(null, { status: 404 });
  }
}
const router = new Router();

const getUser = async (req: Request, params: Record<string, string>): Promise<Response> => new Response('get user handler');
const addUser = async (req: Request, params: Record<string, string>): Promise<Response> => new Response('add user handler');
const updateUser = async (req: Request, params: Record<string, string>): Promise<Response> => new Response('update user handler');
const addImage = async (req: Request, params: Record<string, string>): Promise<Response> => new Response('add image handler');

router.add('GET', '/api/users/:userid', getUser);
router.add('POST', '/api/users/:userid', updateUser);
router.add('PUT', '/api/users/', addUser);
router.add('GET', '/api/users/:userid/images/:imageid', addImage);

async function reqHandler(req: Request) {
  return await router.route(req);
}
Deno.serve(reqHandler, { port: 8000 });

