import { spawnSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'

import type { Config } from './config.js'

export function install(config: Config) {
  console.log('🐈 Running `yarn install`')
  console.log('    ⏳ This might take a while...')

  // This allows us to run `yarn install` even if the parent directory is
  // another node project (like if you try to set it up in a sub-directory if
  // this project)
  fs.writeFileSync(path.join(config.installationDir, 'yarn.lock'), '')

  spawnSync('yarn', ['install'], {
    cwd: config.installationDir,
    // On Windows `yarn` isn't an executable. It can't be run as a system
    // process. So it needs to be run in a shell process.
    shell: process.platform === 'win32',
  })
}
