import { useAsyncDebounce } from "react-table";
import { useCallback, useState } from "react";

export const GlobalFilter = ({ filter, setFilter }) => {
  const [value, setValue] = useState(filter);

  const onChange = useAsyncDebounce(value => setFilter(value || undefined), 1000);

  const handleChange = useCallback((e) => {
    setValue(e.target.value);
    onChange(e.target.value);
  }, [onChange]);

  return (
    <div>
      <p>Search: </p>
      <input 
        type="text"
        value={value || ""}
        onChange={handleChange}
      />
    </div>
  )
}