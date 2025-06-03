import crypto from "crypto";

export function verifyHash(password, hash, salt) {
  const verifyHash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha256")
    .toString("hex");
  return hash === verifyHash;
}
