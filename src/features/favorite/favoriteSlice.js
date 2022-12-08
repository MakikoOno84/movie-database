import { createSlice } from "@reduxjs/toolkit";
import { appStorageName } from "../../globals/globalVariables";

// get data from local storage
function getFavs() {
    let favsFromStorage = localStorage.getItem(appStorageName);
    if (favsFromStorage===null) {
        favsFromStorage = [];
    } else {
        favsFromStorage = JSON.parse(favsFromStorage);
    }
    return favsFromStorage;
}

const initialState = {
    favoriteMovies: getFavs()
}

function getIndex(favorite, arr) {
    return arr.findIndex(arrItem => arrItem.id === favorite.id
    );
}

export const favoriteSlice = createSlice({
    name:'favoriteMovies',
    initialState,
    reducers: {
        addFavorite: (state,action) => {
            // state.favoriteMovies=[...state.favoriteMovies, action.payload];
            const newFavs = [...state.favoriteMovies, action.payload];
            localStorage.setItem(appStorageName, JSON.stringify(newFavs));
            state.favoriteMovies = newFavs;
        },
        deleteFavorite: (state,action) => {
            // state.favoriteMovies.splice(getIndex(action.payload,state.favoriteMovies),1);
            const itemsCopy = state.favoriteMovies;
            itemsCopy.splice(getIndex(action.payload,state.favoriteMovies),1);
            localStorage.setItem(appStorageName, JSON.stringify(itemsCopy));
            state.favoriteMovies = itemsCopy;
        }
    }
});

export const {addFavorite, deleteFavorite} = favoriteSlice.actions

export default favoriteSlice.reducer;