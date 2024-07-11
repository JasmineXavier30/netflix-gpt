export const BG_IMG = "https://assets.nflxext.com/ffe/siteui/vlv3/fc164b4b-f085-44ee-bb7f-ec7df8539eff/d23a1608-7d90-4da1-93d6-bae2fe60a69b/IN-en-20230814-popsignuptwoweeks-perspective_alpha_website_large.jpg";

export const USER_PHOTO = "https://avatars.githubusercontent.com/u/80594667?v=4";

export const NETFLIX_LOGO = "https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png";

export const TMDB_API_OPTIONS = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.REACT_APP_TMDB_KEY}`
    }
}
export const TMDB_IMG_CDN_URL = "https://image.tmdb.org/t/p/w500/";

export const TMDB_POPULAR_MOVIES_URL = "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";

export const TMDB_NOWPLAYING_MOVIES_URL = "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1";

export const TMDB_TOPRATED_MOVIES_URL = "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1";

export const TMDB_UPCOMING_MOVIES_URL = "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1";

export const SUPPORTED_LANGS = [{ id: "en", name: "English" }, { id: "hi", name: "Hindi" }, { id: "es", name: "Spanish" }];

export const OPENAI_KEY = process.env.REACT_APP_OPENAI_KEY;