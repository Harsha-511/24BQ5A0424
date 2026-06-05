const { BASE_URL, TOKEN } = require("./config");

async function test() {
  const response = await fetch(
    `${BASE_URL}/notifications`,
    {
      headers: {
        Authorization: `Bearer ${TOKEN}`
      }
    }
  );

  console.log("Status:", response.status);

  const data = await response.json();

  console.log(data);
}

test();