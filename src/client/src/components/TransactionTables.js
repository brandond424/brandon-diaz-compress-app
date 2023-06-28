import React from 'react';
import Table from "./Table";

const TransactionTables = ({transactions}) => {
  return (
    <div className='transaction-tables'>
      <Table type="paying" title="Paying" transactions={transactions} />
      <Table type="receiving" title="Receiving" transactions={transactions} />
    </div>
  );
};

export default TransactionTables;