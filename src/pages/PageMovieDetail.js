import { useEffect, useState  } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import {apiKey, endPointConfiguration, endPointMovie, endLanguage, endPointCast,profile_size,banner_url_path, poster_size_for_movie_detail,backgroundimg_size_for_movie_detail} from '../globals/globalVariables';
import {movieGenre} from '../data/movieGenre';
import { Casts } from "../components/Casts";
import {createImageFullPath} from '../scripts/script';
import { Favorite } from '../components/Favorite'; 

export const PageMovieDetail = () => {
    console.log("pageMovieDetails called!");
    const testArray = ["A","B","C"];
    const n = 2;
    const {id} = useParams();
    
    const [casts, setCasts] = useState(false);
    useEffect(
        () => {
            const fetchCast = async () => {
                const res = await fetch (`${endPointCast}/${id}/credits?api_key=${apiKey}&language=${endLanguage}`
                );
                let data = await res.json();
                // if there is no cast data, return
                if (data.cast.length === 0 ) {
                    return
                }
                // if profile_poster is null, replace it with placeholder image
                for (let i=0 ; i < data.cast.length ; i++) {
                    if (data.cast[i].profile_path === null) {
                        data.cast[i].profile_path = "/fwd-placeholder-person.png";
                    }
                }
                setCasts(data);
                // console.log('cats.cast.length is...'+ data.cast.length);
            }
            fetchCast();
        },[]
    )

    let location = useLocation();
    const {movie} = location.state;
    const {base_url} = location.state;
    const backgroundimg_desktop = base_url + backgroundimg_size_for_movie_detail + movie.backdrop_path;

    function getGenre2String (genreArray) {
        let genreList;
        genreArray.forEach((genre, index) => {
            // console.log(`genre_id is ${genre}`);
            for (let i=0 ; i < movieGenre.length ; i++) {
                if (genre === movieGenre[i].id) {
                    if (index === 0) {
                        genreList = movieGenre[i].name;
                    } else {
                        genreList = genreList + "," + movieGenre[i].name;
                    }
                }
            }
        }
        );
        return genreList;
    }

    return (
        <main>
        <section className='movie-detail-area'>
                <div className='movie-detail-overlay'>
                    { movie.backdrop_path !== null &&
                    <img className="movie-detail-background-image" src={`${backgroundimg_desktop}`} alt="" /> }
                    <div className='movie-detail-content'>
                        <img src={`${createImageFullPath(movie.poster_path,base_url,poster_size_for_movie_detail)}`} alt="" />
                        <div className='movie-detail-content-info'>
                            <div className='movie-detail-content-info-top'>
                                <h1>{movie ? 
                                    movie.title : "No Title"
                                }</h1>
                                <Favorite oneMovie={movie}/>
                            </div>
                            <ul>
                                <li>{movie.release_date ? movie.release_date: "Release Date is Not Available." }</li>
                                <li>{getGenre2String(movie.genre_ids) ? getGenre2String(movie.genre_ids) : "Genre Data is Not Available."}</li>
                            </ul>
                            <h2>Overview</h2>
                            <p>{movie.overview ? movie.overview : "Overview is Not Available." }</p>
                        </div>
                    </div>
                </div>
            <div className='movie-detail-casts'>
                <h2>Casts</h2>
                {casts ? <Casts  contents={casts} base_url={base_url} profile_size={profile_size} /> : <p>Cast Data is Coming Soon!</p>}
            </div>
        </section>
        </main>
    )
}