import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";
import { createBlogPost } from "@xdev275/medium-common";
import { updateBlogPost } from "@xdev275/medium-common";

export const blogRoute = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userid: any;
  };
}>();

blogRoute.use("/*", async (c, next) => {
  const authHeader = c.req.header("Authorization") || "";
  if (!authHeader) {
    c.status(401);
    return c.json({ error: "unauthorized" });
  }
  const payload = await verify(authHeader, c.env.JWT_SECRET);
  if (payload) {
    c.set("userid", payload.id);
    await next();
  } else {
    c.status(403);
    return c.json({
      message: "You are not logged in",
    });
  }
});

blogRoute.post("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  const { success } = createBlogPost.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({
      message: "Invalid type",
    });
  }
  const authorId = c.get("userid");
  try {
    const blog = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorid: authorId,
      },
    });
    return c.json({ id: blog.id });
  } catch (error) {
    c.status(411);
    return c.json({ error: error });
  }
});

blogRoute.put("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  const { success } = updateBlogPost.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({
      message: "Invalid type",
    });
  }
  try {
    const blog = await prisma.post.update({
      where: {
        id: body.id,
      },
      data: {
        title: body.title,
        content: body.content,
      },
    });
    return c.json({ id: blog.id });
  } catch (error) {
    c.status(411);
    return c.json({ error: error });
  }
});

blogRoute.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
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
    return c.json({ blogs });
  } catch (error) {
    c.status(411);
    return c.json({ error: error });
  }
});

blogRoute.get("/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  const id = c.req.param("id");
  try {
    const blog = await prisma.post.findFirst({
      where: {
        id: id,
      },
      select: {
        id: true,
        title: true,
        content: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });
    return c.json({ blog });
  } catch (error) {
    c.status(411);
    return c.json({ error: error });
  }
});
