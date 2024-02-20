import Cookies from 'js-cookie'
import {Redirect, withRouter} from 'react-router-dom'
import './index.css'

const Login = props => {
  const jwtToken = Cookies.get('jwt_token')
  const setCookiesAndNavigateHome = token => {
    const {history} = props
    Cookies.set('jwt_token', token, {
      expires: 30,
    })
    history.replace('/')
  }
  const onClickLogin = async () => {
    const userDetails = {username: 'rahul', password: 'rahul@2021'}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      methos: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      setCookiesAndNavigateHome(data.jwt_token)
    }
  }
  if (jwtToken !== undefined) {
    return <Redirect to="/" />
  }
  return (
    <div className="login">
      <h1>Please Login</h1>
      <button onClick={onClickLogin} type="button">
        Login with Sample Creds
      </button>
    </div>
  )
}
export default Login
