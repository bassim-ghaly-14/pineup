"use client";

import Link from "next/link";

type Props = {
  text: string;
};

export function LinkifyText({ text }: Props) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;

  const parts = text.split(urlRegex);

  return (
    <>
      {parts.map((part, index) =>
        urlRegex.test(part) ? (
          <Link
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
style={{
  color: "inherit",
  fontWeight: 600,
  textDecoration: "none",
  position: "relative",
  transition: "all .2s ease",
  background:
    "linear-gradient(90deg, #D4A63A, #E7C46A, #B88922)",
  backgroundSize: "100% 2px",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "0 100%",

  paddingBottom: "2px",
}}
          >
            {part}
          </Link>
        ) : (
          part
        )
      )}
    </>
  );
}