import crypto, { randomInt, randomBytes, createHash } from "crypto";
import { effWordList } from "./wordlist";

export const generateSecurePassphrase = async () => {
  const buffer = await new Promise((res, rej) => {
    randomBytes(3, (err, buf) => {
      if (err !== null) {
        console.log(err);
        return;
      }

      const PASSPHRASE_LENGTH = 6;
      const passPhrase = new Array(PASSPHRASE_LENGTH);
      const listLength = effWordList.length - 1;
      for (let i = 0; i < PASSPHRASE_LENGTH; i++) {
        const wordIndex = randomInt(0, listLength);
        passPhrase[i] = effWordList[wordIndex];
      }

      res(passPhrase.join(" "));
    });
  });

  return buffer;
};

export const generateRandomString = (length) => {
  const charList =
    "abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += charList[Math.floor(Math.random() * charList.length)];
  }
  return result;
};

const ALGORITHM = "aes-256-ctr";
const IV_LENGTH = 16;
const IV = randomBytes(IV_LENGTH);

export const aesEncrypt = async (content) => {
  const passphrase = await generateSecurePassphrase();
  const keyHash = createHash("sha256").update(passphrase).digest("hex");
  console.log(keyHash);

  const cipher = crypto.createCipheriv(
    ALGORITHM,
    Buffer.from(keyHash, "hex"),
    IV
  );

  const encrypted = Buffer.concat([cipher.update(content), cipher.final()]);
  const result = encrypted.toString("hex");

  return {
    passphrase,
    result,
    keyHash,
  };
};

export const aesDecrypt = async (content, key) => {
  const decipher = crypto.createDecipheriv(
    ALGORITHM,
    Buffer.from(key, "hex"),
    IV
  );
  console.log(content);
  let dec = decipher.update(content, "hex", "utf8");
  dec += decipher.final("utf8");
  console.log(dec);
  return dec;
};
