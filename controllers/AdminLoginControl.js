export const AdminLogin = async (req, res) => {
  try {
    console.log("REQ BODY:", req.body);
    console.log("ENV USER:", process.env.ADMIN_USERNAME);
    console.log("ENV PASS:", process.env.ADMIN_PASSWORD);

    const username = req.body.username?.trim();
    const password = req.body.password?.trim();

    if (!username || !password) {
      return res.status(400).json({ message: "Missing credentials" });
    }

    if (
      username === process.env.ADMIN_USERNAME &&
      password === process.env.ADMIN_PASSWORD
    ) {
      return res.status(200).json({ message: "Login successful" });
    }

    return res.status(401).json({ message: "Wrong username or password" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};
