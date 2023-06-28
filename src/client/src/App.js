import React, { useState, useEffect } from "react";
import { saveAs } from 'file-saver';
import Modal from "./components/Modal";
import TransactionTables from "./components/TransactionTables";
import "./App.scss";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    fetch("/api/transactions")
      .then(res => res.json())
      .then(json => setTransactions(json.transactions));
    return () => {};
  }, []);

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const counterparty = event.target.counterparty.value;
    const amount = event.target.amount.value;

    if (!counterparty || !amount || isNaN(amount) || Number(amount) <= 0) {
      alert('Please enter a valid counterparty and amount.');
      return;
    }

    const newTransaction = {
      tradingParty: 'me',
      counterParty: counterparty,
      amount: Number(amount),
    };

    setTransactions((prevTransactions) => [...prevTransactions, newTransaction]);

    event.target.reset();
    setShowModal(false);
  };

  const compress = (transactions) => {
    const compressedTransactions = [];
    const counterPartyMap = {};

    for (const transaction of transactions) {
      const { tradingParty, counterParty, amount } = transaction;
      const key = `${tradingParty}-${counterParty}`;

      if (key in counterPartyMap) {
        counterPartyMap[key] += amount;
      } else {
        counterPartyMap[key] = amount;
      }
    }

    for (const key in counterPartyMap) {
      const [tradingParty, counterParty] = key.split("-");
      const amount = counterPartyMap[key];

      compressedTransactions.push({ tradingParty, counterParty, amount });
    }

    return compressedTransactions;
  };

  const handleCompress = () => {
    const compressedTransactions = compress(transactions);

    const header = "Trading Party,Counter Party,Amount";
    const csvContent = `${header}\n${compressedTransactions
      .map(transaction => `${transaction.tradingParty},${transaction.counterParty},${transaction.amount}`)
      .join("\n")}`;
    const csvBlob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });

    saveAs(csvBlob, "compressed_transactions.csv");
  };

  return (
    <div className="App">
      <TransactionTables transactions={transactions} />

      <div className="button-group">
       <button onClick={() => setShowModal(true)}>Add Transaction</button>
       <button onClick={() => handleCompress()}>Compress Transaction</button>
      </div>

      {showModal && (
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          <form onSubmit={handleFormSubmit}>
            <h2>Add Transaction</h2>
            <div className="form-input">
              <label htmlFor="counterparty">Counterparty:</label>
              <input
                type="text"
                id="counterparty"
                name="counterparty"
                placeholder="Counterparty"
                required
              />
            </div>
            <div className="form-input">
              <label htmlFor="amount">Amount:</label>
              <input
                type="number"
                id="amount"
                name="amount"
                min="1"
                placeholder="Amount"
                required
              />
            </div>
            <button type="submit">Add</button>
          </form>
        </Modal>
      )}
    </div>
  );
}

export default App;
