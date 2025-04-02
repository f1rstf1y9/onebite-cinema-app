import { ReactNode } from "react";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <div>Searchbar Layout</div>
      {children}
    </div>
  );
}
