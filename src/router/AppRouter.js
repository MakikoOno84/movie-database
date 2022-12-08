import React from 'react';
import {BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import {PageHome} from '../pages/PageHome';
import {PageAbout} from '../pages/PageAbout';
import {PageFavorite} from '../pages/PageFavorite';
import {PageNotFound} from '../pages/PageNotFound';
import {PageMovieDetail} from '../pages/PageMovieDetail';
export const AppRouter = () => {
    const appInfo = {
        author: "Makiko Ono",
        appname: "Movie World",
    }
    return (
        <BrowserRouter basename={'/movie-app'}>
            <div className='site-wrapper'>
            <Header />
            <Routes>
                <Route path="/" element={<PageHome />}/>
                <Route path="/favorite" element={<PageFavorite />}/>
                <Route path="/about" element={<PageAbout />}/>
                <Route path="*" element={<PageNotFound />}/>
                <Route path="/movie-detail/:id" element={<PageMovieDetail/>} />
            </Routes>
            <Footer author={appInfo.author} appname={appInfo.appname}/>
            </div>
        </BrowserRouter>
    )
};

