# @otel-bun/sdk

Core business logic for otel-bun.

Powers the CLI and web app with git clone management, AI reference generation, and agent skill distribution.

## Installation

```bash
bun add @otel-bun/sdk
```

### Optional dependencies

- Sync: `bun add convex`
- AI: `bun add @opencode-ai/sdk`

### Entry points

- `@otel-bun/sdk` (core local functionality)
- `@otel-bun/sdk/sync` (Convex sync)
- `@otel-bun/sdk/ai` (AI generation)
- `@otel-bun/sdk/internal` (CLI-only helpers)
- `@otel-bun/sdk/convex/api` and `@otel-bun/sdk/convex/server` (Convex types)

## Modules

| Module                 | Description                                        |
| ---------------------- | -------------------------------------------------- |
| `config.ts`            | Config load/save, path utilities                   |
| `paths.ts`             | XDG-compliant path resolution                      |
| `clone.ts`             | Git clone/update/remove                            |
| `index-manager.ts`     | Global + project map management                    |
| `reference.ts`         | Reference install + SKILL.md                       |
| `generate.ts`          | AI reference generation (`@otel-bun/sdk/ai`)       |
| `sync.ts`              | Convex client for push/pull (`@otel-bun/sdk/sync`) |
| `auth.ts`              | WorkOS token management                            |
| `agents.ts`            | Agent registry                                     |
| `agents-md.ts`         | AGENTS.md reference table generation (internal)    |
| `repo-source.ts`       | Parse repo input (URL, owner/repo, local)          |
| `manifest.ts`          | Dependency parsing (package.json, etc.)            |
| `dep-mappings.ts`      | npm package to GitHub repo resolution              |
| `reference-matcher.ts` | Match deps to installed references                 |
| `repo-manager.ts`      | Bulk repo operations (update, prune, gc)           |
| `models.ts`            | AI provider/model registry                         |
| `installation.ts`      | Upgrade/uninstall utilities                        |

## Usage

### Config & Paths

```typescript
import { loadConfig, saveConfig, Paths } from "@otel-bun/sdk";

const config = loadConfig();
const skillDir = Paths.otel-bunDir;
const globalMap = Paths.globalMap;
```

### Clone Management

```typescript
import { cloneRepo, updateRepo, removeRepo } from "@otel-bun/sdk";

await cloneRepo(repoSource);
await updateRepo("owner/repo");
await removeRepo("owner/repo", { referenceOnly: true });
```

### Reference Generation

```typescript
import { generateReferenceWithAI } from "@otel-bun/sdk/ai";
import { installReference } from "@otel-bun/sdk";

const result = await generateReferenceWithAI(repoPath, { model: "claude-sonnet-4-20250514" });
await installReference("owner/repo", result.referenceContent, result.commitSha);
```

### Map Management

```typescript
import { readGlobalMap, writeProjectMap, upsertGlobalMapEntry } from "@otel-bun/sdk";

const globalMap = readGlobalMap();
await upsertGlobalMapEntry("owner/repo", { localPath, references: ["repo.md"] });
await writeProjectMap(cwd, projectMap);
```

### Sync (Push/Pull)

```typescript
import { pullReference, pushReference, checkRemote } from "@otel-bun/sdk/sync";

const ref = await pullReference("owner/repo");
await pushReference("owner/repo", referenceData);
```

### Dependency Resolution

```typescript
import {
	parseDependencies,
	resolveDependencyRepo,
	matchDependenciesToReferences,
} from "@otel-bun/sdk";

const deps = parseDependencies("package.json");
const repo = await resolveDependencyRepo("zod", "^3.0.0");
const matches = matchDependenciesToReferences(deps);
```

## Data Paths

| Purpose    | Getter                |
| ---------- | --------------------- |
| Config     | `Paths.config`        |
| Data root  | `Paths.data`          |
| Skill dir  | `Paths.otel-bunDir`   |
| Global map | `Paths.globalMap`     |
| References | `Paths.referencesDir` |

## Commands

```bash
bun run build        # Build with tsdown
bun run dev          # Watch mode
bun run typecheck    # Type check
bun run test         # Run tests
```
