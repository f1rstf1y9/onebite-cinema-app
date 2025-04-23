import style from "./review-editor.module.css";
import { createReviewAction } from "@/actions/create-review.action";

export default function ReviewEditor({ movieId }: { movieId: string }) {
  return (
    <section>
      <form action={createReviewAction} className={style.form_container}>
        <input type="text" name="movieId" value={movieId} hidden readOnly />
        <textarea name="content" placeholder="리뷰 내용" />
        <div className={style.submit_container}>
          <input type="text" name="author" placeholder="작성자" />
          <button>작성하기</button>
        </div>
      </form>
    </section>
  );
}
