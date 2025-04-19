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
    min: 0,
    max: 5000,
    step: 100,
    type: "range slider",
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
    min: 0,
    max: 5000,
    step: 100,
    type: "range slider",
  },
];

export const AdminOrderFilterData = [
  {
    title: "OrderDate",
    type: "date",
  },
  {
    title: "Duration",
    type: "date",
  },
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
