"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import style from "./searchbar.module.css";

export default function Searchbar() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q");
  const router = useRouter();
  const [search, setSearch] = useState(q || "");

  useEffect(() => {
    setSearch(q || "");
  }, [q]);

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onSubmit = () => {
    if (search.trim() && q !== search) {
      router.push(`/search?q=${search}`);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSubmit();
    }
  };

  return (
    <div className={style.searchbar_container}>
      <input
        value={search}
        onChange={onChangeSearch}
        onKeyDown={onKeyDown}
        placeholder="검색어를 입력하세요 ..."
      />
      <button onClick={onSubmit}>검색</button>
    </div>
  );
}
