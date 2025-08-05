export interface RunnerHooks {
  setup: any[]
  teardown: any[]
}

export interface TestConfig {
  files: string[]
  timeout: number
}

export const runnerHooks: RunnerHooks
export default TestConfig 