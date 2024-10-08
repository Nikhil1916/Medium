import { Hono } from "hono";
import { cors } from 'hono/cors'
const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string
  };
}>();
import { userRoute } from "./Routes/User";
import { blogRouter } from "./Routes/Blog";

// app.use('/*', cors());
app.use(
  '/*', // You can specify the path pattern here, or use '*' to apply globally
  cors({
    origin: '*', // You can restrict this to your frontend's URL like 'https://your-frontend.com'
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
    allowHeaders: ['Content-Type', 'Authorization'], // Allowed headers
  })
);
app.route("/api/v1/user",userRoute);
app.route("/api/v1/blog",blogRouter);
export default app;

// DATABASE_URL="prisma://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5IjoiODhkODU1MWQtMDE3Ni00MjFiLTg4ZDAtOTQ0Y2NmNjEwYzIyIiwidGVuYW50X2lkIjoiOGNmYzMyNjQxMmUyNjRkZDEzNDU0MzQ4ZDYwZWZhOWRiMGU5NDUyNmE4NWRjYjIyY2NmZDNjZmJlMGE1NTRmZCIsImludGVybmFsX3NlY3JldCI6IjMxN2I3YjJhLTI0YzktNDhlNi1iYzlmLTBjYzdiOTAzMzQ3YiJ9.6dWUN3scpGt7TVXtL5fE1hGSTQcUXOkyizcPsumwT6s"
// DIRECT_URL="<YOUR_DATABASE_CONNECTION_STRING>"
