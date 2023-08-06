## For fixing the following issues

1.  In the title of the header, it displays `5 orders` but there are `6 orders` in the table. We want to display the `total` number of `orders` in the header title
   
Ans- The issue mentioned in the question is related to the discrepancy between the displayed number of orders and the actual number of orders in the table. 

The primaryTitle is set to "Orders", which remains constant and is intended to denote the general content of the header.

The secondaryTitle was hardCoded, The code I've changed has been updated to dynamically calculate the number of orders using the length of "mockData.results" array. 

<img width="513" alt="Screenshot 2023-08-06 at 6 11 18 PM" src="https://github.com/Ishalohia/assignment-question-1/assets/104261885/54a89a7a-8e36-40a2-81fa-602363c9355f">

2.  In the table order submitted date is missing, we have timestamp data included in the `src\assets\timeStamps.json` with the corresponding ids, please combine that with the order data and make sure the order submitted date is being displayed in the table

Ans- In src/components/list/List.jsx, This sets up a useEffect hook, which runs the provided callback function when certain dependencies change. Likewise in this case, it runs whenever the rows prop changes.
<img width="886" alt="Screenshot 2023-08-06 at 6 12 14 PM" src="https://github.com/Ishalohia/assignment-question-1/assets/104261885/2402b2c3-a839-4333-8a48-369675c4902e">

Then declares a function named "combineTimestampWithRows" that will be responsible for combining timestamp data with the order data. 

The map function iterates over each element in the rows array, creating a new array with modified elements then it is extracting the order ID from the current row using the key '&id'.

Then it searches through the "timestampData.results" array to find a timestamp entry that matches the current order ID and If a matching timestamp entry is found it extracts the orderSubmitted timestamp from it. If not, it sets orderSubmitted to 'N/A'.
 
Hence, returns a new object that includes all properties from the current row object, along with the newly acquired orderSubmitted timestamp. 
  
Then updating the "rowsWithTimestamp" state with the newly created array of rows containing the combined timestamp information and Calls the defined function to combine timestamp data with rows immediately. Thus closes the useEffect hook, specifying that the effect should run whenever the rows prop changes.

<img width="515" alt="Screenshot 2023-08-06 at 6 12 43 PM" src="https://github.com/Ishalohia/assignment-question-1/assets/104261885/cc83ea86-4bb8-47bb-86dd-3b602efc3765">

3.  Order Volume cell is displaying USD values, can you please make it display the currency value selected on the dropdown located in the header of the dashboard

Ans- In src/components/pages/Dashboard.jsx , To display the currency according to the option which user choose. Firstly I have created a state using useState hook, Then created a handler Function called "handleCurrencyChange" to update the selected currency from the dropdown. This function is responsible for updating the state with the newly selected currency when the user chooses a different option. 
<img width="638" alt="Screenshot 2023-08-06 at 6 13 06 PM" src="https://github.com/Ishalohia/assignment-question-1/assets/104261885/a5b95744-cc0c-4dba-b7ac-e2d855b2bd6e">
<img width="643" alt="Screenshot 2023-08-06 at 6 13 31 PM" src="https://github.com/Ishalohia/assignment-question-1/assets/104261885/831a90a9-0719-41d0-b661-c7bf192be119">


Then in Dropdown UI element,
<img width="459" alt="Screenshot 2023-08-06 at 6 13 44 PM" src="https://github.com/Ishalohia/assignment-question-1/assets/104261885/a57499cd-66ec-4630-8ef4-99ce933388d0">


 the first attribute passed is "options" which specifies the list of options that the dropdown will display. These are the currency choices that users can select from the dropdown.

The second attribute is "selectedItem" which determines the currently selected item in the dropdown. The value of selectedCurrency from the component's state is assigned to this attribute which means that the currently selected currency will be reflected in the dropdown as the default option when the component renders. 

The last is "onChange", this attribute specifies a callback function i.e. "handleCurrencyChange" function that will be triggered whenever the user selects a different option in the dropdown.

Now In src/components/list/List.jsx, The code receives the "selectedCurrency" prop, which is the currency selected from the dropdown in the Dashboard component. This prop holds the currency code (e.g., "USD", "EUR", etc.) that the user has selected.
In last ListHeaderCell which shows the OrderVolume I pass this props so it will change according to the user's choice from dropdown. 

