// Write your code here
import {format} from 'date-fns'
import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, toggleStarUrl} = props
  const {id, title, date, isStarred} = appointmentDetails

  const starUrl = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onClickStar = () => {
    toggleStarUrl(id)
  }

  return (
    <li className="appointment-card">
      <div className="header-container">
        <p className="card-title">{title}</p>
        <button
          type="button"
          data-testid="star"
          className="star"
          onClick={onClickStar}
        >
          <img src={starUrl} alt="star" />
        </button>
      </div>
      <p className="date">
        {`Date: ${format(new Date(date), 'dd MMMM yyyy, EEEE')}`}
      </p>
    </li>
  )
}

export default AppointmentItem
