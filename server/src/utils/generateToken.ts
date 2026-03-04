import jwt from "jsonwebtoken";

const generateToken = (id: string, role: string): string => {
  return jwt.sign({ id, role }, process.env.SECRET_KEY as string, {
    expiresIn: "7d",
  });
};

export default generateToken;
