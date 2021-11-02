const express = require("express");
const equipages = require("./equipages");
const PORT = 8080;
const app = express();

app.listen(PORT, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log(`Express server listening on ${PORT}`);
  }
});

app.get("/equipages", (req, res) => {
    res.status(200).json(equipages);
});

app.get("/equipages/:id", (req, res) => {
    // find itérateur pour stocker directement
    const equipage = equipages.find((equipage) => equipage.id === parseInt(req.params.id))
    console.log(equipage);
    
    if(equipage !== undefined){
        res.status(200).json(equipage);
    }else {
        res.status(404).json("this Argonaut don't exist");
    }
});
