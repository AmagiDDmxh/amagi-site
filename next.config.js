const withNextra = require("nextra")({
  theme: "./components/theme.tsx",
  themeConfig: "./theme.config.jsx",
})

module.exports = withNextra()

// If you have other Next.js configurations, you can pass them as the parameter:
// module.exports = withNextra({ /* other next.js config */ })
