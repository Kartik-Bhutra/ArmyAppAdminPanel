import { gcm } from "@noble/ciphers/aes";
import { Buffer } from "buffer";
const iv64 = process.env.NEXT_PUBLIC_ENCRYPTION_IV;
const key64 = process.env.NEXT_PUBLIC_ENCRYPTION_KEY;
const key = Buffer.from(key64, "base64url");
const iv = Buffer.from(iv64, "base64url");
