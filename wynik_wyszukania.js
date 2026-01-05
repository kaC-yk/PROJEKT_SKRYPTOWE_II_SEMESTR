const express = require("express");
const multer = require("multer");
const fs = require("fs");
const app = express();
const upload = multer();
const PORT = 3335;

app.post("/szukaj", upload.none(), (req, res) => {
  const { miejsce, zameldowanie, wymeldowanie, goscie } = req.body;

  if (!miejsce || !zameldowanie || !wymeldowanie || !goscie) {
    return res.status(400).json({ error: "Brak danych" });
  }

  const newSearch = {
    miejsce,
    zameldowanie,
    wymeldowanie,
    goscie,
    date: new Date().toISOString()
  };

  let searches = [];

  if (fs.existsSync("dane.json")) {
    const fileContent = fs.readFileSync("dane.json", "utf8");
  
    if (fileContent.trim() !== "") {
      searches = JSON.parse(fileContent);
    } else {
      searches = [];
    }
  }

  searches.push(newSearch);

  fs.writeFileSync(
    "dane.json",
    JSON.stringify(searches, null, 2)
  );

  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server działa: http://localhost:${PORT}`);
});
// serwer zapisuje w pliku JSON to co było w fromluarzu
//zamiar jest taki że potem te dane z pliku JSON ''dane.json'' są porównywane z innym srewerem i gdy zgadzają sie wyniki serwer zwraca odpowienie oferty
//trzeba zrobić baze danych z ofertami 