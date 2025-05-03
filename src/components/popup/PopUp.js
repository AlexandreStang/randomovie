import React, {useEffect, useState} from 'react';
import '../../config.js';
import {getMovieCredits, getMovieDetails, getMovieReleaseDates, getMovieTrailers} from "../../api/actions";
import {calculateRuntime} from "../../libs/utils";
import CrewList from "./CrewList";
import CastList from "./CastList";
// import Score from "../Score";

export default function PopUp({movieID, onClosePopup, canTryAgain, onTryAgain, isSmallScreen}) {

    // VARIABLES - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    const [movieDetails, setMovieDetails] = useState([]);
    const [movieCredits, setMovieCredits] = useState([]);
    const [movieCertification, setMovieCertification] = useState([""]);
    const [movieTrailer, setMovieTrailer] = useState([""])

    // FUNCTIONS - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    useEffect(() => {
        getMovieDetails(movieID).then(data => setMovieDetails(data));
        getMovieCredits(movieID).then(data => setMovieCredits(data));
        getMovieReleaseDates(movieID).then(data => findMovieCertification(data));
        getMovieTrailers(movieID).then(data => findMovieTrailer(data));
    }, [movieID]);

    function findMovieCertification(allReleases) {
        try {
            const localRelease = allReleases.find((release) => release.iso_3166_1 === global.config.REGION);
            const certifiedRelease = localRelease.release_dates.find((release) => release.certification !== "");

            setMovieCertification(certifiedRelease.certification ? certifiedRelease.certification : "");
        } catch (error) {
            setMovieCertification("");
        }
    }

    function findMovieTrailer(trailers) {
        try {
            const trailer = trailers.find((video) => video.type === "Trailer" && video.site === "YouTube");

            setMovieTrailer(trailer.key ? "https://www.youtube.com/watch?v=" + trailer.key : "");
        } catch (error) {
            setMovieTrailer("");
        }
    }

    // RETURN - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    return (
        <div className={`popup-container ${isSmallScreen ? "small-screen" : ""}`} id="popup-container">
            <div className="popup light-bg">
                <header>
                    <div className={"header-container"}>
                        <button onClick={onTryAgain}>
                            {canTryAgain ?
                                <><i className="fas fa-undo-alt left-side-icon"></i>
                                    <span>Find another movie!</span></>
                                : ""}
                        </button>
                        <button onClick={onClosePopup}>
                            <i className="fas fa-times icon"></i>
                        </button>
                    </div>
                </header>
                <div className="flex-container">
                    <aside>
                        {/*POSTER*/}
                        <div className={"popup-poster-banner"}>
                            <div className="popup-banner">
                                <img
                                    src={global.config.API.IMAGE_URL +
                                        global.config.API.IMAGE_WIDTH.BANNER +
                                        movieDetails.backdrop_path}
                                    alt="Poster">
                                </img>
                                <div className={"popup-banner-overlay"}></div>
                            </div>
                            <img
                                src={global.config.API.IMAGE_URL + global.config.API.IMAGE_WIDTH.MEDIUM_POSTER +
                                    movieDetails.poster_path}
                                alt="Poster"
                                className="poster">
                            </img>
                        </div>
                        {/*WATCH PROVIDER*/}
                        {/*<h4 className="separator">Available on</h4>*/}
                        {/*TRAILER*/}
                        {movieTrailer ?
                            <h4 className="separator pre-separator"><a href={movieTrailer}>
                                <i className="fas fa-link left-side-icon"></i> Watch Trailer</a>
                            </h4> : ""}
                    </aside>
                    <div className="popup-text">
                        <hgroup className="green-separator">
                            {/*TITLE*/}
                            <h1>
                                {movieDetails.title}
                            </h1>
                            {/*RELEASE DATE, , GENRES, RUNTIME*/}
                            <p>
                                {movieDetails.release_date ? movieDetails.release_date.split('-')[0] + " • " : ""}
                                {movieCertification ? movieCertification + " • " : ""}
                                {movieDetails.genres ?
                                    movieDetails.genres.map((genre, i) => i + 1 === movieDetails.genres.length ?
                                        genre.name + " • " : genre.name + ", ") : ""}
                                {calculateRuntime(movieDetails.runtime)}
                            </p>
                        </hgroup>
                        <div className="separator">
                            <div className="tagline-score">
                                {/*TAGLINE*/}
                                {movieDetails.tagline ? <h4>{movieDetails.tagline}</h4> : ""}
                                {/*USER SCORE*/}
                                <h4>User Score:
                                    {" "}
                                    <span className="green-txt"
                                          id="popup-score">{Math.round(movieDetails.vote_average * 10)}%</span>
                                    {/*<Score percentage={Math.round(movieDetails.vote_average * 10)}></Score>*/}
                                </h4>
                            </div>
                            <p>
                                {/*OVERVIEW*/}
                                {!isSmallScreen && String(movieDetails.overview).length > 400 ?
                                    movieDetails.overview.slice(0, 400) + ". . ." :
                                    movieDetails.overview}

                            </p>
                        </div>
                        {/*PEOPLE*/}
                        <div className="people">
                            <CrewList crew={movieCredits.crew} maxJobs={4}></CrewList>
                            <CastList cast={movieCredits.cast} maxCast={6}></CastList>
                        </div>
                    </div>
                </div>

            </div>
            <div className="popup-bg-overlay"></div>
        </div>
    )
}





