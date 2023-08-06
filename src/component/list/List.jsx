import React, { useState, useEffect } from 'react';
import ListRow from './ListRow';
import ListRowCell from './ListRowCell';
import ListHeader from './ListHeader';
import ListHeaderCell from './ListHeaderCell';
import styles from './List.module.css';
import timestampData from '../../assets/timeStamps.json';

const List = ({ rows, selectedCurrency, onSelectOrder }) => {
  // State to hold the updated rows with order submitted date.
  const [rowsWithTimestamp, setRowsWithTimestamp] = useState([]);

  // creating a random key for each row because orderId or timestamp is same for most of the order.
  const generateRandomKey = () => {
  const timestamp = new Date().getTime(); //getting the timestamp in milliseconds.
  const randomNum = Math.random().toString(36).substr(2, 9); //now, generating a random alphanumeric string.
  return `${timestamp}-${randomNum}`; // here, combining timestamp and random number to create a unique key.
};

// Calling the onSelectOrder prop with the selected order
const handleOrderClick = (selectedOrder) => {
    onSelectOrder(selectedOrder);
  };
  
  useEffect(() => {
    //this function is for combining the timestamp data from timeStamps.json with the order data.
    const combineTimestampWithRows = () => {
      const updatedRows = rows.map((row) => {
        const orderId = row['&id'];
        const timestampEntry = timestampData.results.find((entry) => entry['&id'] === orderId);
        const orderSubmitted = timestampEntry ? timestampEntry.timestamps.orderSubmitted : 'N/A';
        return {
          ...row,     
          orderSubmitted,
           key: generateRandomKey(),
        };
      });
      setRowsWithTimestamp(updatedRows);
    };

    combineTimestampWithRows();
  }, [rows]);

  return (
    <table className={styles.container}>
      <thead>
        <ListHeader>
          <ListHeaderCell>Order ID</ListHeaderCell>
          <ListHeaderCell>Buy/Sell</ListHeaderCell>
          <ListHeaderCell>Country</ListHeaderCell>
          <ListHeaderCell>Order Submitted</ListHeaderCell>
          <ListHeaderCell>Order Volume / {selectedCurrency}</ListHeaderCell>
        </ListHeader>
      </thead>
      <tbody>
        {rowsWithTimestamp.map((row) =>(
          <ListRow key={row.key} onClick={() => handleOrderClick(row)}>
            <ListRowCell>{row['&id']}</ListRowCell>
            <ListRowCell>{row.executionDetails.buySellIndicator}</ListRowCell>
            <ListRowCell>{row.executionDetails.orderStatus}</ListRowCell>
            <ListRowCell>{row.orderSubmitted}</ListRowCell>
            <ListRowCell>{row.bestExecutionData.orderVolume[selectedCurrency]}</ListRowCell>
          </ListRow>
        ))}
      </tbody>
    </table>
  );
};

export default List;
