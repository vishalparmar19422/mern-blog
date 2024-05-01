import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign, decode, jwt, verify } from "hono/jwt";
import { Hono } from "hono";
export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

blogRouter.use("/*", async (c, next) => {
  const token = c.req.header("authorization") || "";
  const user = await verify(token, c.env.JWT_SECRET);
  if (user) {
    c.set("userId", user.id);
    await next();
  } else {
    return c.json({
      msg: "error not logged in or unauthorized",
    });
  }
});

blogRouter.post("/", async (c) => {
  try {
    const body = await c.req.json();
    const userId = c.get("userId");
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const blog = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: Number(userId),
      },
    });

    return c.json({
      id: blog.id,
    });
  } catch (error) {
    console.log(error);
  }
});

blogRouter.put("/", async (c) => {
  const body = await c.req.json();
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const blog = await prisma.post.update({
    where: {
      id: body.id,
    },
    data: {
      title: body.title,
      content: body.content,
    },
  });

  return c.json({
    id: blog.id + " updated",
  });
});

blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const blogs = await prisma.post.findMany({
    select: {
      content: true,
      title: true,
      id: true,
      author: {
        select: {
          name: true,
        },
      },
    },
  });

  return c.json({
    blogs,
  });
});

blogRouter.get("/:id", async (c) => {
  const id = c.req.param("id");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const blog = await prisma.post.findFirst({
    where: {
      id: id,
    },
    select: {
      title: true,
      content: true,
      author: {
        select: {
          name: true,
        },
      },
    },
  });

  return c.json({
    blog,
  });
});
