const { BASE_URL, TOKEN } = require("./config");

async function fetchNotifications() {
  try {
    const response = await fetch(
      `${BASE_URL}/notifications`,
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json"
        }
      }
    );

    console.log("Status:", response.status);

    const data = await response.json();

    console.log("API Response:");
    console.log(data);

    return data;
  } catch (error) {
    console.error("Fetch Error:", error);
    return null;
  }
}

module.exports = fetchNotifications;