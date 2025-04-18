import { MovieData } from "@/types";
import style from "./page.module.css";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie/`,
    { cache: "force-cache" }
  );
  if (!response.ok) {
    return [];
  }
  const movies: MovieData[] = await response.json();

  return movies.map((movie) => {
    return { id: String(movie.id) };
  });
}

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie/${id}`,
    { cache: "force-cache" }
  );
  if (!response.ok) {
    if (response.status === 404) {
      notFound();
    }
    return <div>오류가 발생했습니다...</div>;
  }

  const {
    title,
    subTitle,
    description,
    releaseDate,
    company,
    genres,
    runtime,
    posterImgUrl,
  } = await response.json();

  return (
    <>
      <div className={style.container}>
        <div
          className={style.cover_img_container}
          style={{ backgroundImage: `url('${posterImgUrl}')` }}
        >
          <img src={posterImgUrl} />
        </div>
        <div className={style.title}>{title}</div>
        <div className={style.detailInfo}>
          {releaseDate} / {genres.join(", ")} / {runtime}
        </div>
        <div className={style.company}>{company}</div>
        <div className={style.subTitle}>{subTitle}</div>
        <div className={style.description}>{description}</div>
      </div>
    </>
  );
}
