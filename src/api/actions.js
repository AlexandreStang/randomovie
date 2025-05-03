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