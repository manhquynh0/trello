import {
  useSearchParams,
  Navigate
} from 'react-router-dom'
import LoadingPage from '~/pages/Loading/LoadingPage'
import {
  verifyAccountApi
} from '~/apis'
import {
  useEffect,
  useState
} from 'react'
const AccountVerification = () => {
  let [query] = useSearchParams()
  const { email, token } = Object.fromEntries([...query])
  const [verified, setVeriFied] = useState(false)
  useEffect(() => {
    if (email && token) {
      verifyAccountApi({
        email,
        token
      }).then(() => setVeriFied(true))
    }

  }, [email, token])

  if (!email || !token) {
    return <Navigate to='/404' />
  }
  if (!verified) {
    return <LoadingPage caption = 'Đang xác thực tài khoản ...' />
  }
  return <Navigate to={
    `/login?verifiedEmail=${email}`
  }
  />

}
export default AccountVerification