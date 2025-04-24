import MovieItem from "@/components/movie-item";
import style from "./page.module.css";
import { MovieData } from "@/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "한입 씨네마",
  description: "한입 씨네마에 등록된 영화를 만나보세요",
  openGraph: {
    title: "한입 씨네마",
    description: "한입 씨네마에 등록된 영화를 만나보세요",
    images: ["./thumbnail.png"],
  },
};

async function RecoMovies() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie/random`,
    { next: { revalidate: 60 } }
  );
  if (!response.ok) {
    return <div>오류가 발생했습니다...</div>;
  }
  const movies: MovieData[] = await response.json();

  return (
    <div>
      {movies.slice(0, 3).map((movie) => (
        <MovieItem key={movie.id} {...movie} />
      ))}
    </div>
  );
}

async function AllMovies() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie`,
    { cache: "force-cache" }
  );
  if (!response.ok) {
    return <div>오류가 발생했습니다...</div>;
  }
  const movies: MovieData[] = await response.json();
  return (
    <div>
      {movies.map((movie) => (
        <MovieItem key={movie.id} {...movie} />
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <>
      <div className={style.container}>
        <section className={style.recommend_section}>
          <h3>지금 가장 추천하는 영화</h3>
          <RecoMovies />
        </section>
        <section className={style.all_section}>
          <h3>등록된 모든 영화</h3>
          <AllMovies />
        </section>
      </div>
    </>
  );
}
