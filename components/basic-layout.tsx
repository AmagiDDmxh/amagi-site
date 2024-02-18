import Head from "next/head";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { useBlogContext } from "./blog-context";
import { HeadingContext } from "./mdx-theme";
// import { Quote as QuoteType } from "@/types/quote"

// const trimAllContentIf = (obj: QuoteType): QuoteType => {
//   if (!obj.content) {
//     return obj
//   }

//   const keys = Object.keys(obj) as (keyof QuoteType)[]
//   return keys.reduce(
//     (table, cur) => ({ ...table, [cur]: obj[cur]?.trim?.() }),
//     {} as QuoteType,
//   )
// }

// const normalizeOrigin = ({ book, author }: Partial<QuoteType>) => {
//   const comma = book ? "," : ""
//   const space = book?.startsWith("《") ? "" : " "
//   const origin = (book ? `${author}${comma}${space}${book}` : author) ?? ""
//   if (origin.length > 45) {
//     const [theAuthor, theBook] = origin.split(",")
//     return (
//       <div className="p-4">
//         {theAuthor}
//         <br />
//         {theBook}
//       </div>
//     )
//   }
//   return origin
// }

// const Quote = (props: QuoteType) => {
//   const { content, author, reference, book } = trimAllContentIf(props)
//   const origin = normalizeOrigin({ book, author })

//   if (!content) {
//     return
//   }

//   return (
//     <li className="flex flex-col border-b !mb-6">
//       <p className="p-0">“{content}“</p>
//       {reference && (
//         <p style={{ paddingLeft: "5rem", color: "#414558" }}>——{reference}</p>
//       )}
//       <p style={{ paddingLeft: "5rem" }}>——{origin}</p>
//     </li>
//   )
// }

export const BasicLayout = ({ children }: { children: ReactNode }) => {
  const { config, opts } = useBlogContext();
  const title = `${opts.title}${config.titleSuffix || ""}`;
  const ref = useRef<HTMLHeadingElement>(null);
  // const [quote, setQuote] = useState<QuoteType>()

  // useEffect(() => {
  //   ;(async () => {
  //     const quote = await fetch(`/api/quote`, {
  //       cache: "no-store",
  //     }).then<QuoteType>((x) => x.json())
  //     setQuote(quote)
  //   })()
  // }, [])

  return (
    <article
      className="container prose prose-sm md:prose dark:prose-dark"
      dir="ltr"
    >
      <Head>
        <title>{title}</title>
        {config.head?.({ title, meta: opts.frontMatter })}
      </Head>

      <HeadingContext.Provider value={ref}>
        {opts.hasJsxInH1 ? <h1 ref={ref} /> : null}
        {opts.hasJsxInH1 ? null : <h2>{opts.title}</h2>}
        {/* <Quote {...quote} /> */}

        {children}

        <hr />
        <p>
          最近在看：《禅与摩托车维修艺术》、《善的脆弱性》、《爱的多重奏》
        </p>
        <div className="flex justify-between items-start mt-32">
          {config.footer}
        </div>
      </HeadingContext.Provider>
    </article>
  );
};
