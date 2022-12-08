import Slider from "react-slick";
import "../../node_modules/slick-carousel/slick/slick.css";
import "../../node_modules/slick-carousel/slick/slick-theme.css"; 
import {createImageFullPath} from '../scripts/script';

export const Casts = ({contents, base_url, profile_size}) => {

    const settings = {
        dots: false,
        arrows:true,
        draggable: true,
        infinite: false,
        slidesToShow: 5,
        slidesToScroll: 5,
        responsive: [
          {
            breakpoint: 1200,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 4,
              infinite: true,
              dots: false
            }
          },
          {
            breakpoint: 1000,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: false
            }
          },
          {
            breakpoint: 860,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2,
              dots: false
            }
          },
          {
            breakpoint: 580,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              dots:false
            }
          }
        ]
    };

    return (
        <Slider {...settings}>
        {contents && 
                  contents.cast.map((oneCast,i) =>
                    <div className="cast-item" key={i}> 
                     <div className="cast-image">
                      <img src={createImageFullPath(oneCast.profile_path,base_url,profile_size)} alt={oneCast.name} />
                    </div>
                    <p className="cast-name">{oneCast.name}</p>
                    </div>
                  )
          }
      </Slider>
    )

}