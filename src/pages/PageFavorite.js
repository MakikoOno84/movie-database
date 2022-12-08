import React from "react";
import {useSelector} from 'react-redux'; 
import {Movies} from '../components/Movies';
import {poster_url_path} from '../globals/globalVariables';
import {Link} from 'react-router-dom';

export const PageFavorite = () => {
    const favoriteMovies = useSelector((state) => state.favorite.favoriteMovies);
    return (
        <main>
            <section className='movie-area favorite-page'>
                {favoriteMovies.length !== 0 ? <Movies  contents={favoriteMovies} base_url={poster_url_path} area_name="movie"/> : <p className="sorry-msg">Sorry you have no favorited movies. Return to <Link to={'/'} className="link-home">Home</Link> to add a favorite movie.</p>}
            </section>
        </main>
    );
};

export default PageFavorite;