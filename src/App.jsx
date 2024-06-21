import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { useSelector } from "react-redux";
import FullNewsModal from "./components/FullNewsModal";
import Favourites from "./components/Favourites";
import Header from "./components/Header";

function App() {
  //get detailed news from redux store to show in modal
  const { fullNews } = useSelector((state) => state.newsReducer);
  return (
    <>
      <div className={`${fullNews ? "blur-sm" : ""}`}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/:page" element={<Home />} />
        </Routes>
      </div>
      <div className="absolute top-48 left-5 md:top-16 md:left-52 mx-auto">
        {fullNews && <FullNewsModal news={fullNews} />}
      </div>
    </>
  );
}

export default App;
