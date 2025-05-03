import {sortData} from "../libs/utils";

export const getLanguages = async () => {
    const response = await fetch(
        global.config.API.URL + "configuration/languages" + global.config.API.KEY + "&language=" + global.config.LANGUAGE
    );
    const data = await response.json();
    return sortData(data.filter((lang) => lang.name !== ""), "english_name");
}

export const getGenres = async () => {
    const response = await fetch(
        global.config.API.URL + "genre/movie/list" + global.config.API.KEY + "&language=" + global.config.LANGUAGE
    );
    const data = await response.json();
    return data.genres;
}

export const getCountries = async () => {
    const response = await fetch(
        global.config.API.URL + "watch/providers/regions" + global.config.API.KEY + "&language=" + global.config.LANGUAGE
    );
    const data = await response.json();
    return sortData(data.results, "english_name");
}

export const getProviders = async (country) => {
    const response = await fetch(global.config.API.URL + "watch/providers/movie" + global.config.API.KEY +
        "&language=" + global.config.LANGUAGE + "&watch_region=" + country);
    const data = await response.json();

    return data.results;
}

export const getBanner = async () => {
    const response = await fetch(global.config.API.URL +
        "trending/movie/" +
        global.config.API.TIME_WINDOW.WEEK + global.config.API.KEY);
    const data = await response.json();

    const rand = Math.floor(Math.random() * data.results.length);

    return data.results[rand].backdrop_path;
}

export const getTrendingMovies = async (timeWindow) => {
    const response = await fetch(global.config.API.URL + "trending/movie/" + timeWindow +
        global.config.API.KEY + "&language=" + global.config.LANGUAGE);
    const data = await response.json();

    return data.results;
}

export const getMovieDetails = async (movieID) => {
    const response = await fetch(global.config.API.URL + "movie/" + movieID +
        global.config.API.KEY + "&language=" + global.config.LANGUAGE)
    const data = await response.json();

    // console.log("MovieDetails", data)

    return data;
}

export const getMovieCredits = async (movieID) => {
    const response = await fetch(global.config.API.URL + "movie/" + movieID + "/credits" +
        global.config.API.KEY + "&language=" + global.config.LANGUAGE)
    const data = await response.json();

    // console.log("MovieCredits", data)

    return data;
}

export const getMovieReleaseDates = async (movieID) => {
    const response = await fetch(global.config.API.URL + "movie/" + movieID + "/release_dates" +
        global.config.API.KEY + "&language=" + global.config.LANGUAGE)
    const data = await response.json();

    // console.log("MovieReleaseDate", data)

    return data.results;
}

export const getMovieTrailers = async (movieID) => {
    const response = await fetch(global.config.API.URL + "movie/" + movieID + "/videos" +
        global.config.API.KEY)
    const data = await response.json();

    // console.log("MovieTrailer", data)

    return data.results
}