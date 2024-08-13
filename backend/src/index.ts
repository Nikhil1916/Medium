import { Hono } from 'hono'

const app = new Hono<{
	Bindings: {
		DATABASE_URL: string
	}
}>();
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

app.post('/api/v1/user/signup', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
}).$extends(withAccelerate());
  const body = await c.req.json();
  let user = null;
  try {
     user = await prisma.user.create({
      data:{
        ...body
      }
    })
  } catch(e) {
    console.log(e);
    return c.json({
      error:e
    })
  }
  console.log(body,c.body.toString());
  return c.json({
    user
  })
});

app.post('/api/v1/user/signin', (c) => {
  return c.text('Signin!')
});

app.post('/api/v1/blog', (c) => {
  return c.text('Blog!')
});

app.put('/api/v1/blog', (c) => {
  return c.text('Blog!')
});

app.get('/api/v1/blog/:id', (c) => {
  return c.text('Hello Blog id!')
});

app.get('/api/v1/blog/bulk', (c) => {
  return c.text('Hello Hono!')
});

app.get("/",(c)=>{
  return c.text("Hello 123");
});

export default app

// DATABASE_URL="prisma://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5IjoiODhkODU1MWQtMDE3Ni00MjFiLTg4ZDAtOTQ0Y2NmNjEwYzIyIiwidGVuYW50X2lkIjoiOGNmYzMyNjQxMmUyNjRkZDEzNDU0MzQ4ZDYwZWZhOWRiMGU5NDUyNmE4NWRjYjIyY2NmZDNjZmJlMGE1NTRmZCIsImludGVybmFsX3NlY3JldCI6IjMxN2I3YjJhLTI0YzktNDhlNi1iYzlmLTBjYzdiOTAzMzQ3YiJ9.6dWUN3scpGt7TVXtL5fE1hGSTQcUXOkyizcPsumwT6s"
// DIRECT_URL="<YOUR_DATABASE_CONNECTION_STRING>"