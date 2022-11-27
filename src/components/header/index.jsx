import { observer } from 'mobx-react-lite'
import {
  Container,
  Navbar,
  Button,
  Nav,
} from 'react-bootstrap'

import { useHeader } from 'components/header/hooks'
import { Fragment } from 'react'

export const Header = observer(() => {
  const {
    addressShorted,
    navigate,
    logout,
    auth,
  } = useHeader()

  return (
    <Navbar collapseOnSelect expand='md' bg='primary' variant='dark' className='mb-4'>
      <Container>
        <Navbar.Brand>NFT Crowdfunding</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id={"responsive-navbar-nav"}>
          <Nav className='me-auto'>
            <Nav.Link onClick={navigate('market')}>Market</Nav.Link>
            <Nav.Link onClick={navigate('minting')}>Mint NFT</Nav.Link>
          </Nav>
          <Nav className='ml-auto' style={{  gap: '20px' }}>{
            addressShorted ? (
              <Fragment>
                <Button variant='info'>{addressShorted}</Button>
                <Button variant='danger' onClick={logout}>Выйти</Button>
              </Fragment>
            ) : (
              <Button variant='secondary' onClick={auth}>Войти в кошелёк</Button>
            )
          }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
})
