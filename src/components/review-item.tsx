import { ReviewData } from "@/types";
import style from "./movie-item.module.css";

export default function ReviewItem({
  id,
  content,
  author,
  createdAt,
  movieId,
}: ReviewData) {
  return (
    <div>
      <div>
        <div>{author}</div>
        <div>{new Date(createdAt).toLocaleDateString()}일 작성됨</div>
      </div>
      <div>{content}</div>
      <div>🗑️리뷰 삭제하기</div>
    </div>
  );
}
