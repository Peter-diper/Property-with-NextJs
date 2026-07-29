import React from "react";

const GroupSelector = ({ id, values = [], selectValue, onHandle }) => {
  return (
    <select
      id="property-type"
      className="w-full px-4 py-3 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring focus:ring-blue-500"
      value={selectValue}
      onChange={onHandle}
    >
      {values.map((value) => (
        <option key={value} value={value}>
          {value}
        </option>
      ))}
    </select>
  );
};

export default GroupSelector;
