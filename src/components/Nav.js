import {NavLink} from 'react-router-dom';

export const Nav = (handleShowHideNav) => {
    function closeNav(e) {
        if (window.innerWidth < 600) {
          handleShowHideNav();
        } else {
          e.target.blur();
        }
      }

    return (
            <nav className="main-nav" onClick={closeNav}>
            <ul>
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/about">About</NavLink>
              </li>
              <li>
                <NavLink to="/favorite">Favorite</NavLink>
              </li>
            </ul>
          </nav>
        );
};

