<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Architecture
- Use the root route for the shared platform shell and five separate content routes, so navigation and metadata remain consistent.
- Keep deterministic evaluation and CSV validation in `src/lib/performance.ts`, shared by individual and batch workflows to prevent scoring divergence.
- This research showcase uses synthetic metrics and browser-local mock inference, not a trained model or persistent employee storage; label that distinction explicitly.
- Use semantic CSS tokens and shared interface components for every visual control so the platform remains theme-consistent.
