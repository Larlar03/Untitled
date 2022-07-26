import "./SearchInput.css";

export default function SearchInput() {
  return (
    <div className="input-group flex-nowrap">
      <span className="input-group-text" id="addon-wrapping">
        <i className="bi bi-search"></i>
      </span>
      <input
        id="search-input"
        type="text"
        className="form-control"
        placeholder="Search for a city"
        aria-label="Username"
        aria-describedby="addon-wrapping"
      />
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
