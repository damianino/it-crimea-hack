import { makeAutoObservable } from 'mobx'

import {
  ProviderRpcClient,
  Address, Contract,
} from 'everscale-inpage-provider'

import CollectionAbi from './abi/Collection.abi.json'
import NftAbi from './abi/Nft.abi.json'

class Store {
  constructor () {
    makeAutoObservable(this, {}, { deep: true })
  }

  static ever = new ProviderRpcClient()

  static collectionAddress = '0:041607a733951617295190292b6da6353035ca8fcbc088ec3f6487fd0fa8f961'
  static nftAddress = '0:dded3e172cc2eb67f54a6e4a5fc98ad49aac1249f83ddb7ffce45b9a80eab2a6'
  static collectionHash = '1A6C5E3FA587BF91FCD33B42E06FE6FE4FA3A10735360339CDEE404A9FDDA667'

  getAddressFromLocalStorage = () => {
    return localStorage.getItem('wallet')
      ? new Address(localStorage.getItem('wallet'))
      : null
  }

  state = {
    walletAddress: this.getAddressFromLocalStorage(),
    contract: null,
    dePool: null,
    list: [],
  }

  get address () {
    return this.state.walletAddress?.toString() || null
  }

  setContract = () => {
    this.state.dePool = new Store.ever.Contract(
      CollectionAbi,
      new Address(Store.collectionAddress),
    )
    this.state.contract = new Contract(
      Store.ever,
      CollectionAbi,
      new Address(Store.collectionAddress),
    )
  }

  loadData = async () => {
    const accounts = await fetch(
      'https://devnet.evercloud.dev/0e0ee1504bd04346837a21140218e0e6/graphql',
      {
        headers: {
          'Accept-Encoding': 'gzip, deflate, br',
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Connection': 'keep-alive',
          'DNT': '1',
          'Origin': 'https://devnet.evercloud.dev',
        },
        body: JSON.stringify({
          'operationName': null,
          'variables': {},
          'query': '{\n  accounts(\n    filter: {code_hash: {eq: "1A6C5E3FA587BF91FCD33B42E06FE6FE4FA3A10735360339CDEE404A9FDDA667"}}\n  ) {\n    id\n  }\n}\n',
        }),
        method: 'POST',
      },
    )
      .then(result => result.json())
      .then((result) => result.data.accounts)

    const promises = []

    accounts.forEach((account) => {
      promises.push(
        new Store.ever.Contract(NftAbi, account.id)?.methods
        .getJson({ answerId: '0' })
        .call({ address: account })
        .then((result) => JSON.parse(result.json))
      )
    })

    Promise.all(promises).then(list => this.state.list = list)
  }

  mintNft = async (data) => {
    const result = await this.state.contract?.methods.mintNft({
      json: JSON.stringify(data),
    }).send(
      { from: this.state.walletAddress, amount: '1000000000', bounce: true },
    )
    console.log(result)
  }

  setWalletAddress = (address) => {
    this.state.walletAddress = address
    address
      ? localStorage.setItem('wallet', address.toString())
      : localStorage.removeItem('wallet')
  }

  connectToEverWallet = async () => {
    console.log('Connecting to wallet...')

    if (!(await Store.ever.hasProvider()))
      throw new Error('Extension is not installed')

    await Store.ever.ensureInitialized()

    const { accountInteraction } = await Store.ever.requestPermissions({
      permissions: ['basic', 'accountInteraction'],
    })

    if (accountInteraction == null)
      throw new Error('Insufficient permissions')

    this.setWalletAddress(accountInteraction.address)
    // this.state.contract = new Contract(
    //   Store.ever,
    //   abi,
    //   new Address(
    //     '0:e8e6522e58f25356ecf2cb2adb3500eda6f5caaa2d5bb587a53f8a3cbab8d385',
    //   ),
    // )

    // const result = await
    // this.state.contract?.methods.renderHelloWorld().send({ from:
    // this.state.walletAddress, amount: '1', bounce: true, })
    // console.log(result)

    console.log('Connected to wallet')
  }

  disconnectToEverWallet = async () => {
    await Store.ever.disconnect()
    this.setWalletAddress(null)
    console.log('Disconnected wallet')
  }
}

export const store = new Store()
