import jwt from "jsonwebtoken";

export function authRequired(req, res, next) {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;
  if (!token) return res.status(401).json({ error: "Missing token" });
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || "changeme");
    req.user = { id: payload.sub, email: payload.email };
    return next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
}

export function issueToken(user) {
  const payload = { sub: user._id.toString(), email: user.email };
  const token = jwt.sign(payload, process.env.JWT_SECRET || "changeme", { expiresIn: "7d" });
  return token;
}