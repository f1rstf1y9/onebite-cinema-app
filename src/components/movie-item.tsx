import { MovieData } from "@/types";
import Link from "next/link";
import style from "./movie-item.module.css";
import Image from "next/image";

export default function MovieItem({ id, title, posterImgUrl }: MovieData) {
  return (
    <Link className={style.container} href={`/movie/${id}`}>
      <Image
        src={posterImgUrl}
        width={246}
        height={342}
        alt={`영화 ${title} 포스터`}
      />
    </Link>
  );
}
