/**
 * Test mocks index
 * Re-exports all mock utilities for easy importing in tests
 */

export {
	addFetchRoute,
	clearFetchRoutes,
	createFetchMock,
	type FetchMockRoute,
	type FetchResponse,
	installFetchMock,
	mockGitHubStarsResponse,
	mockotel-bunCheckResponse,
	mockotel-bunPullResponse,
	mockOpenCodeHealthResponse,
	resetFetchMock,
} from "./fetch.js";
export {
	addVirtualFile,
	clearVirtualFs,
	createFsMock,
	createFsPromisesMock,
	getVirtualFs,
	initVirtualFs,
	installFsMocks,
	removeVirtualFile,
	type VirtualFile,
	type VirtualFileSystem,
} from "./fs.js";
export {
	configureGitMock,
	createExecSyncMock,
	type GitMockConfig,
	mockChildProcess,
	resetGitMock,
} from "./git.js";
