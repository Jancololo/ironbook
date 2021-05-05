import users from "./users";
import './App.css';
import { v4 as uuidv4 } from 'uuid';

import React, { Component } from 'react'

export default class App extends Component {
  state = {
    users: users,
    search: '',
    teacher: false,
    student: false,
    campus: 'All'
  }

  handleChange = event => {
    this.setState({
      search: event.target.value,
      users: users.filter(user => user.firstName.includes(event.target.value) || user.lastName.includes(event.target.value))
    })
  } 

  handleStudentChange = event => {
    this.setState({
      student: event.target.checked,
      users: event.target.checked ? users.filter(user => user.role === 'student') : users
    })
  }

  handleTeacherChange = event => {
    this.setState({
      teacher: event.target.checked,
      users: event.target.checked ? users.filter(user => user.role === 'teacher') : users
    })
  }

  handleCampusChange = event => {
    this.setState({
      campus: event.target.value,
      users: event.target.value !== 'All' ? users.filter(user => user.campus === event.target.value) : users
    })
  }
  
  render() {
    const userList = this.state.users.map(user => (
      <tr key={uuidv4()}>
        <th>{user.firstName}</th>
        <th>{user.lastName}</th>
        <th>{user.campus}</th>
        <th>{user.role}</th>
        {user.linkedin && <th><a href={user.linkedin}><img style={{height: '13px'}} src="./linkedin.png" alt=""/></a></th>}
      </tr>
    ))

    return (
      <div className="main-container">
        <h1>Ironbook</h1>
        <input type="text" name="name" id="name" value={this.state.search} onChange={this.handleChange} placeholder="Search by name"/>
        <div className="filter">
          <div className="student">
            <label htmlFor="student">Student</label>
            <input type="checkbox" name="student" id="student" value={this.state.student} onChange={this.handleStudentChange}/>
          </div>

          <div className="teacher">
            <label htmlFor="student">Teacher</label>
            <input type="checkbox" name="teacher" id="teacher" value={this.state.teacher} onChange={this.handleTeacherChange}/>
          </div>
          
          <div className="campus">
            <label htmlFor="campus">Campus: </label>
            <select name="campus" id="campus" onChange={this.handleCampusChange} value={this.state.campus}>
              <option value="All">All</option>
              <option value="Berlin">Berlin</option>
              <option value="Lisbon">Lisbon</option>
              <option value="Paris">Paris</option>
            </select>
          </div>
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Campus</th>
                <th>Role</th>
                <th>Links</th>
              </tr>
            </thead>
            <tbody>
              {userList}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

