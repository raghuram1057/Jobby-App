import './index.css'

let listArray = []

const FilterGroups = props => {
  const {
    employmentTypesList,
    salaryRangesList,
    salaryRangeValue,
    employmentFilter,
  } = props

  const onChangeSalaryRange = event => {
    salaryRangeValue(event.target.value)
  }

  const onChangeEmployment = event => {
    console.log(event.target.value)
    const checkValue = event.target.value
    const checkStatus = event.target.checked
    if (checkStatus) {
      listArray.push(checkValue)
    } else {
      const updateValue = listArray.filter(each => each !== checkValue)
      listArray = updateValue
    }
    const stringIs = listArray.join()
    employmentFilter(stringIs)
    console.log(listArray)
  }

  const renderEmploymentTypeOptions = () => (
    <div className="filters-container">
      <h1 className="filter-type-heading">Type of Employment</h1>
      <ul className="options-list-container">
        {employmentTypesList.map(each => (
          <li key={each.employmentTypeId} className="option-list-item">
            <input
              type="checkbox"
              id={each.employmentTypeId}
              value={each.employmentTypeId}
              onChange={onChangeEmployment}
              className="check-box"
            />
            <label htmlFor={each.employmentTypeId} className="label-text">
              {each.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  )

  const renderSalaryRangesOptions = () => (
    <div className="filters-container">
      <h1 className="filter-type-heading">Salary Range</h1>
      <ul className="options-list-container">
        {salaryRangesList.map(each => (
          <li key={each.salaryRangeId} className="option-list-item">
            <input
              type="radio"
              id={each.salaryRangeId}
              className="check-box"
              value={each.salaryRangeId}
              onChange={onChangeSalaryRange}
            />
            <label htmlFor={each.salaryRangeId} className="label-text">
              {each.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  )
  return (
    <>
      {renderEmploymentTypeOptions()}
      <hr className="horizontal-line" />
      {renderSalaryRangesOptions()}
    </>
  )
}
export default FilterGroups
