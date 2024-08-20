import { Hono } from "hono";
import { verify } from "hono/jwt";
import { Prisma, PrismaClient } from "@prisma/client/edge";
import { JWTPayload } from "hono/utils/jwt/types";
import { Context } from "hono";
import { withAccelerate } from "@prisma/extension-accelerate";
import { createBlogSchema, updateBlogSchema } from "@nikhilchawla9013/medium";
type Variables = {
    [key:string]: string
}
  
export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: Variables
}>();

interface MyJWTPayload extends JWTPayload {
  id: string;
}

// interface MyContext extends Context {
//   set(key: "userId", value: string): void;
//   get(key: "userId"): string | undefined;
// }

blogRouter.use("/*", async (c: Context, next) => {
  const token = c.req.header("Authorization");
  if (!token) {
    c.status(401);
    return c.json({
      error: "token is missing",
    });
  }
  try {
    const data: MyJWTPayload = (await verify(
      token.split(" ")[1],
      c.env.JWT_SECRET
    )) as { id: string };
    c.json({
      data,
    });
    if (!data) {
      c.status(401);
      return c.json({ error: "unauthorized" });
    }
    const id: string = data.id;
    c.set("userId", id);
  } catch (e) {
    c.status(401);
    return c.json({ error: e });
  }
  await next();
});

blogRouter.post("/", async (c: Context) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  let blog;
  try {
    const isInputValid = createBlogSchema.safeParse(body);
    if(!isInputValid.success) {
      c.status(411);
      return c.json({
        msg:"Invalid input"
      })
    }
    blog = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        author_id: c.get("userId") as string,
      },
    });
  } catch (e) {
    return c.json({
        error:e
    });
  }
  return c.json({
    blog
  })
});

blogRouter.put("/", async(c:Context) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  let blog;
  const body = await c.req.json();
    try {
      // const isInputValid = updateBlogSchema.safeParse(body);
      // console.log(isInputValid.error);
      // if(!isInputValid.success) {
      //   c.status(411);
      //   return c.json({
      //     msg:"Invalid input"
      //   });
      // }
      blog = await prisma.post.update({
        where: {
         id: body.id
        },
        data: {
            title: body.title,
            content: body.content,
        }
      });
    } catch (e) {
      return c.json({
          error:e
      });
    }
    return c.json({
      blog
    })
});

blogRouter.get("/bulk", async(c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    let blogs;
    try {
      blogs = await prisma.post.findMany({
        include:{
          author: {
            select:{
              name:true,
              username: true
            }
          }
        }
      });
    } catch (e) {
        c.status(403);
      return c.json({
          error:e
      });
    }
    return c.json({
      blogs
    })
});


blogRouter.get("/:id", async(c:Context) => {
    const id = await c.req.param("id");
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    let blog;
    try {
      blog = await prisma.post.findFirst({
        where: {
         id: id
        },
        include: {
          author:{
            select:{
              name:true,
            username: true
            }
          }
        }
      });
    } catch (e) {
        c.status(403);
      return c.json({
          error:e
      });
    }
    return c.json({
      blog
    })
});


