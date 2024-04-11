import { AcornRouter } from "../deps.js";

const randomNumber = () => {
  return Math.floor(Math.random() * 100) + 1;
};

const BOOKS = {
  "1": {
    id: 1,
    title: "Beep Boop"
  },
  "2": {
    id: 2,
    title: "Beep Boop II"
  },
}

const router = new AcornRouter();

router.get("/", () => ({ hello: "world" }));
router.get("/htmx", () => (`<main>
<h1>HTMX ${randomNumber()}</h1>
<p>Hello, world!</p>
<button hx-get="http://localhost:8000/htmx" hx-trigger="click" hx-target="main" hx-swap="outerHTML">
  Get <code>htmx</code> fragment.
</button>
</main>
`));
router.get("/books/:id", (ctx) => BOOKS[ctx.params.id]);

router.listen({ port: 8000 });
