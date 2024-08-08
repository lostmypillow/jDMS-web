import { useState } from "react";
import axios from "axios";
function App() {
  // const [count, setCount] = useState(0);
  const [title, setTitle] = useState();
  const [date_source_author, setDate_source_author] = useState();
  const [link, setLink] = useState();
  const [contentArray, setContentArray] = useState();
  const [testURL, setTestURL] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  function handleChange(e) {
    setTestURL(e.target.value);
  }

  async function apiCall() {
    try {
      setIsLoading(true);
      const encoded = encodeURIComponent(testURL);
      const response = await axios.get(
        "http://localhost:3000/test?url=" + encoded
      );
      console.log(response);
      const results = await response.data.data;
      setIsLoading(false);
      setTitle(results.title);
      setDate_source_author(results.date_source_author);
      setLink(results.link);
      setContentArray(results.content);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <>
      <main className="container-fluid">
        <h1>JDMS</h1>
        <input
          type="text"
          name=""
          id=""
          value={testURL}
          onChange={handleChange}
        />

        <button aria-busy={isLoading ? "true" : ""} onClick={apiCall}>
          Search
        </button>
        <p>{title}</p>
        <p>{date_source_author}</p>
        <p>{link}</p>

        {contentArray?.map((content) => (
          <>
            <p>{content}</p>
          </>
        ))}
      </main>
    </>
  );
}

export default App;
