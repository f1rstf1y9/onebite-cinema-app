"use client";

import { useActionState, useEffect, useRef } from "react";
import style from "./review-item-delete-button.module.css";
import { deleteReviewAction } from "@/actions/delete-review.action";
export default function ReviewItemDeleteButton({
  reviewId,
  movieId,
}: {
  reviewId: number;
  movieId: number;
}) {
  const formRef = useRef<HTMLFormElement>(null);

  const [state, formAction, isPending] = useActionState(
    deleteReviewAction,
    null
  );

  useEffect(() => {
    if (state && !state.status) {
      alert(state.error);
    }
  }, [state]);

  return (
    <form action={formAction} ref={formRef}>
      <input name="reviewId" value={reviewId} hidden readOnly />
      <input name="movieId" value={movieId} hidden readOnly />
      {isPending ? (
        <div>...</div>
      ) : (
        <div
          className={style.delete_btn}
          onClick={() => formRef.current?.requestSubmit()}
        >
          🗑️리뷰 삭제하기
        </div>
      )}
    </form>
  );
}
