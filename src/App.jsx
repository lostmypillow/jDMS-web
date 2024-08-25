import { useState } from "react";
import axios from "axios";
// const sourceLink = "http://localhost:3001/test?url=";

function App() {
  // const [count, setCount] = useState(0);
  const [sourceLink, setSourceLink] = useState(
    "https://jdms.onrender.com/test?url="
  );
  const [title, setTitle] = useState();
  const [date_source_author, setDate_source_author] = useState();
  const [link, setLink] = useState();
  const [contentArray, setContentArray] = useState();
  const [testURL, setTestURL] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function handleChange(e) {
    setTestURL(e.target.value);
  }

  async function apiCall(event) {
    event.preventDefault();
    try {
      setIsLoading(true);
      const encoded = encodeURIComponent(testURL);
      const response = await axios.get(sourceLink + encoded);
      console.log(response);
      const results = await response.data;
      setIsLoading(false);
      setTitle(results.title);
      setDate_source_author(results.date_source_author);
      setLink(results.link);
      setContentArray(results.content);
    } catch (error) {
      console.error(error);
    }
  }
  const [selectedSource, setSelectedSource] = useState("localhost");
  return (
    <>
      <main className="container-fluid">
        <h1>JDMS</h1>
        {sourceLink === "https://jdms.onrender.com/test?url=" ? (
          <span>
            Warning: Render's free tier is slowwwwww as fxxk, please be patient
          </span>
        ) : (
          <></>
        )}
        <br />
       <span>Supported sites: ctee, ePrice (manual), cool3c, mashdigi, sogi (manual), buzzorange, moneyudn, udn, digitimes (no content), kocpc, 3c ltn, ec ltn, xfastest, technews, techbang (buggy)</span>
        <form>
          <fieldset role="group">
            {" "} <select
          id="select_source"
          name="select"
          aria-label="Select"
          required
          value={selectedSource} // ...force the select's value to match the state variable...
          onChange={(e) => {
            setSelectedSource(e.target.value);
            setSourceLink(e.target.value);
            console.log(sourceLink);
          }}
        >
          <option selected disabled value="">
            Select Source
          </option>
          <option value="https://jdms.onrender.com/test?url=">Render</option>
          <option value="http://localhost:3001/test?url=">localhost</option>
        </select>
            <input
              type="search"
              name=""
              id=""
              value={testURL}
              onChange={handleChange}
            />
            <button
              type="submit"
              aria-busy={isLoading ? "true" : ""}
              onClick={apiCall}
            >
              Search
            </button>
          </fieldset>
        </form>

<textarea name="links" id=""></textarea>



        <p>
          {title}
          <br />
          {date_source_author}
          <br />
          <a href={link}>{link}</a>
          <br />
          {contentArray?.map((content) => (
            <>
              {content}
              <br />
              <br />
            </>
          ))}{" "}
        </p>


      </main>
    </>
  );
}

export default App;
