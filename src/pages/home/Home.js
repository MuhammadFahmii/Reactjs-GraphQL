import { useEffect } from "react";
import { parseCookies } from "nookies";
import { useDispatch } from "react-redux";
import GetFavouriteMovie from "../../hooks/GetFavouriteMovie";
import Hero from "./Hero";
import NowPlaying from "./NowPlaying";
import PopularMovie from "./PopularMovie";
import { myFavouriteMovie } from "../../stores/MovieSlices";

export default function Home() {
  const { id_user } = parseCookies();
  const dispatch = useDispatch();
  const { getFavouriteMovieData, getFavouriteMovieLoading } =
    GetFavouriteMovie(id_user);
  useEffect(() => {
    const idFavouriteMovieData = [];
    getFavouriteMovieData?.map((e) => idFavouriteMovieData.push(e.id_movie));
    dispatch(myFavouriteMovie(idFavouriteMovieData));
  }, [getFavouriteMovieData, id_user, dispatch]);
  if (getFavouriteMovieLoading) return <h1>Harap tunggu</h1>;
  return (
    <>
      <Hero />
      <PopularMovie />
      <NowPlaying />
    </>
  );
}
