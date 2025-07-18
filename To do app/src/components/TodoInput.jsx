import { Input, Button } from "antd";
import { useState } from "react";

export default function TodoInput({ addTodo }) {
  const [value, setValue] = useState("");

  const handleAdd = () => {
    addTodo(value);
    setValue("");
  };

  return (
    <div className="flex gap-2 mb-6">
      <Input
        placeholder="add details"
        value={value}
        onChange={e => setValue(e.target.value)}
        onPressEnter={handleAdd}
        className="flex-1"
        size="large"
      />
      <Button
        type="primary"
        size="large"
        onClick={handleAdd}
        className="px-6"
      >
        Add
      </Button>
    </div>
  );
}