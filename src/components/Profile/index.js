import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import './index.css'

const apiConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  progress: 'PROGRESS',
  initial: 'INITIAL',
}

class Profile extends Component {
  state = {
    profileDetails: {},
    profileApiStatus: 'PROGRESS',
  }

  componentDidMount() {
    this.getProfileData()
  }

  onClickRetryButton = () => {
    this.getProfileData()
  }

  getProfileData = async () => {
    const apiUrl = 'https://apis.ccbp.in/profile'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    this.setState({profileApiStatus: apiConstants.progress})
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const updatedProfileData = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({
        profileDetails: updatedProfileData,
        profileApiStatus: apiConstants.success,
      })
    } else {
      this.setState({profileApiStatus: apiConstants.failure})
    }
  }

  renderProfileSuccessView = () => {
    const {profileDetails} = this.state
    const {name, profileImageUrl, shortBio} = profileDetails
    return (
      <div className="">
        <div className="profile-container">
          <img src={profileImageUrl} alt="profile" className="profile-image" />
          <h1 className="profile-name">{name}</h1>
          <p className="profile-short-bio">{shortBio}</p>
        </div>
      </div>
    )
  }

  renderProfileLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderProfileFailureView = () => (
    <div>
      <button
        type="button"
        className="retry-button"
        onClick={this.onClickRetryButton}
      >
        Retry
      </button>
    </div>
  )

  renderProfileSection = () => {
    const {profileApiStatus} = this.state
    switch (profileApiStatus) {
      case apiConstants.success:
        return this.renderProfileSuccessView()
      case apiConstants.failure:
        return this.renderProfileFailureView()
      case apiConstants.progress:
        return this.renderProfileLoadingView()
      default:
        return null
    }
  }

  render() {
    return <div>{this.renderProfileSection()}</div>
  }
}

export default Profile
