import MovieItem from "@/components/movie-item";
import style from "./page.module.css";
import movies from "@/dummy.json";
import { MovieData } from "@/types";
import MovieListSkeleton from "@/components/skeleton/movie-list-skeleton";
import { delay } from "@/utils/delay";
import { Suspense } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "한입 쎄네마",
  description: "한입 씨네마에 등록된 영화를 만나보세요",
  openGraph: {
    title: "한입 씨네마",
    description: "한입 씨네마에 등록된 영화를 만나보세요",
    images: ["./thumbnail.png"],
  },
};

async function RecoMovies() {
  await delay(3000);

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
  await delay(1500);

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
          <Suspense fallback={<MovieListSkeleton count={3} />}>
            <RecoMovies />
          </Suspense>
        </section>
        <section className={style.all_section}>
          <h3>등록된 모든 영화</h3>

          <Suspense fallback={<MovieListSkeleton count={10} />}>
            <AllMovies />
          </Suspense>
        </section>
      </div>
    </>
  );
}
