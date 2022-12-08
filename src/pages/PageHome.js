import React, { useEffect, useState, useRef } from "react";
import {apiKey, endPointConfiguration, endPointTrending, endPointTopRating, endLanguage, endPointGenre, poster_url_path,banner_url_path, endPointMovie, endPointSearch} from '../globals/globalVariables';
import "../../node_modules/slick-carousel/slick/slick.css";
import "../../node_modules/slick-carousel/slick/slick-theme.css";
import {Movies} from "../components/Movies";
import { SearchBox } from "../components/SearchBox";
import { Banner } from "../components/Banner";

export const PageHome = () => {

    const [configuration, setConfiguration] = useState(false);
    const [trending, setTrending] = useState(false);
    const [currentSelect, setcurrentSelect] = useState("popular");
    const [selectedMovies, setselectedMovies] = useState(false);
    const [trimmedMovies, setTrimmedMovies] = useState([]);
    // check if it's first load to avoid unnecessary API calls
    // https://koke-tech-blog.vercel.app/posts/lmxLA05NB5Y3QF5c6iPc
    const isFirstRender = useRef(true);
    const [isSearch, setIsSearch] = useState(false);
    
    
    // Fetch configuration
    useEffect(
        () => {
            // Call API only when its a first load or configuration is false
            if (isFirstRender.current===false) {
                return;
            } else if (configuration) {
                return;
            }
            const fetchConfiguration = async () => {
                const res = await fetch(`${endPointConfiguration}api_key=${apiKey}`
                );
                let data = await res.json();
                setConfiguration(data);
                // base_url = data.images.base_url;
                // console.log(`base url is...${base_url}`);
            }
            fetchConfiguration();
            // console.log('fetchConfiguration is called!');
        },[]
    );
    // Fetch genre string
    // useEffect(
    //     () => {
    //         const fetchGenre = async () => {
    //             const res = await fetch(`${endPointGenre}api_key=${apiKey}&language=${endLanguage}`
    //             );
    //             let data = await res.json();
    //             setGenreList(data);
    //         }
    //         fetchGenre();
    //     },[]
    // )
    // Fetch Trending
        useEffect(
            () => {
            // Call API only when its a first load or trending is false
                if (isFirstRender.current===false) {
                    return;
                } else if (trending) {
                    return;
                }
                const fetchTrending = async () => {
                    const res = await fetch(`${endPointTrending}api_key=${apiKey}`
                        );
                    let data = await res.json();
                    setTrending(data);
                }
                fetchTrending();
                // console.log('fetchTrending is called!');
            },[]
            );
    // Fetch Popular
    useEffect(
        () => {
            // Call API only when its a first load or selectedMovies is false
            if (isFirstRender.current===false) {
                return;
            } else if (selectedMovies) {
                return;
            }
            const fetchPopular = async () => {
                const res = await fetch(`${endPointMovie}popular?api_key=${apiKey}&language=${endLanguage}&page1`
                    );
                let data = await res.json();
                // if profile_poster is null, replace it with placeholder image
                for (let i=0 ; i < data.results.length ; i++) {
                    if (data.results[i].poster_path === null) {
                        data.results[i].poster_path = "/movie-poster-placeholder.png";
                    }
                }
                let trimmeddata = data.results.splice(0,12);
                // console.log(trimmeddata);
                setTrimmedMovies(trimmeddata);
                setselectedMovies(data);
            }
            fetchPopular();
            // console.log('fetchPopular is called!');
        },[]
        );

    // Fetch Selected 
    useEffect(
        () => {
            // Call API only when its NOT a first load
            if (isFirstRender.current) {
                return;
            } 
            const fetchSelectedContents = async () => {
                const res = await fetch(`${endPointMovie}${currentSelect}?api_key=${apiKey}&language=${endLanguage}&page1`
                    );
                let data = await res.json();
                // if profile_poster is null, replace it with placeholder image
                for (let i=0 ; i < data.results.length ; i++) {
                    if (data.results[i].poster_path === null) {
                        data.results[i].poster_path = "/fwd-placeholder-movie-poster.png";
                    }
                }
                let trimmeddata = data.results.splice(0,12);
                // console.log(trimmeddata);
                setTrimmedMovies(trimmeddata);
                setselectedMovies(data);
                // console.log(trimmedMoviesArray);
            }
            fetchSelectedContents();
            // console.log('fetchSelectedContents is called!');
        },[currentSelect]
    );

        function onChangeHandlerSelect(event) {
            // console.log("onChangeHandlerSelect is called!");
            // console.log(event.target.value);            
            setcurrentSelect(event.target.value);
            }

        // autocomplete search
        // https://medium.com/codex/react-autocomplete-search-from-api-d8397e6f2e02
        const [movies,setMovies] = useState([]);
        const [searchText, setSearchText] = useState('');
        const [suggestions, setSuggestions] = useState([]);
        
        useEffect(() => {
            // Call API only when its a first load or searchText is empty string
            if (isFirstRender.current) {
                isFirstRender.current = false;
                return;
            } else if (searchText === "") {
                return;
            }
            // replace space with + for search API
            let searchstr = searchText;
            searchstr = searchstr.replace(/ +/g, '+');
            // console.log("searchstr is...", searchstr);
            // run after the first load
            const fetchSuggestions = async () => {
                const res = await fetch(`${endPointSearch}?api_key=${apiKey}&query=${searchstr}&page=1`);
                let data = await res.json();
                // console.log(data.results);
                // if profile_poster is null, replace it with placeholder image
                for (let i=0 ; i < data.results.length ; i++) {
                    if (data.results[i].poster_path === null) {
                        data.results[i].poster_path = "/fwd-placeholder-movie-poster.png";
                    }
                }
                // setMovies(data.results);
                setSuggestions(data.results);
                // console.log(data.results);
            }
            fetchSuggestions();
            // console.log('fetchSuggestions is called!');
        }, [searchText]);
        
        
        function onChangeHandlerSearch(text) {
            // console.log('onChangeHandlerSearch is called!');
            setSearchText(text);
            // console.log('searchText is...',text);
            // add active class on search-container
            // const searchContainer = document.getElementById("search-results-area");
            // searchContainer.classList.add("active");
            setIsSearch(true);

        }

        function toggleMovieType(type) {
            // console.log(type);
            setcurrentSelect(type);
        }
    return (
        <>
        <main>
                <section className="banner-area">
                    {configuration && trending ? <Banner  contents={trending} banner_url={banner_url_path} /> : <p>API not run</p>}
                    <div className="banner-content">
                        <h1 className="page-title">Welcome to Movie World!</h1>
                        <section className="search-area">
                            <SearchBox onChangeFunction={onChangeHandlerSearch} setSuggestions={setSuggestions} searchtext={searchText} suggestions={suggestions} isSearch={isSearch} setIsSearch={setIsSearch}/>
                        </section>
                    </div>
                </section>
                <div className="home-wrapper">

                    <section className="select-area">
                            <select name="" id="movie-display-type" className="movie-display-type" onChange={onChangeHandlerSelect} defaultValue="popular">
                                <option value="popular" >Popular</option>
                                <option value="top_rated">Top Rated</option>
                                <option value="now_playing">Now Playing</option>
                                <option value="upcoming">Up Coming</option>
                            </select>
                    </section>
                    <section className="select-area-test">
                        <a href="" className="select-area-test-lists-wrap">Select</a>
                        <ul className="select-area-test-lists">
                            <li value="popular" onClick={() => toggleMovieType('popular')}>Popular</li>
                            <li onClick={() => toggleMovieType('top_rated')}>Top Rated</li>
                            <li onClick={() => toggleMovieType('now_playing')}>Now Playing</li>
                            <li onClick={() => toggleMovieType('upcoming')}>Up Coming</li>
                        </ul>
                    </section>
                    <section className="movie-area home-page">
                            {configuration && trimmedMovies ? <Movies  contents={trimmedMovies} base_url={configuration.images.base_url} area_name="movie"/> : <p>API not run</p>}
                    </section>
                </div>
        </main>
        </>
    );
};

export default PageHome;
