import MovieItem from "@/app/components/movie-item";
import style from "./page.module.css";
import movies from "@/dummy.json";

export default function Home() {
  return (
    <>
      <div className={style.container}>
        <section className={style.recommend_section}>
          <h3>지금 가장 추천하는 영화</h3>
          <div>
            {movies.slice(0, 3).map((movie) => (
              <MovieItem key={movie.id} {...movie} />
            ))}
          </div>
        </section>
        <section className={style.all_section}>
          <h3>등록된 모든 영화</h3>
          <div>
            {movies.map((movie) => (
              <MovieItem key={movie.id} {...movie} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
