import {Component} from 'react'
import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

class Home extends Component {
  goFindJobs = () => {
    const {history} = this.props
    history.push('/jobs')
  }

  render() {
    return (
      <div className="home-bg-container">
        <Header />
        <div className="app-info-container">
          <h1 className="home-heading">Find The Job That Fits Your Life</h1>
          <p className="home-description">
            Millions of people are searching for jobs, salary information,
            company reviews. Find the job that fits your abilities and
            potential.
          </p>
          <Link to="/jobs">
            <button
              type="button"
              className="find-jobs-button"
              onClick={this.goFindJobs}
            >
              Find Jobs
            </button>
          </Link>
        </div>
      </div>
    )
  }
}
export default Home
