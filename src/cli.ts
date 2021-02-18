import * as Path from 'path'
import { CLI, Shim } from 'clime'

export function run() {
  let cli = new CLI('zora', Path.join(__dirname, 'commands'))
  let shim = new Shim(cli)
  shim.execute(process.argv)
}
