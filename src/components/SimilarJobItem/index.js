import {IoIosStar} from 'react-icons/io'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import './index.css'

const SimilarJobsItem = props => {
  const {jobDetails} = props
  console.log(jobDetails)
  const {
    companyLogoUrl,
    rating,
    title,
    jobDescription,
    location,
    employmentType,
  } = jobDetails
  return (
    <li className="similar-job-item-container">
      <div className="logo-image-container">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
          className="company-logo-justify"
        />
        <div className="title-container">
          <h1 className="company-title-head">{title}</h1>
          <div className="icon-container">
            <IoIosStar className="rating-star-icon" />
            <p className="rating">{rating}</p>
          </div>
        </div>
      </div>
      <h1 className="job-description-head">Description</h1>
      <p className="job-description">{jobDescription}</p>
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
    </li>
  )
}
export default SimilarJobsItem
