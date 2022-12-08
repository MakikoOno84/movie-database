import Slider from "react-slick";
import "../../node_modules/slick-carousel/slick/slick.css";
import "../../node_modules/slick-carousel/slick/slick-theme.css"; 


export const Banner = ({contents, banner_url}) => {

const settings = {
      dots: false,
      arrows:false,
      infinite: true,
      // speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 5000, //milliseconds
      speed:1000,
      initialSlide: 0
  };
    const image_size = "w780"; // Ask: Should I get from cnofiguration?

        // Function to create full path for poster image
        function createImageFullPath(base_url,poster_path) {
          const poster_full_path = base_url + poster_path;
          return poster_full_path;
      }
  

    return (
        <Slider {...settings}>
        {contents && 
                  contents.results.map((oneContent,i) => 
                  oneContent.backdrop_path &&
                     <div className="banner-image" key={i}>
                      <img src={createImageFullPath(banner_url,oneContent.backdrop_path)} alt={oneContent.title} />
                    </div>
                  )
          }
      </Slider>
    )

}