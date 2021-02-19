# zora-cli

`zora-cli` is a cli tool for interacting with the Zora Protocol on the ethereum blockchain.

## usage

```
yarn global add @zoralabs/cli
```

### mint

#### uri 

Mint new zNFTs on the Zora Protocol from a contentURI and metadataURI.

##### local blockchain

```bash
zora mint uri --rpc-url http://localhost:8545 \
--wallet-mnemonic 'concert load couple harbor equip island argue ramp clarify fence smart topic' \
--chain-id 1337 \
--media-address 0x1D7022f5B17d2F8B695918FB48fa1089C9f85401 \
--market-address 0x1dC4c1cEFEF38a777b15aA20260a54E584b16C48 \
--content-uri https://ipfs.io/ipfs/bafybeiacyrrjel6qq2mdv6to6fvbzsg64y3g4kbp32h55zfmesx2oe7cwi \
--metadata-uri https://ipfs.io/ipfs/bafybeifvmzeyggdi36igqjiub5bq6vbpn5ebihxgqjbrk5ibqculk4upoy \
--creator-share 10 \
--timeout 10000
```

##### rinkeby

```bash
zora mint uri --rpc-url <infura or alchemy node> \
--wallet-mnemonic 'concert load couple harbor equip island argue ramp clarify fence smart topic' \
--chain-id 4 \
--content-uri https://ipfs.io/ipfs/bafybeiacyrrjel6qq2mdv6to6fvbzsg64y3g4kbp32h55zfmesx2oe7cwi \
--metadata-uri https://ipfs.io/ipfs/bafybeifvmzeyggdi36igqjiub5bq6vbpn5ebihxgqjbrk5ibqculk4upoy \
--creator-share 10 \
--timeout 10000
```

##### mainnet

```bash
zora mint uri --rpc-url <infura or alchemy node> \
--wallet-mnemonic 'concert load couple harbor equip island argue ramp clarify fence smart topic' \
--chain-id 1 \
--content-uri https://ipfs.io/ipfs/bafybeiacyrrjel6qq2mdv6to6fvbzsg64y3g4kbp32h55zfmesx2oe7cwi \
--metadata-uri https://ipfs.io/ipfs/bafybeifvmzeyggdi36igqjiub5bq6vbpn5ebihxgqjbrk5ibqculk4upoy \
--creator-share 10 \
--timeout 10000
```

#### file 

Coming Soon.

## Feature Requests

For feature requests please create github issues or post for discussion in our discord at https://zora.community.