import type { Config } from "tailwindcss";

/**
 * Tokens espelhados de DeskcommCRM/app/globals.css.
 * A LP e o produto compartilham a identidade — divergir aqui faria a página
 * prometer um visual que o produto não entrega.
 */
export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#faf9f6",
        surface: "#ffffff",
        "surface-elevated": "#f5f3ee",
        text: "#1c1a16",
        "text-muted": "#5d594f",
        border: "#e7e3da",
        accent: {
          50: "#f3f6f1", 100: "#e4ebe0", 200: "#c8d6c1", 300: "#a4ba9a",
          400: "#82a077", 500: "#67885d", 600: "#506d48", 700: "#41573b",
          800: "#374731", 900: "#2f3c2b", 950: "#171f15",
        },
        warn: "#b8863b",
      },
      fontFamily: {
        sans: ["var(--font-atkinson)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      boxShadow: {
        // Nunca preto puro: contra fundo warm gera halo cinza (anti-pattern 15).
        sm: "0 1px 2px rgba(20,18,14,0.06)",
        md: "0 4px 12px rgba(20,18,14,0.08)",
        lg: "0 12px 32px rgba(20,18,14,0.10)",
      },
      transitionTimingFunction: {
        "out-fast": "cubic-bezier(0.2, 0, 0, 1)",
        base: "cubic-bezier(0.25, 0.1, 0.25, 1)",
        "out-slow": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
} satisfies Config;
