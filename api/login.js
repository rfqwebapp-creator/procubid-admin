export default async function handler(req, res) {
  try {
    const response = await fetch("http://13.201.63.42:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
}