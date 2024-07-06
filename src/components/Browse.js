import Header from "./Header";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies.js";
import MainContainer from "./MainContainer.js";
import SecondaryContainer from "./SecondaryContainer.js";
import usePopularMovies from "../hooks/usePopularMovies.js";
import GPTSearchPage from "./GPTSearchPage.js";
import { useSelector } from "react-redux";

const Browse = () => {
    const showGPTSearch = useSelector(store => store.gptReducer.showGPTSearch)
    useNowPlayingMovies();
    usePopularMovies();
    return (
        <div>
            <Header />
            {
                showGPTSearch ?
                    <GPTSearchPage /> :
                    <>
                        <MainContainer />
                        <SecondaryContainer />
                    </>
            }
        </div>
    )
}
export default Browse;