import { useEffect, useState } from "react";
import Hero from "./Hero";
import PopularMovie from "./PopularMovie";
export default function Home() {
  const [topTrending, setTopTrending] = useState();
  useEffect(() => {
    const url = `https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.REACT_APP_API_KEY}`;
    const getTopTrending = async () => {
      const responseTop = await fetch(url);
      const { results } = await responseTop.json();
      const id = results[0].id;
      const detailMovie = `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}`;
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
