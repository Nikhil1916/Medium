import { Hono } from "hono";
import { sign , verify } from 'hono/jwt'

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string
  };
}>();
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { error } from "../node_modules1/unenv/runtime/node/console";

app.post("/api/v1/user/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  let user = null;
  let token;
  const key = await generateKey();

  // Encrypt the password
  const { iv, encryptedData } = await encryptPassword(body.password, key);

  // Export the key for storage (replace this with your own key management logic)
  const exportedKey = await crypto.subtle.exportKey("jwk", key);

  // Store the encrypted password, IV, and key in your database
  // This is a simplified example. Replace with your database storage logic.
  const userData = {
    password: arrayBufferToBase64(encryptedData),
    iv: arrayBufferToBase64(iv),
    encryptionKey: exportedKey,
  };
  try {
    user = await prisma.user.create({
      data: {
        ...body,
        ...userData,
      },
    });
    const payload = {
     id:user.id
    }
    token = await sign(payload, c.env.JWT_SECRET)
  } catch (e) {
    console.log(e);
    return c.json({
      error: e,
      userData,
    });
  }
  return c.json({
    // user,
    token
  });
});

app.post("/api/v1/user/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const { email, password } = await c.req.json();
  // Retrieve the stored user data (replace this with your database retrieval logic)
  let user = null;
  let token;
  try {
    user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      return c.json({
        msg: "User not found",
      });
    }
    // Import the encryption key
    // @ts-lint
    const importedKey = await crypto.subtle.importKey(
      "jwk",
      user.encryptionKey as JsonWebKey,
      {
        name: "AES-GCM",
      },
      false, // Whether the key is extractable
      ["decrypt"]
    );
    const decryptedPassword = await decryptPassword(
      base64ToArrayBuffer(user.password),
      base64ToArrayBuffer(user.iv),
      importedKey
    );
    if (decryptedPassword != password) {
      return c.json({
        msg: "password not match",
      });
    }
    token = await sign({id:user.id}, c.env.JWT_SECRET)
  } catch (e) {
    return c.json({
      error: e,
    });
  }
  return c.json({
    token
  });
});

app.use('/api/v1/blog/*', async (c, next) => {
  const token = c.req.header('Authorization');
  if(!token) {
    c.status(401);
    return c.json({
      error:"token is missing"
    });
  }
  try {
    const data = await verify(token.split(' ')[1],c.env.JWT_SECRET);
    c.json({
      data
    })
    if(!data) {
      c.status(401);
      return c.json({ error: "unauthorized" });
    }
  } catch(e) {
    c.status(401);
    return c.json({ error: e });
  }
  // const id:string = data.id;
  // c.set('userId',id);
  await next();
})

app.post("/api/v1/blog", (c) => {
  return c.text("Blog!");
});

app.put("/api/v1/blog", (c) => {
  return c.text("Blog!");
});

app.get("/api/v1/blog/:id", (c) => {
  return c.text("Hello Blog id!");
});

app.get("/api/v1/blog/bulk", (c) => {
  return c.text("Hello Hono!");
});

app.get("/", (c) => {
  return c.text("Hello 123");
});

async function generateKey() {
  return crypto.subtle.generateKey(
    {
      name: "AES-GCM",
      length: 256, // AES-256
    },
    true, // whether the key is extractable
    ["encrypt", "decrypt"] // key usages
  );
}

async function encryptPassword(password: string, key: any) {
  const encodedPassword = new TextEncoder().encode(password);
  const iv = crypto.getRandomValues(new Uint8Array(12)); // 96-bit IV for AES-GCM

  const encrypted = await crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv: iv,
    },
    key,
    encodedPassword
  );

  return {
    iv: Array.from(iv), // Store the IV along with the encrypted data
    encryptedData: Array.from(new Uint8Array(encrypted)),
  };
}

function arrayBufferToBase64(buffer: number[]) {
  let binary = "";
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

// Convert Base64 to ArrayBuffer
function base64ToArrayBuffer(base64: any) {
  const binary = atob(base64);
  const len = binary.length;
  const buffer = new ArrayBuffer(len);
  const bytes = new Uint8Array(buffer);
  for (let i = 0; i < len; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return buffer;
}

async function decryptPassword(encryptedData: any, iv: any, key: any) {
  const decrypted = await crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv: new Uint8Array(iv),
    },
    key,
    new Uint8Array(encryptedData)
  );

  return new TextDecoder().decode(decrypted);
}

export default app;

// DATABASE_URL="prisma://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5IjoiODhkODU1MWQtMDE3Ni00MjFiLTg4ZDAtOTQ0Y2NmNjEwYzIyIiwidGVuYW50X2lkIjoiOGNmYzMyNjQxMmUyNjRkZDEzNDU0MzQ4ZDYwZWZhOWRiMGU5NDUyNmE4NWRjYjIyY2NmZDNjZmJlMGE1NTRmZCIsImludGVybmFsX3NlY3JldCI6IjMxN2I3YjJhLTI0YzktNDhlNi1iYzlmLTBjYzdiOTAzMzQ3YiJ9.6dWUN3scpGt7TVXtL5fE1hGSTQcUXOkyizcPsumwT6s"
// DIRECT_URL="<YOUR_DATABASE_CONNECTION_STRING>"