To update the OrderVolume value In last ListRowCell, The orderVolume object likely holds different order volumes for different currencies. By using the "selectedCurrency" prop as the key to access the correct property in the "bestExecutionData.orderVolume" object, the code ensures that the "OrderVolume" cell displays the appropriate orderVolume value for the selected currency.

<img width="821" alt="Screenshot 2023-08-06 at 6 14 12 PM" src="https://github.com/Ishalohia/assignment-question-1/assets/104261885/1bd653d5-e974-4bce-97f2-0d7fbe72d6ba">

4.  Can you please add search feature on the order IDs with the search bar given in the header

Ans-  Firstly, I have added a state variable called "searchText" using the useState hook to manage the search text input. Then,in the headerTitle section, I've integrated the search input with the Search component. I've also provided the "value" and "onChange" props to manage the search text input and respond to changes in Search Component. 

<img width="539" alt="Screenshot 2023-08-06 at 6 14 49 PM" src="https://github.com/Ishalohia/assignment-question-1/assets/104261885/1f9c7957-01bb-4f13-8a26-e9349ffded7d">

I've used the filter method on the "combinedData" to filter the data based on the search text entered by the user. The filter method checks if the order ID ["&id"] includes the searchText in a case-insensitive manner.

<img width="852" alt="Screenshot 2023-08-06 at 6 15 04 PM" src="https://github.com/Ishalohia/assignment-question-1/assets/104261885/bcd5de34-5955-409d-be22-073b1686aff2">

Now, passing the filtered data to the List component using the rows prop. This ensures that the list will display only the orders that match the search criteria.

With these changes, the search functionality allows users to input text into the search bar, and the list of orders will dynamically update to show only those orders whose IDs contain the entered search text. 

5.  Please clear the console errors and warnings.

Ans- In the provided code, I've addressed the issue of console errors regarding keys in the list rendering. By providing a unique key for each row, I've addressed the console error regarding keys. 

The issue was it can't pass row["&id"] as the key because in the given .json file the order id is same for max. 5 orders and <i>React expects each element in an array to have a unique key when rendering lists to efficiently update the virtual DOM. Without unique keys, React cannot accurately track changes and updates to the list items.</i>

So by creating a function called "generateRandomKey" which creates a unique key for each row in the list i.e. by getting the timestamp in milliseconds, generating a random alphanumeric string and then combining timestamp and random number to create a unique key. 

<img width="1010" alt="Screenshot 2023-08-06 at 6 15 34 PM" src="https://github.com/Ishalohia/assignment-question-1/assets/104261885/1bceeeb5-c73c-4918-bf04-e46833e43793">


In useEffect hook I've passed the "generatedRandomKey()" as the key prop and now using it as the key prop for each ListRow component which ensures that each row has a unique identifier, which is crucial for efficient rendering and updating of the virtual DOM. 
<img width="905" alt="Screenshot 2023-08-06 at 6 16 06 PM" src="https://github.com/Ishalohia/assignment-question-1/assets/104261885/41ce05ae-8479-4b79-948c-c4654f3b1b71">

6.  When user selects an order, can you populate the Card on top of the listing component as shown in the image

Ans-  The Dashboard component is responsible for displaying the list of orders and the two cards at the top.

In src/components/pages/Dashboard.jsx, I'm using the useState hook to manage the state of "selectedOrderDetails" and "selectedOrderTimeStamps". These states are used to store the details and timestamps of the selected order when a user clicks on a specific row in the list.

<img width="714" alt="Screenshot 2023-08-06 at 6 16 30 PM" src="https://github.com/Ishalohia/assignment-question-1/assets/104261885/421828aa-aa2a-4e6a-8017-5db74e63253f">

When the user selects an order in the list, the handleOrderSelection function is called. This function takes the selected order's data as an argument, which is the same data that was passed to the onSelectOrder prop in the List component.
<img width="860" alt="Screenshot 2023-08-06 at 6 16 48 PM" src="https://github.com/Ishalohia/assignment-question-1/assets/104261885/cd2fb908-d75b-4cf7-8b8f-5084aa873274">
<img width="808" alt="Screenshot 2023-08-06 at 6 17 08 PM" src="https://github.com/Ishalohia/assignment-question-1/assets/104261885/56634a2e-15f8-42e1-8c50-b8f2f8dca298">

