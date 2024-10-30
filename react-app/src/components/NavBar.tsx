import { useState } from "react";
type Props = {
  name: string;
  path?: string;
  navItems: string[];
};

function NavBar({ name, path, navItems }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  return (
    <nav className="navbar navbar-expand-md fixed-top navbar-light bg-light shadow">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img
            src={path}
            alt=""
            width="30"
            height="24"
            className="d-inline-block align-center"
          />
          <span className="fw-bolder fs-4 ">{name}</span>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse align-items-start d-flex flex-column flex-md-row"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav me-auto mb-2 mb-md-1">
            {navItems.map((items, index) => (
              <li
                key={items}
                className="nav-item"
                onClick={() => setSelectedIndex(index)}
              >
                <a
                  className={
                    selectedIndex == index
                      ? "nav-link active fw-bold"
                      : "nav-link"
                  }
                  href="#"
                >
                  {items}
                </a>
              </li>
            ))}
          </ul>
          <form className="d-flex me-3">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
