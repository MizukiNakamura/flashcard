import "./globals.css";
import { type ReactNode } from "react";
import { type NextPage, type Metadata } from "next";

export const metadata: Metadata = {
  title: "flashcard",
};

type Props = { children: ReactNode };

const RootLayout: NextPage<Props> = ({ children }) => {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
