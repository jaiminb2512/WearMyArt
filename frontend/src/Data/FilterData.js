export const ProductFilterData = [
  {
    title: "Size",
    Options: ["XXL", "XL", "L", "M", "S"],
  },
  {
    title: "Sleeve",
    Options: ["Full Sleeve", "Half Sleeve", "Sleeveless"],
  },
  {
    title: "CustomizeOption",
    Options: ["Photo", "Text", "Both"],
  },
  {
    title: "Color",
    Options: ["Black", "White", "Green", "Yellow", "Blue"],
  },
  {
    title: "Price",
    Options: ["0-499", "499-999", "999-1999", "1999+"],
    type: "radio",
  },
  {
    title: "Sort",
    Options: ["Low to High", "High To Low"],
    type: "radio",
  },
];

export const AdminProductFilterData = [
  {
    title: "Avalibility",
    Options: ["All", "Discontinued", "Available"],
    type: "radio",
  },
];

export const OrderFilterData = [
  {
    title: "Status",
    Options: [
      "Pending",
      "Process",
      "Ready",
      "Shipped",
      "Completed",
      "Rejected",
    ],
    type: "AutoComplete",
  },
  {
    title: "FinalCost",
    Options: ["0-499", "499-999", "999-1999", "1999+"],
    type: "radio",
  },
];

export const AdminOrderFilterData = [
  // {
  //   title: "Order Date",
  //   type: "date",
  // },
  // {
  //   title: "Duration",
  //   type: "date",
  // },
  {
    title: "Quantity",
    type: "input",
  },
  {
    title: "CustomizedType",
    Options: ["Photo", "Text", "Both"],
    type: "radio",
  },
];
