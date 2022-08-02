import { useState } from "react";
import Trie from "../autocomplete/Trie";
import "./SearchInput.css";

const dictionary = {
  words: [
    "hello",
    "helium",
    "world",
    "car",
    "carpet",
    "test",
    "this",
    "that",
    "those",
    "working",
    "is",
  ],
};

export default function SearchInput() {
  const [prefix, setPrefix] = useState("");
  const [suggestion, setSuggestion] = useState("");

  const myTrie = new Trie();

  (async () => {
    // const dictionary = await getWords();
    const words = dictionary.words;
    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      myTrie.insert(word);
    }
  })();

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setPrefix(value);
    const words = value.split(" ");
    const triePrefix = words[words.length - 1].toLowerCase();
    const foundWords = myTrie.find(triePrefix).sort((a, b) => {
      return a.length - b.length;
    });
    const firstWord = foundWords[0];
    if (
      foundWords.length !== 0 &&
      value !== "" &&
      value[value.length - 1] !== " "
    ) {
      if (firstWord != null) {
        var remainder = firstWord.slice(triePrefix.length);
        setSuggestion(value + remainder);
      }
    } else {
      setSuggestion(value);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.keyCode === 39) {
      setPrefix(suggestion);
    }
  };

  return (
    <div className="input-group flex-nowrap">
      <span className="input-group-text" id="addon-wrapping">
        <i className="bi bi-search"></i>
      </span>
      <div id="search-inputs-container">
        <input
          id="search-input"
          type="text"
          name="searchbar"
          className="form-control"
          placeholder="Search for a city"
          value={prefix}
          aria-label="Search for a city"
          aria-describedby="addon-wrapping"
          onChange={onChange}
          onKeyDown={handleKeyDown}
        />
        <input
          id="search-input-overlay"
          type="text"
          name="searchbar"
          className="form-control"
          value={suggestion}
        />
      </div>

      <button
        className="btn btn-primary"
        type="button"
        id="current-location-button"
      >
        <i className="bi bi-geo-alt"></i>
      </button>
    </div>
  );
}
