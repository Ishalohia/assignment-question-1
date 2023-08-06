import React from "react";
import Card from "./Card";

const exampleCardData = {
  key1: "Value 1",
  key2: "Value 2",
  key3: "Value 3",
};

export default {
  title: "Components/Card",
  component: Card,
};

// Story Template
const Template = (args) => <Card {...args} />;

// Default Card with Data
export const CardWithData = Template.bind({});
CardWithData.args = {
  cardData: exampleCardData,
  title: "Card with Data",
};

// Default Card with No Data
export const CardWithNoData = Template.bind({});
CardWithNoData.args = {
  cardData:{},
  title: "Card with No Data",
};
