import {Link} from 'react-router-dom';
import {poster_size_for_search_suggest, poster_url_path} from '../globals/globalVariables';
import {convertUserScore2Percentage,createImageFullPath} from '../scripts/script';

export const SearchBox = ({onChangeFunction,setSuggestions,searchtext,suggestions,isSearch,setIsSearch}) => {



    return (
        <section className='search-container'>
            <form action="">
                <label>
                    <input type="text" 
                    onChange={e=>onChangeFunction(e.target.value)}
                    value={searchtext}
                    placeholder="Seach for a movie here..."
                    onBlur={()=> {
                        // ****This prevents from accessing detail page....
                        // const searchContainer = document.getElementById("search-results-area");
                        // searchContainer.classList.remove("active");
                        setTimeout( () => {
                        setSuggestions([]);
                        setIsSearch(false);
                    },100)
                    }}
                    />
                </label>
                {/* <input type="submit" value="Search" /> */}
            </form>
            <section className={isSearch ? "search-results-area active" :"search-results-area"  } id="search-results-area">
            {suggestions && suggestions.map((suggestion, i) =>
                <Link
                    to={`/movie-detail/${suggestion.id}`}
                    state= {{movie: suggestion, base_url: poster_url_path}}
                    key={i}
                >
                    <div className="search-result-item">
                        <img src={createImageFullPath(suggestion.poster_path,poster_url_path,poster_size_for_search_suggest)} alt={suggestion.title} />
                        <p>{suggestion.title}</p>
                        <ul>
                            <li className="rating"> {convertUserScore2Percentage(suggestion.vote_average)}%
                            </li>
                            <li>{suggestion.release_date}</li>

                        </ul>
                    </div>
                </Link>

                )}
            </section>
        </section>

    )
}

