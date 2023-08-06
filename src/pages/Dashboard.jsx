import React, { useState } from "react";
import mockData from "../assets/data.json";
import timestamps from "../assets/timeStamps.json";
import Dropdown from "../component/dropdown/Dropdown";
import HeaderTitle from "../component/header-title/HeaderTitle";
import Search from "../component/search/Search";
import List from "../component/list/List";
import styles from "./Dashboard.module.css";
import Card from "../component/card/Card";

const Dashboard = ({theme}) => {
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [searchText, setSearchText] = useState("");
  const [selectedOrderDetails, setSelectedOrderDetails] = useState({});
  const [selectedOrderTimeStamps, setSelectedOrderTimeStamps] = useState({});

    const headerStyles = theme === "light" ?  styles.headerLight : styles.headerDark ;

  // Combining timestamp data with order data to include the order submitted date in it.
  const combinedData = mockData.results.map((order) => ({
    ...order,
    timestamps: timestamps[order["&id"]],
  }));

  // Filter data based on search text by orderId
  const filteredData = combinedData.filter((order) =>
    order["&id"].toLowerCase().includes(searchText.toLowerCase())
  );

  // Handler function to update the selected currency from the dropdown
  const handleCurrencyChange = (event) => {
    setSelectedCurrency(event.target.value);
  };

   // Handler function to update the selected order details and timestamps
  const handleOrderSelection = (selectedOrder) => {
    const selectedOrderId = selectedOrder["&id"];
    const timestampEntry = timestamps.results.find(
      (entry) => entry["&id"] === selectedOrderId
    );
    setSelectedOrderDetails({
      buySellIndicator: selectedOrder.executionDetails.buySellIndicator,
      orderStatus: selectedOrder.executionDetails.orderStatus,
      orderType: selectedOrder.executionDetails.orderType,
    });

    setSelectedOrderTimeStamps({
    orderReceived: timestampEntry.timestamps?.orderReceived ?? "N/A",
        orderStatusUpdated: timestampEntry.timestamps?.orderStatusUpdated ?? "N/A",
        orderSubmitted: timestampEntry.timestamps?.orderSubmitted ?? "N/A",
    });
  };

  return (
    <div>
      <div className={`${styles.header} ${headerStyles}`} >
        <HeaderTitle
          primaryTitle="Orders"
          secondaryTitle={`${mockData.results.length} orders`}
        />
        <div className={styles.actionBox}>
          <Search value={searchText} onChange={(e) => setSearchText(e.target.value)} />
          <Dropdown
            options={["USD", "EUR", "GBP", "JPY"]}
            selectedItem={selectedCurrency}
            onChange={handleCurrencyChange}
          />
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.section}>
          <Card cardData={selectedOrderDetails} title="Selected Order Details" />
          <Card cardData={selectedOrderTimeStamps} title="Selected Order Timestamps" />
        </div>
        {/* Passing the filtered data and the handleOrderSelection function to the List component  */}
        <List rows={filteredData} selectedCurrency={selectedCurrency} onSelectOrder={handleOrderSelection} />
      </div>
    </div>
  );
};

export default Dashboard;
