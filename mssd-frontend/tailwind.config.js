/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      "colors": {
        // Strategic Growth System Colors
        "primary": {
          DEFAULT: "#0067b1",
          dark: "#004f89",
          darker: "#003d6b",
          darkest: "#002b4d",
          light: "#3388c7",
          lighter: "#66a9dd",
          lightest: "#99caf3",
          container: "#d2e4ff",
        },
        "secondary": {
          DEFAULT: "#e30613",
          dark: "#bc000c",
          darker: "#930007",
          darkest: "#6a0005",
          light: "#e9394f",
          lighter: "#ef6c7b",
          lightest: "#f59fa7",
          container: "#ffdad5",
        },
        "tertiary": {
          DEFAULT: "#f2f7fa",
          dark: "#dee3e6",
          darker: "#c2c7ca",
          darkest: "#606568",
          light: "#f5f9fb",
          lighter: "#f8fbfc",
          lightest: "#fbfcfd",
          container: "#dee3e6",
        },
        "neutral": {
          DEFAULT: "#1a1c1e",
          dark: "#0d0e0f",
          darker: "#000000",
          light: "#474a4c",
          lighter: "#747779",
          lightest: "#a1a4a6",
          container: "#414751",
        },
        "surface": {
          DEFAULT: "#f9f9fc",
          dim: "#dadadc",
          bright: "#f9f9fc",
          "container-lowest": "#ffffff",
          "container-low": "#f3f3f6",
          container: "#eeeef0",
          "container-high": "#e8e8ea",
          "container-highest": "#e2e2e5",
        },
        "on-surface": {
          DEFAULT: "#1a1c1e",
          variant: "#414751",
        },
        "outline": {
          DEFAULT: "#717782",
          variant: "#c1c7d3",
        },
        "error": {
          DEFAULT: "#ba1a1a",
          container: "#ffdad6",
        },
        "on-primary": "#ffffff",
        "on-secondary": "#ffffff",
        "on-error": "#ffffff",
        "on-background": "#1a1c1e",
        "background": "#f9f9fc",
        "inverse-surface": "#2f3133",
        "inverse-on-surface": "#f0f0f3",
      },
      "borderRadius": {
        "sm": "0.125rem",
        "DEFAULT": "0.25rem",
        "md": "0.375rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "2xl": "1rem",
        "3xl": "1.5rem",
        "full": "9999px"
      },
      "fontFamily": {
        "sans": ["Hanken Grotesk", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
        "headline": ["Hanken Grotesk", "sans-serif"],
        "body": ["Hanken Grotesk", "sans-serif"],
        "label": ["Hanken Grotesk", "sans-serif"]
      },
      "boxShadow": {
        "sm": "0px 2px 8px rgba(26, 28, 30, 0.04)",
        "DEFAULT": "0px 4px 16px rgba(26, 28, 30, 0.08)",
        "md": "0px 4px 16px rgba(26, 28, 30, 0.08)",
        "lg": "0px 12px 32px rgba(26, 28, 30, 0.12)",
        "xl": "0px 24px 48px rgba(26, 28, 30, 0.16)",
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries')
  ],
}
