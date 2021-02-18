import { Command, command, metadata, option, Options } from 'clime'
import {
  constructMediaData,
  Zora,
  sha256FromBuffer,
  constructBidShares
} from '@zoralabs/zdk'
import { JsonRpcProvider } from '@ethersproject/providers'
import { Wallet } from 'ethers'
import axios from 'axios'

export class MintOptions extends Options {
  @option({
    flag: 'r',
    required: true,
    description: '[required] rpc endpoint for eth node'
  })
  rpcURL!: string

  @option({
    flag: 'w',
    required: true,
    description: '[required] wallet mnemonic'
  })
  walletMnemonic!: string

  @option({
    flag: 'i',
    required: true,
    description: '[required] chainId for the cli to connect to.'
    // TODO: validate chainID 1, 4, 50
  })
  chainId!: number

  @option({
    flag: 'c',
    required: true,
    description: '[required] uri where the content is located'
  })
  contentURI!: string

  @option({
    flag: 'm',
    required: true,
    description: '[required] uri where the metadata is located'
  })
  metadataURI!: string

  @option({
    flag: 's',
    required: true,
    description: "[required] creator's share (%) of future sales of the minted zNFT"
    // TODO: require that its less than 100
  })
  creatorShare!: number

  @option({
    flag: 'a',
    required: false,
    description: '[optional] override address for Zora Media Contract'
  })
  mediaAddress!: string

  @option({
    flag: 'b',
    required: false,
    description: '[optional] override address for Zora Market Contract'
  })
  marketAddress!: string

  @option({
    flag: 't',
    default: 10000,
    description: '[optional] timeout (ms) for making http requests to passed uris'
  })
  timeout!: number
}

@command({
  description:
    'This command will mint a new zNFT on the Zora Protocol. Use `zora mint --help` for more.'
})
export default class extends Command {
  @metadata
  async execute(options: MintOptions) {
    const provider = new JsonRpcProvider(options.rpcURL, options.chainId)
    await provider.ready

    const wallet = Wallet.fromMnemonic(options.walletMnemonic)
    const connectedWallet = wallet.connect(provider)

    let zora: Zora
    if (options.mediaAddress && options.marketAddress) {
      zora = new Zora(
        connectedWallet,
        options.chainId,
        options.mediaAddress,
        options.marketAddress
      )
    } else {
      zora = new Zora(connectedWallet, options.chainId)
    }

    const contentResp = await axios.get(options.contentURI, {
      timeout: options.timeout,
      responseType: 'arraybuffer'
    })
    const contentHash = sha256FromBuffer(contentResp.data)

    const metadataResp = await axios.get(options.metadataURI, {
      timeout: options.timeout,
      responseType: 'arraybuffer'
    })
    const metadataHash = sha256FromBuffer(metadataResp.data)

    const mediaData = constructMediaData(
      options.contentURI,
      options.metadataURI,
      contentHash,
      metadataHash
    )
    const bidShares = constructBidShares(
      options.creatorShare,
      100 - options.creatorShare,
      0
    )
    const tx = await zora.mint(mediaData, bidShares)

    console.log(
      `\n\n\tSuccessfully submitted Mint Transaction to the Zora Media Contract. \n\tContract Address: ${zora.mediaAddress}. \n\tChainId ${options.chainId}. \n\tTransaction Hash: ${tx.hash}.`
    )
  }
}
