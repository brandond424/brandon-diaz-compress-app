import React from 'react';

const Table = ({type, title, transactions}) => {
  let count = 1;
  return (
    <div className='table'>
      <h2>{title}</h2>
      <table>
        <thead>
          <tr>
            <th>Counterparty Name</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => {
            let amount;
            if (type === "paying" && transaction.amount < 0) {
              amount = Math.abs(transaction.amount);
            } else if (type === "receiving" && transaction.amount > 0) {
              amount = transaction.amount;
            } else {
              return null;
            }

            const displayTransaction = `${count++}. ${transaction.counterParty}`;
            const displayAmount = `$${amount}`;
            return (
              <tr key={index}>
                <td>{displayTransaction}</td>
                <td>{displayAmount}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;