const themConfig = {
  footer: (
    <small className="block">
      <abbr
        title="This site and all its content are licensed under a Creative Commons Attribution-NonCommercial 4.0 International License."
        className="cursor-help"
      >
        CC BY-NC 4.0
      </abbr>
      <time className="ml-1">2023</time> © Amagi.
    </small>
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
  darkMode: false,
}

export default themConfig
