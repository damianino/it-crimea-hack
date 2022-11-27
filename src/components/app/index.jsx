import { Fragment, useEffect } from 'react'
import { Route, Routes } from 'react-router'
import { Container } from 'react-bootstrap'

import { Minting } from 'components/minting'
import { Header } from 'components/header'
import { Market } from 'components/market'
import { store } from 'store'
import { observer } from 'mobx-react-lite'

export const App = observer(() => {
  const { state: { walletAddress }, setContract } = store
  useEffect(() => {
    if (walletAddress) setContract()
    store.loadData()
  }, [setContract, walletAddress])

  console.log(store.state.list);

  return (
    <Fragment>
      <Header />
      <Container>
        <Routes>
          <Route path='/minting' element={<Minting />} />
          <Route path='/market' element={<Market />} />
        </Routes>
      </Container>
    </Fragment>
  )
})
