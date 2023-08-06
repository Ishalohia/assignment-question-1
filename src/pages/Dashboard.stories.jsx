
import React from "react";
import  Dashboard  from "./Dashboard";

export default {
  title: "Pages/Dashboard",
  component: Dashboard,
  argTypes: {
    theme: {
      control: {
        type: "select",
        options: ["light", "dark"],
      },
    },
  },
};

const Template = (args) => <Dashboard {...args} />;

export const LightTheme = Template.bind({});
LightTheme.args = {
  theme: "light",
};

export const DarkTheme = Template.bind({});
DarkTheme.args = {
  theme: "dark",
};
