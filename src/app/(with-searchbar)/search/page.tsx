import MovieListSkeleton from "@/components/skeleton/movie-list-skeleton";
import style from "./page.module.css";
import MovieItem from "@/components/movie-item";
import { MovieData } from "@/types";
import { delay } from "@/utils/delay";
import { Suspense } from "react";

async function SearchResult({ q }: { q: string }) {
  await delay(1500);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie/search?q=${q}`,
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

export default async function page({
  searchParams,
}: {
  searchParams: Promise<{ q: string }>;
}) {
  const { q } = await searchParams;

  return (
    <div className={style.container}>
      <Suspense key={q || ""} fallback={<MovieListSkeleton count={3} />}>
        <SearchResult q={q || ""} />
      </Suspense>
    </div>
  );
}
