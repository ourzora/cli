import chalk from 'chalk'
import clear from 'clear'
import figlet from 'figlet'
import { run } from './cli'

clear()
console.log(chalk.greenBright(figlet.textSync('zora-cli', { horizontalLayout: 'full' })))

run()
