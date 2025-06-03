import crypto from "crypto";

const algorithm = "aes-256-cbc";
const key = process.env.ENCRYPTION_KEY;

export function decrypt(encryptedData, iv) {
  const decipher = crypto.createDecipheriv(
    algorithm,
    Buffer.from(key),
    Buffer.from(iv, "hex")
  );
  const decrypted = decipher.update(Buffer.from(encryptedData, "hex"));
  return Buffer.concat([decrypted, decipher.final()]).toString();
}