import React from "react";
import tmdb_logo  from "../images/TMDB-logo-long.svg";

export const PageAbout = () => {
    return (
    <main>
    <section className="page-about">
        <p>This product uses the TMDb API but is not endorsed or certified by TMDb.<br/>
        The “Movie Database” is a community built movie and TV database that allows you to search, favorite, and find more information on movies and TV shows around the world. <br/>This application was created for educational purposes only.</p>
        <img src={tmdb_logo} alt="TMDB logo" />
    </section>
    </main>
    );
};