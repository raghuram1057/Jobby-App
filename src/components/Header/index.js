import {Link, withRouter} from 'react-router-dom'
import {IoMdHome} from 'react-icons/io'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'

import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  const renderLargeDevicesView = () => (
    <ul className="larger-devices-nav-items-list-container">
      <Link to="/" className="header-link-item">
        <li className="header-list-item">Home</li>
      </Link>
      <Link to="/jobs" className="header-link-item">
        <li className="header-list-item">Jobs</li>
      </Link>
    </ul>
  )

  const renderSmallSizeView = () => (
    <ul className="header-small-list-items">
      <Link to="/" className="header-link-item">
        <li className="header-small-view-list-item">
          <IoMdHome className="header-small-icons" />
        </li>
      </Link>
      <Link to="/jobs" className="header-link-item">
        <li className="header-small-view-list-item">
          <BsFillBriefcaseFill className="header-small-icons" />
        </li>
      </Link>
    </ul>
  )

  return (
    <nav className="navbar-container">
      <div className="nav-content">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png "
            alt="website logo"
            className="header-website-logo"
          />
        </Link>
        <div className="nav-large-view-container">
          {renderLargeDevicesView()}
          <button
            type="button"
            className="logout-button"
            onClick={onClickLogout}
          >
            Logout
          </button>
        </div>
        <div className="nav-bar-small-container">
          {renderSmallSizeView()}
          <button
            type="button"
            onClick={onClickLogout}
            className="icon-logout-button"
          >
            <FiLogOut className="header-small-icons" />.
          </button>
        </div>
      </div>
    </nav>
  )
}
export default withRouter(Header)
