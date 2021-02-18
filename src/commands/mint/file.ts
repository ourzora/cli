import { Command, command, metadata } from 'clime'

@command({
    description:
        '[COMING SOON] This command will mint a new zNFT on the Zora Protocol from a file on your computer. Type `zora mint file --help` for more.'
})
export default class extends Command {
    @metadata
    execute() {
        return console.log("\nNOT IMPLEMENTED YET.\n")
    }
}
