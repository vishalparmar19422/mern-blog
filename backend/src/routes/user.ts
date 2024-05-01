import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign, decode, verify, jwt } from "hono/jwt";
import { Hono } from "hono";
import z from "zod";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

const signupBody = z.object({
  email: z.string().email(),
  password: z.string(),
  name: z.string().optional(),
});

userRouter.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  console.log(body);

  const { success } = signupBody.safeParse(body);

  if (!success) {
    return c.json({
      msg: "invalid inputs" + body,
    });
  }

  try {
    const exist = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });
    if (exist) {
      return c.json({
        ans: true,
        msg: "user already exist ",
      });
    }

    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: body.password,
      },
    });

    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);

    return c.json({
      ans: false,
      jwt,
    });
  } catch (error) {
    console.log("error in create query " + error);
  }
});

userRouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
      password: body.password,
    },
  });

  if (!user) {
    return c.json({
      ans: true,
      failed: "error user does not exist",
    });
  }
  const jwt = await sign({ id: user?.id }, c.env.JWT_SECRET);

  return c.json({
    ans: false,
    msg: "user logged in",
    jwt,
  });
});

userRouter.get("/getuser", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const user = await prisma.user.findMany();

  return c.json({
    user,
  });
});
