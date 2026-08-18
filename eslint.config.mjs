import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

// eslint-config-next 16 exporta flat config diretamente (Linter.Config[]).
// A ponte FlatCompat/@eslint/eslintrc que existia aqui antes quebrava com
// ESLint 10 ("Converting circular structure to JSON" ao validar o schema
// da config legada), e deixou de ser necessária.
const eslintConfig = [
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
  ...nextCoreWebVitals,
  ...nextTypescript,
];

export default eslintConfig;
