import {Link} from 'react-router-dom'
import {IoIosStar} from 'react-icons/io'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import './index.css'

const JobsListItem = props => {
  const {jobsDetails} = props
  const {
    id,
    title,
    companyLogoUrl,
    rating,
    location,
    employmentType,
    packagePerAnnum,
    jobDescription,
  } = jobsDetails

  return (
    <Link to={`jobs/${id}`} className="job-link-container">
      <li className="job-list-item-container">
        <div className="logo-title-container">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="company-logo-image"
          />
          <div className="title-rating-container">
            <h1 className="company-title">{title}</h1>
            <div className="icon-container">
              <IoIosStar className="rating-star-icon" />
              <p className="rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="location-salary-employment-container">
          <div className="location-employee-type-container">
            <div className="icon-container">
              <MdLocationOn className="icon" />
              <p className="location">{location}</p>
            </div>
            <div className="icon-container">
              <BsFillBriefcaseFill className="icon" />
              <p className="location">{employmentType}</p>
            </div>
          </div>
          <p className="package-per-annum">{packagePerAnnum}</p>
        </div>
        <hr className="horizontal-line" />
        <h1 className="job-description-head">Description</h1>
        <p className="job-description">{jobDescription}</p>
      </li>
    </Link>
  )
}
export default JobsListItem
