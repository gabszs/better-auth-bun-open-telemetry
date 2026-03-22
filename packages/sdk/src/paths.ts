/**
 * XDG-based directory paths for otel-bun CLI
 * Uses xdg-basedir package for cross-platform compatibility (Linux/macOS)
 */

import { homedir } from "node:os";
import { join } from "node:path";
import { xdgConfig, xdgData, xdgState } from "xdg-basedir";

const APP_NAME = "otel-bun";

/**
 * Main namespace for all XDG-compliant paths
 */
export const Paths = {
	/**
	 * XDG_CONFIG_HOME/otel-bun
	 * Fallback: ~/.config/otel-bun
	 */
	get config(): string {
		return join(xdgConfig ?? join(homedir(), ".config"), APP_NAME);
	},

	/**
	 * XDG_DATA_HOME/otel-bun
	 * Fallback: ~/.local/share/otel-bun
	 */
	get data(): string {
		return join(xdgData ?? join(homedir(), ".local", "share"), APP_NAME);
	},

	/**
	 * XDG_STATE_HOME/otel-bun
	 * Fallback: ~/.local/state/otel-bun
	 */
	get state(): string {
		return join(xdgState ?? join(homedir(), ".local", "state"), APP_NAME);
	},

	/**
	 * Configuration file path: ~/.config/otel-bun/otel-bun.json
	 */
	get configFile(): string {
		return join(this.config, "otel-bun.json");
	},

	/**
	 * Auth file path: ~/.local/share/otel-bun/auth.json
	 */
	get authFile(): string {
		return join(this.data, "auth.json");
	},

	/**
	 * Meta directory: ~/.local/share/otel-bun/meta
	 */
	get metaDir(): string {
		return join(this.data, "meta");
	},

	/**
	 * Default repo root: ~/ow
	 */
	get defaultRepoRoot(): string {
		return join(homedir(), "ow");
	},

	/**
	 * otel-bun single-skill directory: ~/.local/share/otel-bun/skill/otel-bun
	 */
	get otel-bunSkillDir(): string {
		return join(this.data, "skill", "otel-bun");
	},

	/**
	 * otel-bun references directory: ~/.local/share/otel-bun/skill/otel-bun/references
	 */
	get otel-bunReferencesDir(): string {
		return join(this.otel-bunSkillDir, "references");
	},

	/**
	 * otel-bun assets directory: ~/.local/share/otel-bun/skill/otel-bun/assets
	 */
	get otel-bunAssetsDir(): string {
		return join(this.otel-bunSkillDir, "assets");
	},

	/**
	 * Global map path: ~/.local/share/otel-bun/skill/otel-bun/assets/map.json
	 */
	get otel-bunGlobalMapPath(): string {
		return join(this.otel-bunAssetsDir, "map.json");
	},
};

/**
 * Expands ~ to user's home directory (for backward compatibility)
 */
export function expandTilde(path: string): string {
	if (path.startsWith("~/")) {
		return join(homedir(), path.slice(2));
	}
	return path;
}
