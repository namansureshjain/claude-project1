# 90 Days

A dark, single-page tracker for a 90-day plan to go from no coding history to building
AI-native apps, agents, and doing real research work.

Open `index.html` in a browser. Set your start date once; from then on the page shows
you the tasks for today, this week's project, and nothing else. Checkbox state is saved
in your browser (`localStorage`), so use the same browser each day.

## Files

- `index.html` — the whole site: markup, styles, and about 100 lines of JS. No build step, no dependencies.
- `plan.js` — all 90 days of content. Edit this to change the plan; you never need to touch the HTML.

## Editing the plan

Each week is one object in `PLAN`. A task is `["text"]` or `["text", "https://link"]`.

```js
{ d: "Mon", tasks: [
  ["Read something", "https://example.com"],
  ["Build something"]
]}
```

Weeks are 7 days each except week 13, which is 6 — 90 days total.

## Publishing it

Optional. Enable GitHub Pages on this repo (Settings → Pages → deploy from branch) and
the tracker is available at a URL. Progress is still stored per-browser.

## The shape of the plan

Thirteen weeks. Mon–Thu build, Friday concepts and papers, Saturday ship, Sunday write.
Roughly 2–3 hours a day, with research woven through from week 1 rather than bolted on
at the end.

| Wk | Focus | Project |
|----|-------|---------|
| 1  | Python, through the side door | Deal-flow file wrangler |
| 2  | First API calls, structured output | Deal Memo Summarizer v1 |
| 3  | Embeddings and retrieval | Semantic search over your own docs |
| 4  | RAG end to end | RAG app a colleague can open |
| 5  | Evals | A 50-case eval harness |
| 6  | Tool use | Three tools on your summarizer |
| 7  | Agents that survive contact | Company research agent |
| 8  | MCP and multi-agent | An MCP server over your own data |
| 9  | Ship an AI-native app | Flagship v1, public URL |
| 10 | Under the hood | micrograd, then nanoGPT, by hand |
| 11 | Fine-tuning, and when not to | Fine-tune vs RAG, measured |
| 12 | Research reps | Reproduce a paper, then extend it |
| 13 | Compound | Flagship v2 and publish |

Every link in `plan.js` was checked against a live source when the plan was written.
Sources include Karpathy's Zero to Hero, Anthropic's courses and cookbooks, the Hugging
Face Agents Course, Stanford CS336, and primary papers on arXiv.

Jane Street puzzles appear twice, as optional Sunday extras. They are excellent
probability puzzles and they are not AI engineering — they will not teach you to build.
