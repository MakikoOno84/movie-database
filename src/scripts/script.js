
      // Function to convert user score to percentage
      function convertUserScore2Percentage(userScore) {
        const percentUserScore = Math.round(userScore * 10);
        return percentUserScore;
    }

      // Function to create full path for poster image
      function createImageFullPath(file_path,base_url=null,size=null) {
        // console.log('createImageFullPath is called!');
        // console.log(`base_url is ... ${base_url}`);
        let poster_full_path = "";

        if (file_path === "/fwd-placeholder-person.png" || file_path === "/fwd-placeholder-movie-poster.png") {
          // React won't load local images
          // https://stackoverflow.com/questions/34582405/react-wont-load-local-images
          poster_full_path = require("../images" +file_path);
        } else if (base_url !== null && size !== null) {
          poster_full_path = base_url + size + file_path;
        }
        // console.log(`poster_full_path is ... ${poster_full_path}`);
        return poster_full_path;
    }

    export {convertUserScore2Percentage, createImageFullPath}