/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "var(--color-border)", /* Holographic silver with opacity */
        input: "var(--color-input)", /* Elevated dark surface */
        ring: "var(--color-ring)", /* Electric cyan */
        background: "var(--color-background)", /* Deep space black */
        foreground: "var(--color-foreground)", /* Pure white */
        primary: {
          DEFAULT: "var(--color-primary)", /* Electric cyan */
          foreground: "var(--color-primary-foreground)", /* Deep space black */
        },
        secondary: {
          DEFAULT: "var(--color-secondary)", /* Sophisticated purple */
          foreground: "var(--color-secondary-foreground)", /* Pure white */
        },
        destructive: {
          DEFAULT: "var(--color-destructive)", /* Vibrant red */
          foreground: "var(--color-destructive-foreground)", /* Pure white */
        },
        muted: {
          DEFAULT: "var(--color-muted)", /* Elevated dark surface */
          foreground: "var(--color-muted-foreground)", /* Holographic silver */
        },
        accent: {
          DEFAULT: "var(--color-accent)", /* Cyber green */
          foreground: "var(--color-accent-foreground)", /* Deep space black */
        },
        popover: {
          DEFAULT: "var(--color-popover)", /* Elevated dark surface */
          foreground: "var(--color-popover-foreground)", /* Pure white */
        },
        card: {
          DEFAULT: "var(--color-card)", /* Elevated dark surface */
          foreground: "var(--color-card-foreground)", /* Pure white */
        },
        success: {
          DEFAULT: "var(--color-success)", /* Cyber green */
          foreground: "var(--color-success-foreground)", /* Deep space black */
        },
        warning: {
          DEFAULT: "var(--color-warning)", /* Warm amber */
          foreground: "var(--color-warning-foreground)", /* Deep space black */
        },
        error: {
          DEFAULT: "var(--color-error)", /* Vibrant red */
          foreground: "var(--color-error-foreground)", /* Pure white */
        },
      },
      fontFamily: {
        'sora': ['Sora', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
        'orbitron': ['Orbitron', 'monospace'],
        'sans': ['Inter', 'sans-serif'],
        'heading': ['Sora', 'sans-serif'],
        'data': ['Orbitron', 'monospace'],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in-right": {
          "0%": { opacity: "0", transform: "translateX(20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(0, 224, 255, 0.3)" },
          "50%": { boxShadow: "0 0 30px rgba(0, 224, 255, 0.5)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
        "slide-in-right": "slide-in-right 0.3s ease-out",
        "glow-pulse": "glow-pulse 2s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
      },
      boxShadow: {
        'glow-sm': '0 0 10px rgba(0, 224, 255, 0.2)',
        'glow': '0 0 20px rgba(0, 224, 255, 0.3)',
        'glow-lg': '0 0 30px rgba(0, 224, 255, 0.4)',
        'glow-secondary': '0 0 20px rgba(166, 108, 255, 0.3)',
        'glow-accent': '0 0 20px rgba(0, 255, 136, 0.3)',
        'elevation': '0 4px 20px rgba(0, 224, 255, 0.1)',
        'depth': '0 20px 60px rgba(10, 10, 10, 0.8)',
      },
      backdropBlur: {
        'xs': '2px',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
  ],
}