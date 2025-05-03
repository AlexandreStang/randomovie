import Tabs from "../Tabs";
import React, {useEffect, useState} from "react";
import TrendingMovie from "./TrendingMovie";
import {getTrendingMovies} from "../../api/actions";

const timeWindows = [
    {value: global.config.API.TIME_WINDOW.DAY, label: "Today"},
    {value: global.config.API.TIME_WINDOW.WEEK, label: "This week"}
]

const maxMovies = 12

export default function Trending({onSelectMovie}) {

    // STATES - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    const [timeWindow, setTimeWindow] = useState([timeWindows[0].value]);
    const [trendingMovies, setTrendingMovies] = useState([]);

    // FUNCTIONS - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    useEffect(() => {
        getTrendingMovies(timeWindow).then(data => setTrendingMovies(data));
    }, [timeWindow])

    // RETURN - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    return (
        <section className="trending light-bg">
            <div className="wrapper">
                <hgroup className="separator">
                    <h1>Want some options right away?</h1>
                    <p>Check out what movies are trending at the moment!</p>
                </hgroup>
                <Tabs categories={timeWindows}
                      onSelectCategory={(timeWindow) => setTimeWindow(timeWindow)}></Tabs>
                <div className="movie-grid">
                    {trendingMovies.slice(0, maxMovies).map((movie) => (
                        <TrendingMovie
                            movie={movie}
                            onClickMovie={(movieID) => onSelectMovie(movieID)}
                            key={movie.id}></TrendingMovie>))}
                </div>
            </div>
        </section>
    )
}

