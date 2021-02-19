import chalk from 'chalk'
import figlet from 'figlet'
import { run } from './cli'

console.log(chalk.greenBright(figlet.textSync('zora-cli', { horizontalLayout: 'full' })))
run()
