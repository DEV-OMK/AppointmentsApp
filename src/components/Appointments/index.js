// Write your code here
import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {
    title: '',
    date: '',
    appointmentsList: [],
    isFilterActive: false,
  }

  onClickStarred = () => {
    this.setState(prevState => ({
      isFilterActive: !prevState.isFilterActive,
    }))
  }

  toggleStarUrl = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachAppointment => {
        if (eachAppointment.id === id) {
          return {...eachAppointment, isStarred: !eachAppointment.isStarred}
        }
        return eachAppointment
      }),
    }))
  }

  onClickAdd = event => {
    event.preventDefault()
    const {title, date} = this.state

    if (title !== '' && date !== '') {
      const newAppointment = {
        id: uuidv4(),
        title,
        date,
        isStarred: false,
      }

      this.setState(prevState => ({
        title: '',
        date: '',
        appointmentsList: [...prevState.appointmentsList, newAppointment],
        isFilterActive: false,
      }))
    }
  }

  onChangeTitle = event => {
    this.setState({
      title: event.target.value,
    })
  }

  onChangeDate = event => {
    this.setState({
      date: event.target.value,
    })
  }

  render() {
    const {title, date, appointmentsList, isFilterActive} = this.state
    const starredBtnClass = isFilterActive ? 'starred-click' : 'starred-button'

    const filteredList = isFilterActive
      ? appointmentsList.filter(eachAppointment => eachAppointment.isStarred)
      : appointmentsList

    return (
      <div className="bg-container">
        <div className="card">
          <div className="static-container">
            <form className="form-container" onSubmit={this.onClickAdd}>
              <h1 className="heading">Add Appointment</h1>
              <label htmlFor="title">TITLE</label>
              <input
                type="text"
                placeholder="Title"
                value={title}
                id="title"
                onChange={this.onChangeTitle}
              />
              <label htmlFor="date">DATE</label>
              <input
                type="date"
                value={date}
                id="date"
                onChange={this.onChangeDate}
              />
              <button
                type="submit"
                onClick={this.onClickAdd}
                className="button"
              >
                Add
              </button>
            </form>
            <div className="image-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
                className="image"
              />
            </div>
          </div>
          <hr />
          <div className="appointments-container-header">
            <h1 className="title">Appointments</h1>
            <button
              type="button"
              className={starredBtnClass}
              onClick={this.onClickStarred}
            >
              Starred
            </button>
          </div>
          <ul className="appointments-container">
            {filteredList.map(eachAppointment => (
              <AppointmentItem
                key={eachAppointment.id}
                appointmentDetails={eachAppointment}
                toggleStarUrl={this.toggleStarUrl}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
