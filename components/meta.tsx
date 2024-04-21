import Link from "next/link";
import type { ReactElement } from "react";
import { split } from "@/lib/get-tags";
import { getParent } from "@/lib/parent";
import { useBlogContext } from "./blog-context";
import ThemeSwitch from "./theme-switch";

export default function Meta(): ReactElement {
  const { opts, config } = useBlogContext();
  const { author, date, tag } = opts.frontMatter;
  const { back } = getParent({ opts, config });
  const tags = tag ? split(tag) : [];

  const tagsEl = tags.map((t) => (
    <Link key={t} href="/tags/[tag]" as={`/tags/${t}`} passHref legacyBehavior>
      <a
        className="
          select-none
          rounded-md
          bg-gray-200
          px-1
          text-sm
          text-gray-400
          transition-colors
          hover:bg-gray-300
          hover:text-gray-500
          dark:bg-gray-600
          dark:text-gray-300
          dark:hover:bg-gray-700
          dark:hover:text-gray-200
          !no-underline
        "
      >
        {t}
      </a>
    </Link>
  ));

  const readingTime = opts.readingTime?.text;
  const dateObj = date ? new Date(date) : null;
  return (
    <div
      className={
        "mb-8 flex gap-3 " + (readingTime ? "items-start" : "items-center")
      }
    >
      <div className="grow dark:text-gray-400 text-gray-600 meta">
        <div className="not-prose flex flex-wrap items-center gap-1">
          {author}
          {author && date && ","}
          {dateObj && (
            <time dateTime={dateObj.toISOString()}>
              {config.dateFormatter?.(dateObj) || dateObj.toDateString()}
            </time>
          )}
          {(author || date) && (readingTime || tags.length > 0) && (
            <span className="px-1">•</span>
          )}
          {readingTime || tagsEl}
        </div>
        {readingTime && (
          <div className="not-prose mt-1 flex flex-wrap items-center gap-1">
            {tagsEl}
          </div>
        )}
      </div>
      <div className="flex items-center gap-2 print:hidden">
        {back && (
          <Link href={back} passHref legacyBehavior>
            <a>Back</a>
          </Link>
        )}
        {config.darkMode && <ThemeSwitch />}
      </div>
    </div>
  );
}
