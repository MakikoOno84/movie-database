import { FaRegHeart } from "@react-icons/all-files/fa/FaRegHeart";
import { FaHeart } from "@react-icons/all-files/fa/FaHeart";
import { IconContext } from "@react-icons/all-files/lib";
import {useSelector,useDispatch} from 'react-redux'; 
import { addFavorite,deleteFavorite } from '../features/favorite/favoriteSlice';
import {convertUserScore2Percentage} from '../scripts/script';

export const Favorite = ({oneMovie}) => {
    const favoriteMovies = useSelector((state) => state.favorite.favoriteMovies);
    const dispatch = useDispatch();
    function inFavorite(id,arr) {
        return arr.some(item => item.id === id);
      }
    return (
        <div className="item-rating-fav">
            <div className="rating">
            <p>{convertUserScore2Percentage(oneMovie.vote_average)}%</p>
            </div>
            <div className="togglefav">
            {inFavorite(oneMovie.id,favoriteMovies) === true ? <button type="submit" onClick={() => dispatch(deleteFavorite(oneMovie))} className="favorite">
            Unfavorite this movie
            </button> 
            : <button type="submit" onClick={() => dispatch(addFavorite(oneMovie))} className="unfavorite">
            Favorite this movie
        </button>
            }
        </div>
      </div>
    )
}
