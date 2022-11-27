import { Fragment, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { Button, Card } from 'react-bootstrap'

import map from 'lodash/map'

import { mockNft } from 'mock'
import { store } from 'store'

export const Market = observer(() => {
  console.log(store.state.list);
  return (
    <Fragment>
      <h2 className='text-center mb-4'>Investing NFT Market</h2>
      <div className='d-flex flex-wrap justify-content-between'>{
        map(store.state.list, (nft, i) => (
          <Card style={{ width: '22rem', marginBottom: '30px' }} key={i}>
            <Card.Img variant='top' src={`images/${i + 1}.png`} />
            <Card.Body>
              <Card.Title>{nft.name}</Card.Title>
              <Card.Text>{nft.description}</Card.Text>
              <Button variant='primary'>Купить NFT</Button>
            </Card.Body>
          </Card>
        ))
      }</div>
    </Fragment>
  )
})
