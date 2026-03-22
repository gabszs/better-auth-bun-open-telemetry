import { defineConfig } from "tsdown";

export default defineConfig({
	entry: [
		"src/index.ts",
		"src/internal.ts",
		"src/sync/index.ts",
		"src/ai/index.ts",
	],
	format: ["esm"],
	dts: true,
	clean: true,
	external: ["@otel-bun/sdk/convex/api", "@otel-bun/sdk/convex/server"],
});
