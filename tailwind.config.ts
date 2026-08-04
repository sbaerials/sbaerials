import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
    },
    extend: {
      colors: {
        // shadcn/ui semantic tokens (CSS variables defined in src/index.css)
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        // SB Aerials brand palette
        void: "#060911",
        panel: "#0C1220",
        panel2: "#121A2C",
        brand: {
          blue: "#2F7FFF",
          light: "#7EB2FF",
        },
        cloud: "#F1F5F9",
        steel: "#8C97AC",
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      backgroundImage: {
        // signature ascent gradient used behind the whole page
        "brand-gradient":
          "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(47,127,255,0.20), transparent 60%), radial-gradient(ellipse 60% 40% at 100% 0%, rgba(126,178,255,0.12), transparent 60%), linear-gradient(180deg, #060911 0%, #0A0F1C 40%, #0C1220 75%, #060911 100%)",
        "hero-scrim":
          "linear-gradient(180deg, rgba(6,9,17,0.75) 0%, rgba(6,9,17,0.35) 35%, rgba(6,9,17,0.55) 70%, rgba(6,9,17,0.96) 100%)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
