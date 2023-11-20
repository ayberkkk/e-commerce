const express = require("express");
const cors = require("cors");
const axios = require("axios");
const bodyParser = require("body-parser");

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const fakeStoreApiUrl = "https://fakestoreapi.com/products";

app.get("/products", async (req, res) => {
  try {
    const response = await axios.get(fakeStoreApiUrl);
    res.json(response.data);
  } catch (error) {
    console.error("Ürünleri çekerken hata oluştu:", error);
    res.status(500).json({ error: "İç Sunucu Hatası" });
  }
});

app.get("/products/:id", async (req, res) => {
  const productId = req.params.id;
  try {
    const response = await axios.get(`${fakeStoreApiUrl}/${productId}`);
    res.json(response.data);
  } catch (error) {
    console.error(`ID'si ${productId} olan ürünü çekerken hata oluştu:`, error);
    res.status(500).json({ error: "İç Sunucu Hatası" });
  }
});

app.post("/products", async (req, res) => {
  const newProduct = req.body;
  try {
    const response = await axios.post(fakeStoreApiUrl, newProduct);
    res.json(response.data);
  } catch (error) {
    console.error("Yeni ürün eklerken hata oluştu:", error);
    res.status(500).json({ error: "İç Sunucu Hatası" });
  }
});

app.put("/products/:id", async (req, res) => {
  const productId = req.params.id;
  const updatedProduct = req.body;
  try {
    const response = await axios.put(
      `${fakeStoreApiUrl}/${productId}`,
      updatedProduct
    );
    res.json(response.data);
  } catch (error) {
    console.error(
      `ID'si ${productId} olan ürünü güncellerken hata oluştu:`,
      error
    );
    res.status(500).json({ error: "İç Sunucu Hatası" });
  }
});

// Ürünü sil
app.delete("/products/:id", async (req, res) => {
  const productId = req.params.id;
  try {
    const response = await axios.delete(`${fakeStoreApiUrl}/${productId}`);
    res.json(response.data);
  } catch (error) {
    console.error(`ID'si ${productId} olan ürünü silerken hata oluştu:`, error);
    res.status(500).json({ error: "İç Sunucu Hatası" });
  }
});

app.listen(port, () => {
  console.log(`Uygulama http://localhost:${port} adresinde çalışıyor`);
});
