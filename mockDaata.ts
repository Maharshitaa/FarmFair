export type Produce = {
  id: string;
  name: string;
  nameTamil: string;
  emoji: string;
  farmer: string;
  village: string;
  price: number;
  marketPrice: number;
  stockKg: number;
  rating: number;
  ratings: number;
  verified: boolean;
  harvested: string;
  category: "Vegetables" | "Fruits" | "Grains";
};

export const produce: Produce[] = [
  { id: "p1", name: "Tomato", nameTamil: "தக்காளி", emoji: "🍅", farmer: "Murugan R.", village: "Palacode", price: 22, marketPrice: 40, stockKg: 38, rating: 4.7, ratings: 42, verified: true, harvested: "Harvested today", category: "Vegetables" },
  { id: "p2", name: "Red Onion", nameTamil: "வெங்காயம்", emoji: "🧅", farmer: "Selvam K.", village: "Pennagaram", price: 28, marketPrice: 45, stockKg: 60, rating: 4.5, ratings: 31, verified: false, harvested: "Harvested yesterday", category: "Vegetables" },
  { id: "p3", name: "Carrot", nameTamil: "காரட்", emoji: "🥕", farmer: "Lakshmi D.", village: "Morappur", price: 35, marketPrice: 55, stockKg: 25, rating: 4.9, ratings: 58, verified: true, harvested: "Harvested today", category: "Vegetables" },
  { id: "p4", name: "Corn", nameTamil: "சோளம்", emoji: "🌽", farmer: "Rajan P.", village: "Harur", price: 18, marketPrice: 30, stockKg: 80, rating: 4.3, ratings: 22, verified: false, harvested: "Harvested yesterday", category: "Grains" },
  { id: "p5", name: "Banana", nameTamil: "வாழைப்பழம்", emoji: "🍌", farmer: "Mani S.", village: "Nallampalli", price: 32, marketPrice: 50, stockKg: 50, rating: 4.8, ratings: 67, verified: true, harvested: "Harvested today", category: "Fruits" },
  { id: "p6", name: "Capsicum", nameTamil: "குடமிளகாய்", emoji: "🫑", farmer: "Priya V.", village: "Dharmapuri", price: 55, marketPrice: 90, stockKg: 15, rating: 4.6, ratings: 19, verified: false, harvested: "Harvested today", category: "Vegetables" },
];

export const heroStats = [
  { icon: "🌾", label: "Active Farmers", value: "142" },
  { icon: "📦", label: "Orders This Week", value: "890" },
  { icon: "💰", label: "Farmer Earns", value: "87%" },
  { icon: "⭐", label: "Avg. Rating", value: "4.8" },
];

export const farmerListings = [
  { produce: "Tomato", qty: "50kg", price: "₹22", orders: "8 orders", status: "Active", revenue: "₹176" },
  { produce: "Onion", qty: "30kg", price: "₹28", orders: "3 orders", status: "Active", revenue: "₹84" },
  { produce: "Brinjal", qty: "20kg", price: "₹15", orders: "0 orders", status: "Pending", revenue: "₹0" },
];

export const weeklyEarnings = [
  { week: "W1", earnings: 6200 },
  { week: "W2", earnings: 7800 },
  { week: "W3", earnings: 9100 },
  { week: "W4", earnings: 9870 },
];

export const zones = [
  {
    id: "z1", name: "Hosur South", pin: "635109", orders: 8, km: 12, vehicles: 1, color: "primary",
    orderList: [
      { name: "Priya M.", items: "2kg Tomato + 1kg Onion", total: "₹72" },
      { name: "Ravi K.", items: "3kg Carrot", total: "₹105" },
      { name: "Meena S.", items: "1kg Tomato + 2kg Banana", total: "₹86" },
    ],
    more: 5,
  },
  { id: "z2", name: "Hosur North", pin: "635120", orders: 10, km: 18, vehicles: 1, color: "harvest",
    orderList: [
      { name: "Anitha R.", items: "5kg Onion", total: "₹140" },
      { name: "Vijay S.", items: "2kg Capsicum", total: "₹110" },
      { name: "Geetha L.", items: "3kg Banana", total: "₹96" },
    ], more: 7 },
  { id: "z3", name: "Krishnagiri Town", pin: "635001", orders: 6, km: 17, vehicles: 1, color: "success",
    orderList: [
      { name: "Balan T.", items: "2kg Banana", total: "₹64" },
      { name: "Saranya P.", items: "1kg Carrot + 1kg Tomato", total: "₹57" },
    ], more: 4 },
];

export const deliveryStatus = [
  { id: "#FF-0241", customer: "Priya M.", items: "Tomato 2kg", zone: "Hosur S.", status: "Out for Delivery", driver: "Kumar" },
  { id: "#FF-0242", customer: "Ravi K.", items: "Carrot 3kg", zone: "Hosur S.", status: "Delivered", driver: "Kumar" },
  { id: "#FF-0243", customer: "Anitha R.", items: "Onion 5kg", zone: "Hosur N.", status: "Packed", driver: "Selvam" },
  { id: "#FF-0244", customer: "Balan T.", items: "Banana 2kg", zone: "KGI Town", status: "Packed", driver: "Pradeep" },
];

export const trackOrder = {
  id: "#FF-0241",
  items: "Tomato 2kg + Onion 1kg",
  farm: "Murugan R., Palacode",
  total: "₹72",
  delivery: "Tomorrow 7–9 AM",
  driver: "Kumar",
  eta: "~40 minutes",
  steps: [
    { label: "Order Confirmed", done: true },
    { label: "Packed at Farm", done: true },
    { label: "Out for Delivery", done: false, current: true },
    { label: "Delivered", done: false },
  ],
};
