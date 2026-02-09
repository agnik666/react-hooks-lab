import { useEffect, useState } from "react";
import { useDebounce } from "./useDebounce";
const URL = "https://jsonplaceholder.typicode.com/posts";

export default function Demo() {
  const [query, setQuery] = useState("");
  const [apiData, setApiData] = useState([]); // use apiData state as a master unchanged data
  const [filteredData, setFilteredData] = useState([]);

  const debouncedQuery = useDebounce(query, 1000);

  useEffect(() => {
    const fetchApiData = async () => {
      const res = await fetch(URL);
      const data = await res.json();

      setApiData(data);
      setFilteredData(data);
      console.log(data);
    };

    fetchApiData();
  }, []);

  useEffect(() => {
    if (!debouncedQuery) {
      setFilteredData(apiData);
      return;
    }

    const filteredData = apiData.filter((data) =>
      data.title.includes(debouncedQuery),
    );
    setFilteredData(filteredData);
  }, [debouncedQuery, apiData]);

  return (
    <>
      <input
        placeholder="Search for text..."
        onChange={(e) => setQuery(e.target.value)}
      ></input>
      <div>
        <ol>
          {filteredData.map((data) => {
            return <li key={data.id}>{data.title}</li>;
          })}
        </ol>
      </div>
    </>
  );
}
