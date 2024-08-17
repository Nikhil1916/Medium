import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign } from "hono/jwt";
import {signInInputSchema, signUpInputSchema} from "@nikhilchawla9013/medium";

export const userRoute = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

userRoute.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  try {
    const success = signUpInputSchema.safeParse(body);
    // console.log(success.error);
    if(!success.success) {
      c.status(400);
      return c.json({
        message:"invalid input",
        // success
      })
    }
  } catch(e) {
    return c.json({
      message:"invalid input",
      // success
    })
  }
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
      id: user.id,
    };
    token = await sign(payload, c.env.JWT_SECRET);
  } catch (e) {
    console.log(e);
    return c.json({
      error: e,
      userData,
    });
  }
  return c.json({
    // user,
    token,
  });
});

userRoute.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const { username, password } = await c.req.json();
  // Retrieve the stored user data (replace this with your database retrieval logic)
  let user = null;
  let token;
  try {
    const success = signUpInputSchema.safeParse({
      username, password
    });
    // console.log(success.error);
    if(!success.success) {
      c.status(400);
      return c.json({
        message:"invalid input",
        // success
      })
    }
    user = await prisma.user.findUnique({
      where: {
        username,
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
      c.status(403);
      return c.json({
        msg: "password not match",
      });
    }
    token = await sign({ id: user.id }, c.env.JWT_SECRET);
  } catch (e) {
    return c.json({
      error: e,
    });
  }
  return c.json({
    token,
  });
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
