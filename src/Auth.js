const connectDB = require("mb64-connect")
const crypto = require("crypto");
const { CreateJWT, VerifyJWT } = require("./utils/jwt");

const UserAuth = connectDB.validation("user", {
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
});

const DeviceString = connectDB.validation("dev", {
  email: { type: String, required: false },
  device: { type: String, required: true },
});

const isProduction = process.env.ENV_TYPE === "prod";

async function Signup(req, res) {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .send({ message: "Name, email, and password are required" });
  }

  try {
    const userExists = await UserAuth.findOne({ email });
    if (userExists) {
      return res.status(409).send({ message: "User already exists" });
    }

    await UserAuth.create({ name, email, password });

    res.status(201).send({ message: "User created successfully", name });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Internal server error", error: error.message });
  }
}

async function Login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .send({ message: "Email and password are required", valid: false });
  }

  try {
    const user = await UserAuth.findOne({ email });
    if (!user || user.password !== password) {
      return res
        .status(401)
        .send({ message: "Invalid email or password", valid: false });
    }

    const device = crypto.randomBytes(4).toString("hex").toUpperCase();
    const result = await DeviceString.create({ email, device });

    const token = await CreateJWT(
      { email: result?.email, device: result?.device },
      process.env.JWT_KEY
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true, // Secure cookies only in production
      sameSite:  "Lax", 
      maxAge: 3600000, // 1 hour
    });

    res
      .status(200)
      .send({
        message: "Login successful",
        valid: true,
        isAdmin: user?.isAdmin,
      });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Internal server error", error: error.message });
  }
}

async function UserState(req, res) {
  const token = req.cookies?.token;

  if (!token) {
    return res
      .status(401)
      .send({ message: "Unauthorized: Token missing", valid: false });
  }

  try {
    const { email, device } = await VerifyJWT(token, process.env.JWT_KEY);

    if (!email || !device) {
      res.clearCookie("token", {
        httpOnly: true,
      secure: true, // Secure cookies only in production
      sameSite:  "Lax", 
      });
      return res
        .status(401)
        .send({ message: "Unauthorized: Invalid token", valid: false });
    }

    const deviceRecord = await DeviceString.findOne({ email, device });

    if (!deviceRecord) {
      res.clearCookie("token", {
        httpOnly: true,
      secure: true, // Secure cookies only in production
      sameSite:  "Lax", 
      });
      return res
        .status(401)
        .send({ message: "Unauthorized: Device mismatch", valid: false });
    }

    const user = await UserAuth.findOne({ email });
    if (!user) {
      return res.status(404).send({ message: "User not found", valid: false });
    }

    res.status(200).send({
      message: "User state verified",
      valid: true,
      user: {
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      },
    });
  } catch (error) {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true, // Secure cookies only in production
      sameSite:  "Lax", 
    });
    res.status(401).send({
      message: "Unauthorized: Invalid or expired token",
      error: error.message,
      valid: false,
    });
  }
}

async function Logout(req, res) {
  try {
    const token = req.cookies?.token;
    console.log(token)
    if (!token) {
      // res.clearCookie("token", {
      //   httpOnly: true,
      //   secure: true, // Secure cookies only in production
      //   sameSite:  "Lax", 
      // });

      return res
        .status(401)
        .send({ message: "Unauthorized: Token missing", valid: false });
    }

    const { email, device } = await VerifyJWT(token, process.env.JWT_KEY);

    if (!email || !device) {
      res.clearCookie("token", {
        httpOnly: true,
        secure: true, // Secure cookies only in production
        sameSite:  "Lax", 
      });
      return res
        .status(401)
        .send({ message: "Unauthorized: Invalid token", valid: false });
    }

    await DeviceString.deleteOne({ email, device });
    res.clearCookie("token", {
      httpOnly: true,
      secure: true, // Secure cookies only in production
      sameSite:  "Lax", 
    });

    res.status(200).send({ message: "Logout successful" });
  } catch (error) {
    res.status(500).send({
      message: "Internal server error",
      error: error.message,
    });
  }
}

module.exports = { Signup, Login, UserState, Logout };
