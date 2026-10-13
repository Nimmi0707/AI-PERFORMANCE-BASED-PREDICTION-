# AI-Employee Performance Analytics

A multi-page enterprise workforce analytics research showcase, built with TanStack Start, React 19, TypeScript, Tailwind CSS, Recharts, and Papa Parse.

## Pages

- **Platform Overview** (`/`): workforce summary, neural-network visual, and connected modules.
- **Executive Analytics** (`/analytics`): interactive trend charts, department filters, and report export.
- **Performance Engine** (`/engine`): individual employee scoring, adjustable inputs, and a confidence gauge.
- **Algorithm Insights** (`/insights`): illustrative Gini importance, classification thresholds, and model comparison.
- **Bulk Processing** (`/bulk`): CSV validation, browser-local mock inference, and result export.

## Run locally

Requires a recent Node.js release and Bun (or npm).

```sh
bun install
bun run dev
```

```sh
bun run test
bun run build
```

## Research methodology and limitations

This is a **demonstration**, not a trained AI model. Dashboard data, reference Random Forest architecture, Gini importance, and benchmark metrics are synthetic or illustrative. No empirical model training or cross-validation has been performed.

Individual and batch inference use the same deterministic formula:

`score = productivity × 0.35 + quality × 0.30 + attendance × 0.15 + collaboration × 0.20`

Scores are rounded to one decimal place. Classes: Exceptional (85+), High performer (70+), Developing (50+), Needs support (below 50). Confidence is `min(97, round(55 + 2 × distance to the nearest threshold))`, an illustrative heuristic, **not a calibrated probability**. Department does not influence scoring. Employment decisions require human oversight, validated representative data, and fairness/privacy review.

## CSV format

Required columns: `employee_id`, `productivity`, `quality`, `attendance`, `collaboration`. Optional: `department`. Header names are case-insensitive. IDs must be unique and nonempty; scores must be finite numbers from 0 to 100. Files are limited to 5 MB and 10,000 records. A downloadable sample is included on the Bulk Processing page. CSV exports escape spreadsheet formula injection.

Processing happens locally in the browser. No datasets are uploaded, stored, or sent to an external service. No login, database, or live model service is configured.

## GitHub export

The repository includes application source, dependency manifests, a lockfile, and the bundled visual asset; no private keys or environment secrets are required. Connect the project through Lovable's **+ → GitHub → Connect project** to create a synchronized repository. Connecting an account and creating the repository are user actions; this project does not automatically publish to GitHub.

The TanStack Start application preserves its existing deployment configuration. Any alternative hosting environment must support its server runtime; this is not a standalone static HTML bundle.
