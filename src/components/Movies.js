import {Link} from 'react-router-dom';
import {createImageFullPath} from '../scripts/script';
import {profile_size} from '../globals/globalVariables';
import { Favorite } from './Favorite';

export const Movies = ({contents, base_url, area_name}) => {
    const image_size = "w185"; // Ask: Should I get from cnofiguration?

      function makeShortOverview(text) {
        const max_length = 100;
        let modStr = '';
        if (text.length > max_length) {
          modStr = text.substr(0, max_length) + '...';
        } else {
          modStr = text;
        }
        return modStr;
      }

    return (
          <>

{contents && 
                    contents.map((oneContent,i) => 
                    
                    <article className={`${area_name}-item`} key={i}>
                    <div className='item-image-container'>
                      <div className="item-image">
                        <img src={createImageFullPath(oneContent.poster_path,base_url,profile_size)} alt={oneContent.title} />
                        <div className="item-overlay">
                          <Link 
                            to={`/movie-detail/${oneContent.id}`}
                              state= {{movie: oneContent, base_url: base_url}}
                          >
                          <p className="item-moreinfo">more info</p>
                          </Link>
                        </div>
                      </div>

                    </div>
                    <div className='item-content'>
                      <h2>{oneContent.title}</h2>
                        <Favorite oneMovie={oneContent}/>
                      <h3>{oneContent.release_date} </h3>
                      <p>
                      {makeShortOverview(oneContent.overview)}
                      </p>
                    </div>
                    </article>
                    )
            }

            </>
          
    )

}