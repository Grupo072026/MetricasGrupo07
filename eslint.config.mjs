import js from "@eslint/js";

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
  {
    ignores: [
      "node_modules",
      "dist",
      "build",
      "coverage",
      ".github",
      "*.min.js"
    ],
  },

  js.configs.recommended,

  {
    files: ["**/*.js", "**/*.mjs"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },

    rules: {
      /**
       *  ERRORES (rompen el build en CI)
       */
      "no-undef": "error",
      "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      "no-unreachable": "error",
      "no-duplicate-imports": "error",

      /**
       *  WARNINGS (no rompen pipeline pero visibles en Sonar)
       */
      "no-console": "warn",
      "no-debugger": "warn",

      /**
       *  CALIDAD DE CÓDIGO (alineado con Sonar)
       */
      "eqeqeq": ["error", "always"],
      "curly": ["error", "all"],
      "no-var": "error",
      "prefer-const": "error",

      /**
       *  LEGIBILIDAD
       */
      "complexity": ["warn", 10],
      "max-lines-per-function": ["warn", 80],

      /**
       *  ESTILO ligero (no bloquear innecesariamente)
       */
      "semi": ["error", "always"],
      "quotes": ["error", "double", { avoidEscape: true }]
    }
  }
];
``