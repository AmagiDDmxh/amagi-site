const themConfig = {
  footer: (
    <div className="w-full">
      <hr />
      <div className="flex gap-1">
        <a target="_blank" href="https://twitter.com/AmagiDDmxh">
          Twitter
        </a>
        ·
        <a target="_blank" href="https://github.com/AmagiDDmxh">
          GitHub
        </a>
        ·
        <a target="_blank" href="https://www.instagram.com/amagiddmxh">
          Instagram
        </a>
        ·
        <a target="_blank" href="mailto:amagiddmxh@gmail.com">
          AmagiDDmxh@gmail.com
        </a>
      </div>

      {/* <p>
        最近在看：&lsquo;on writing well&rsquo; 和 &lsquo;writing to
        learn&rsquo;
      </p> */}
      <small className="block">
        <abbr
          title="This site and all its content are licensed under a Creative Commons Attribution-NonCommercial 4.0 International License."
          className="cursor-help"
        >
          CC BY-NC 4.0
        </abbr>
        <time className="ml-1">2023</time> © Amagi. ᕕ( ᐛ )ᕗ
      </small>
    </div>
  ),
  head: ({ meta }) => (
    <>
      {meta.description && (
        <meta name="description" content={meta.description} />
      )}
      {meta.tag && <meta name="keywords" content={meta.tag} />}
      {meta.author && <meta name="author" content={meta.author} />}
    </>
  ),
  readMore: "Read More →",
  postFooter: null,
  darkMode: true,
};

export default themConfig;