In the handleOrderSelection function, extracting the relevant details from the selected order's data, such as buySellIndicator, orderStatus, and orderType. These details are then stored in the selectedOrderDetails state.

Similarly, retrieving  the timestamps associated with the selected order from the timestampData. These timestamps are extracted from the timestampEntry corresponding to the selected order and are displayed in the "Selected Order Timestamps" card component.

Then, In Dashboard, In list element, the "onSelectOrder" callback serves as a bridge between the List component and the Dashboard component, allowing them to communicate and share data. When an order is selected in the list, the callback triggers an update in the Dashboard component, causing it to display the relevant information about the selected order.

<img width="973" alt="Screenshot 2023-08-06 at 6 17 27 PM" src="https://github.com/Ishalohia/assignment-question-1/assets/104261885/67c1cb20-b354-41fa-94af-46c68f71d51b">

In src/components/list/List.jsx, The "handleOrderClick" function is called in response to the onClick event and receives the clicked order's data as an argument. When a user clicks on a row, the onClick event handler is triggered.
The "onSelectOrder" prop is also passed to the List component. This prop is a function that will be called with the selected order's data.
<img width="547" alt="Screenshot 2023-08-06 at 6 17 47 PM" src="https://github.com/Ishalohia/assignment-question-1/assets/104261885/575ea91d-d7f7-42f8-8e6f-58bfb746013f">
<img width="631" alt="Screenshot 2023-08-06 at 6 18 01 PM" src="https://github.com/Ishalohia/assignment-question-1/assets/104261885/b6a06df8-1a33-4bfd-a45d-e3d41fd6a033">

## Dashboard.jpg

<img width="1434" alt="Screenshot 2023-08-06 at 6 20 10 PM" src="https://github.com/Ishalohia/assignment-question-1/assets/104261885/aa9c7992-3912-4923-8776-305eaaee848c">


## Bonus

1. Please add storybook to one of the components

Storybook:- Storybook is basically a collection of stories and each story represents a single visual state of a component and it is our job as developers to write stories for each of the UI components we create in our react applications. It enables us to create components independently and showcase those components interactively in an isolated developed environment. It means storybook runs outside of our main react application. So, we can develop UI components in isolation without having to worry about business logics

Practical Knowledge :- 
When we work as a team on a react application there are few thing that will make development across the team smoother.
First, is the ability to view the different components that have already been developed as part of the app.
Second, is the ability to view what are the different props that those developed components accept.
Third, is the ability to visually showcase those components to your take holders for feedback
Apart from these it would be incredible if we can change the props on a component and immediately see the changes in the UI without having to move back and forth between the browser and our editor


In Card.stories.jsx

I have defined two stories in Storybook for the Card component: CardWithData and CardWithNoData. Each story demonstrates a different use case of the Card component. The CardWithData story displays the component with sample data, showcasing how it appears with actual content. On the other hand, the CardWithNoData story illustrates the behavior of the component when no data is available. By utilizing Storybook controls, users can switch between these stories to visualize the Card component in various scenarios. The flexibility of Storybook allows users to conveniently observe and interact with different aspects of the Card component's functionality.

<img width="1420" alt="Screenshot 2023-08-06 at 6 18 58 PM" src="https://github.com/Ishalohia/assignment-question-1/assets/104261885/b56f59df-6bd7-44c2-9dcb-019462f09d61">

In Dashboard.stories.jsx

I have defined two stories in Storybook for the Dashboard component: LightTheme and DarkTheme. User can switch between the light and dark themes using the Storybook controls. The theme prop is used to conditionally apply the appropriate CSS class to the header, which will change its background color and text color based on the selected theme.
Now, when user run Storybook, they will see both the light and dark theme versions of the Dashboard component, and can toggle between them using Storybook's control panel.

<img width="1425" alt="Screenshot 2023-08-06 at 6 19 19 PM" src="https://github.com/Ishalohia/assignment-question-1/assets/104261885/5b8c0d79-3332-427a-973d-1c85e0ce9ac0">

