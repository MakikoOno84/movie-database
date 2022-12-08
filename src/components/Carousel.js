import Slider from "react-slick";
import {Link} from 'react-router-dom';
import "../../node_modules/slick-carousel/slick/slick.css";
import "../../node_modules/slick-carousel/slick/slick-theme.css"; 

import { FaRegHeart } from "@react-icons/all-files/fa/FaRegHeart";
import { FaHeart } from "@react-icons/all-files/fa/FaHeart";
import { IconContext } from "@react-icons/all-files/lib";
import {useSelector,useDispatch} from 'react-redux'; 
import { addFavorite,deleteFavorite } from '../features/favorite/favoriteSlice';


export const Carousel = ({contents, base_url, area_name}) => {

  const favoriteMovies = useSelector((state) => state.favorite.favoriteMovies);
  const dispatch = useDispatch();
  const settings = {
      dots: false,
      arrows:true,
      infinite: false,
      speed: 500,
      slidesToShow: 5,
      slidesToScroll: 5,
      speed:1000,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
  };
    const image_size = "w185"; // Ask: Should I get from cnofiguration?

        // Function to create full path for poster image
        function createImageFullPath(base_url,poster_path,area_name) {
          const poster_full_path = base_url + image_size + poster_path;
          return poster_full_path;
      }
  
      // Function to convert user score to percentage
      function convertUserScore2Percentage(userScore) {
          const percentUserScore = Math.round(userScore * 10);
          return percentUserScore;
      }

      function inFavorite(id,arr) {
        return arr.some(item => item.id === id);
      }
      function makeShortOverview(text) {
        const max_length = 98;
        let modStr = '';
        if (text.length > max_length) {
          modStr = text.substr(0, max_length) + '...';
        } else {
          modStr = text;
        }
        return modStr;
      }

    return (
      
        <Slider {...settings}>
          {contents && 
                    contents.results.map((oneContent,i) => 
                    
                    <div className={`${area_name}-item`}>
                    {/* Ask: another way to concatinate to create full path? */}
                      <div className="item-image">
                        <img src={createImageFullPath(base_url,oneContent.poster_path)} alt={oneContent.title} />
                        <div className="item-content">
                          <Link 
                            to={`/movie-detail/${oneContent.id}`}
                              state= {{movie: oneContent, base_url: base_url}}
                          >
                          <p className="item-moreinfo">more info</p>
                          </Link>
                        </div>
                      </div>
                      <div className="item-rating-fav">
                        <div className="rating">
                          <p>{convertUserScore2Percentage(oneContent.vote_average)}%</p>
                        </div>
                        <div className="togglefav">
                          {inFavorite(oneContent.id,favoriteMovies) === true ? <button type="submit" onClick={() => dispatch(deleteFavorite(oneContent))} className="favorite">
                            Unfavorite this movie
                          </button> 
                          : <button type="submit" onClick={() => dispatch(addFavorite(oneContent))} className="unfavorite">
                          Favorite this movie
                        </button>
                          }
                        </div>
                      </div>
                      <h3>{oneContent.title}</h3>
                      <p>{oneContent.release_date} <br/>
                      {makeShortOverview(oneContent.overview)}
                      </p>

                    </div>
                    )
            }
        </Slider>
          
    )

}