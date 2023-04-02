import Content from "./index.mdx";
import type { Metadata } from "next/types";

export default function Page() {
  return (
    <div className="container readable-container">
      <Content />
    </div>
  );
}

export const metadata: Metadata = {
  title: "Community Guidelines",
};
