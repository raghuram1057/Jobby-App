import {Component} from 'react'
import {withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import FilterGroups from '../FilterGroups'
import Profile from '../Profile'
import JobsListItem from '../JobsListItem'

import Header from '../Header'

import './index.css'

const apiConstants = {
  success: 'SUCCESS',
  progress: 'PROGRESS',
  failure: 'FAILURE',
}

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Jobs extends Component {
  state = {
    jobs: [],
    jobsApiStatus: apiConstants.progress,
    searchVal: '',
    minPackage: '',
    employType: '',
  }

  componentDidMount() {
    this.getJobsList()
  }

  onClickRetryButton = () => {
    this.getJobsList()
  }

  getJobsList = async () => {
    const {searchVal, minPackage, employType} = this.state
    const jwtToken = Cookies.get('jwt_token')

    const apiUrl2 = `https://apis.ccbp.in/jobs?employment_type=${employType}&minimum_package=${minPackage}&search=${searchVal}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    this.setState({jobsApiStatus: apiConstants.progress})

    const response = await fetch(apiUrl2, options)
    if (response.ok) {
      const data = await response.json()
      const updatedJobsData = data.jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))

      this.setState({
        jobs: updatedJobsData,
        jobsApiStatus: apiConstants.success,
      })
    } else {
      this.setState({jobsApiStatus: apiConstants.failure})
    }
  }

  renderJobsView = () => {
    const {jobs} = this.state
    return (
      <ul className="job-list-container">
        {jobs.map(eachJob => (
          <JobsListItem jobsDetails={eachJob} key={eachJob.id} />
        ))}
      </ul>
    )
  }

  renderNoJobsView = () => (
    <div className="no-jobs-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="no-jobs-image"
      />
      <h1 className="no-jobs-heading">No Jobs Found</h1>
      <p className="no-jobs-description">
        We could not find any jobs. Try other filters.
      </p>
    </div>
  )

  renderJobsSuccessView = () => {
    const {jobs} = this.state
    return jobs.length > 1 ? this.renderJobsView() : this.renderNoJobsView()
  }

  renderLoaderView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png "
        alt="failure view"
        className="job-failure-image"
      />
      <h1 className="job-failure-heading">Oops! Something Went Wrong</h1>
      <p className="job-failure-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="retry-button"
        onClick={this.onClickRetryButton}
      >
        Retry
      </button>
    </div>
  )

  renderAllViewsOfJobs = () => {
    const {jobsApiStatus} = this.state

    switch (jobsApiStatus) {
      case apiConstants.success:
        return this.renderJobsSuccessView()
      case apiConstants.progress:
        return this.renderLoaderView()
      case apiConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchVal: event.target.value})
  }

  salaryRangeIs = salaryId => {
    this.setState({minPackage: salaryId}, this.getJobsList)
  }

  employmentFilterIs = employId => {
    this.setState({employType: employId}, this.getJobsList)
  }

  onClickSearchIcon = () => {
    this.getJobsList()
  }

  renderJobsList = () => (
    <div className="jobs-list-container">
      <div className="search-input-container-lg">
        <input
          type="search"
          className="search-input"
          placeholder="Search"
          onChange={this.onChangeSearchInput}
        />
        <button
          type="button"
          data-testid="searchButton"
          className="search-button"
          onClick={this.onClickSearchIcon}
        >
          <BsSearch className="search-icon" />.
        </button>
      </div>
      {this.renderAllViewsOfJobs()}
    </div>
  )

  render() {
    return (
      <div className="jobs-page-container">
        <Header />
        <div className="response-jobs-container">
          <div className="profile-filter-section">
            <div className="search-input-container-sm">
              <input
                type="search"
                className="search-input"
                placeholder="Search"
                onChange={this.onChangeSearchInput}
              />
              <button
                type="button"
                data-testid="searchButton"
                className="search-button"
                onClick={this.onClickSearchIcon}
              >
                <BsSearch className="search-icon" />.
              </button>
            </div>
            <Profile />
            <hr className="horizontal-line" />
            <FilterGroups
              employmentTypesList={employmentTypesList}
              salaryRangesList={salaryRangesList}
              salaryRangeValue={this.salaryRangeIs}
              employmentFilter={this.employmentFilterIs}
            />
          </div>
          <div>{this.renderJobsList()}</div>
        </div>
      </div>
    )
  }
}
export default withRouter(Jobs)
