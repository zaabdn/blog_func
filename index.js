const kontenbase = require("@kontenbase/sdk");
const express = require("express");
const app = express();
const port = 3000;

const client = new kontenbase.KontenbaseClient({
  apiKey: process.env.API_KEY,
  url: process.env.FUNCTION_ENV === "development" ? "https://api.stagingv2.kontenbase.com" : "https://api.v2.kontenbase.com",
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/products", async (req, res) => {
  const response = await client.service("products").find();

  if (response.error) {
    if (response.error.message === "project not found") {
      return res.status(response.status).send({
        message:
          "failed to connect to your project, please check if the api had been set properly.",
      });
    }

    return res.status(response.status).send(response.error);
  }

  res.status(response.status).send(response.data);
});

app.post("/products", async (req, res) => {
  const response = await client.service("products").create(req.body);

  if (response.error) {
    if (response.error.message === "project not found") {
      return res.status(response.status).send({
        message:
          "failed to connect to your project, please check if the api had been set properly.",
      });
    }

    return res.status(response.status).send(response.error);
  }

  res.status(response.status).send(response.data);
});

app.get("/products/:id", async (req, res) => {
  const { id } = req.params;

  const response = await client.service("products").getById(id);

  if (response.error) {
    if (response.error.message === "project not found") {
      return res.status(response.status).send({
        message:
          "failed to connect to your project, please check if the api had been set properly.",
      });
    }

    return res.status(response.status).send(response.error);
  }

  res.status(response.status).send(response.data);
});

app.patch("/products/:id", async (req, res) => {
  const { id } = req.params;

  const response = await client.service("products").updateById(id, req.body);

  if (response.error) {
    if (response.error.message === "project not found") {
      return res.status(response.status).send({
        message:
          "failed to connect to your project, please check if the api had been set properly.",
      });
    }

    return res.status(response.status).send(response.error);
  }

  res.status(response.status).send(response.data);
});

app.delete("/products/:id", async (req, res) => {
  const { id } = req.params;

  const response = await client.service("products").deleteById(id);

  if (response.error) {
    if (response.error.message === "project not found") {
      return res.status(response.status).send({
        message:
          "failed to connect to your project, please check if the api had been set properly.",
      });
    }

    return res.status(response.status).send(response.error);
  }

  res.status(response.status).send(response.data);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
