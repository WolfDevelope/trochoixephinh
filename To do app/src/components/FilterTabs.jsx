import { Tabs } from "antd";

const tabItems = [
  { key: "all", label: "All" },
  { key: "active", label: "Active" },
  { key: "completed", label: "Completed" },
];

export default function FilterTabs({ filter, setFilter }) {
  return (
    <Tabs
      activeKey={filter}
      onChange={setFilter}
      centered
      items={tabItems}
      className="mb-4"
      tabBarStyle={{
        borderBottom: "1px solid #e5e7eb",
        marginBottom: 0,
      }}
    />
  );
}