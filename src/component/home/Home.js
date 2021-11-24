import { useEffect, useState } from "react";
import Hero from "../hero/Hero";
import PopularMovie from "../popular-movie/PopularMovie";
export default function Home() {
  const [topTrending, setTopTrending] = useState();
  useEffect(() => {
    const API_KEY = "bb3fb3b2c47fd1ac46c54121cec5a620";
    const url = `https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}`;
    const getTopTrending = async () => {
      const responseTop = await fetch(url);
      const { results } = await responseTop.json();
      const id = results[0].id;
      const detailMovie = `https://api.themoviedb.org/3/movie/${id}?api_key=bb3fb3b2c47fd1ac46c54121cec5a620&language=en-US`;
      const responseDetail = await fetch(detailMovie);
      const res = await responseDetail.json();
      setTopTrending(res);
    };
    getTopTrending();
  }, []);
  return (
    <>
      <Hero topTrending={topTrending} />
      <PopularMovie />
    </>
  );
}
