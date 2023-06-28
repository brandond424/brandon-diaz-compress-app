const express = require("express");
const router = express.Router();

/* GET transactions */
router.get("/transactions", function(req, res, next) {
  console.log('get "transactions" route hit');
  const transactions = [
    { tradingParty: "me", counterParty: "John", amount: 100 },
    { tradingParty: "me", counterParty: "John", amount: -500 },
    { tradingParty: "me", counterParty: "Jacob", amount: 50 },
    { tradingParty: "me", counterParty: "Jacob", amount: -100 },
    { tradingParty: "me", counterParty: "Josh", amount: 700 },
    { tradingParty: "me", counterParty: "Dan", amount: -100 },
    { tradingParty: "me", counterParty: "Josh", amount: 350 },
    { tradingParty: "me", counterParty: "Dan", amount: -250 },
  ];
  res.send({ transactions });
});

module.exports = router;
