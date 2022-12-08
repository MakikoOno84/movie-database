import {useState,useEffect} from "react";
import {Link} from 'react-router-dom';
import {Nav} from '../components/Nav';
// import '../styles/Header.css';
import logo from "../assets/moviedatabase_logo.svg";

export const Header = () => {
    const [navOpen, setNavOpen] = useState(false);

    const showHideNav = () => {
      setNavOpen(!navOpen);
    };
  
    const isDesktop = e => {
      if (e.matches) {
        setNavOpen(false);
      }
    };

    useEffect(() => {
        let mediaQuery = window.matchMedia('(min-width: 600px)');
        mediaQuery.addEventListener('change', isDesktop);
        // this is the cleanup function to remove the listener
        return () => mediaQuery.removeEventListener('change', isDesktop);
      }, []);

    return (
        // <header className="header">
        //     <Nav/>
        // </header>

        <header className={navOpen ? 'show' : undefined}>
        <div>
          <Link to="/" className="logo"><img width="80px" height="auto" src={logo} alt="" /></Link>
        </div>
        
        {/**
         * HTML for the Hamburger icon modified from HTMl
         * found at this codepen:
         * https://codepen.io/RRoberts/pen/ZBYaJr
        */}
         <button
          className="btn-main-nav"
          onMouseDown={e => {
            e.preventDefault();
          }}
          onClick={showHideNav}
        >
          <span className="hamburger-icon">
            <span className="line"></span>
            <span className="line"></span>
            <span className="line"></span>
          </span>
          <span className="sr-only">Menu</span>
        </button>
        <Nav handleShowHideNav={showHideNav} />
      </header>
    )
    ;
};

