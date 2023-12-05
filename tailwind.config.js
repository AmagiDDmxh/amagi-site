const colors = require("tailwindcss/colors")

const makePrimaryColor =
  (l) =>
  ({ opacityValue }) => {
    return (
      `hsl(var(--nextra-primary-hue) var(--nextra-primary-saturation) ${l}%` +
      (opacityValue ? ` / ${opacityValue})` : ")")
    )
  }

/** @type {import('tailwindcss').Config} */
const docsConfig = {
  content: [
    "./components/**/*.tsx",
    "./app/**/*.tsx",
    "./pages/**/*.tsx",
    "./theme.config.jsx"
  ],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    fontSize: {
      xs: ".75rem",
      sm: ".875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "4rem",
    },
    letterSpacing: {
      tight: "-0.015em",
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: "#000",
      white: "#fff",
      gray: colors.gray,
      slate: colors.slate,
      neutral: colors.neutral,
      red: colors.red,
      orange: colors.orange,
      blue: colors.blue,
      yellow: colors.yellow,
      primary: {
        50: makePrimaryColor(97),
        100: makePrimaryColor(94),
        200: makePrimaryColor(86),
        300: makePrimaryColor(77),
        400: makePrimaryColor(66),
        500: makePrimaryColor(50),
        600: makePrimaryColor(45),
        700: makePrimaryColor(39),
        750: makePrimaryColor(35),
        800: makePrimaryColor(32),
        900: makePrimaryColor(24),
      },
    },
    extend: {
      colors: {
        dark: "#111",
      },
    },
  },
  darkMode: ["class", 'html[class~="dark"]'],
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: docsConfig.prefix,
  content: docsConfig.content,
  theme: {
    colors: {
      ...docsConfig.theme.colors,
      primary: colors.blue,
    },
    extend: {
      colors: docsConfig.theme.extend.colors,
      typography: (theme) => ({
        dark: {
          css: {
            color: theme("colors.gray[300]"),
            '[class~="lead"]': { color: theme("colors.gray[400]") },
            a: { color: theme("colors.gray[100]") },
            strong: { color: theme("colors.gray[100]") },
            "ul > li::before": { backgroundColor: theme("colors.gray[700]") },
            hr: { borderColor: theme("colors.gray[800]") },
            blockquote: {
              color: theme("colors.gray[100]"),
              borderLeftColor: theme("colors.gray[800]"),
            },
            h1: { color: theme("colors.gray[100]") },
            h2: { color: theme("colors.gray[100]") },
            h3: { color: theme("colors.gray[100]") },
            h4: { color: theme("colors.gray[100]") },
            code: { color: theme("colors.gray[100]") },
            "a code": { color: theme("colors.gray[100]") },
            pre: {
              color: theme("colors.gray[200]"),
              backgroundColor: theme("colors.gray[800]"),
            },
            thead: {
              color: theme("colors.gray[100]"),
              borderBottomColor: theme("colors.gray[700]"),
            },
            "tbody tr": { borderBottomColor: theme("colors.gray[800]") },
          },
        },
      }),
    },
  },
  variants: {
    extend: {
      typography: ["dark"],
    },
  },
  plugins: [require("@tailwindcss/typography")],
  darkMode: docsConfig.darkMode,
}
