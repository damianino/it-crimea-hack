import { useNavigate } from 'react-router'

import { store } from 'store'

export const useHeader = () => {
  const navigateBase = useNavigate()
  const navigate = (page) => () => navigateBase(page)

  const { address } = store

  const addressStart = address?.slice(0, 6) || ''
  const addressEnd = address?.substr(address.length - 4) || ''
  const addressShorted = address ? `${addressStart}...${addressEnd}` : null

  const auth = store.connectToEverWallet

  const logout = store.disconnectToEverWallet

  return {
    navigate,
    logout,
    auth,
    addressShorted,
  }
}
