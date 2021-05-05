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
    const name = [event.target.name];
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value

    this.setState({
      [name]: value 
    })
  }
  
  render() {
    const filteredUsers = users.filter(user => {
      return  user.firstName.toLowerCase().includes(this.state.search.toLowerCase) || user.lastName.toLowerCase().includes(this.state.search.toLocaleLowerCase())
              && (this.state.student ? user.role === 'student' : true)
              && (this.state.teacher ? user.role === 'teacher' : true)
              && (this.state.campus !== 'All' ? user.campus === this.state.campus : true)
    })

    const userList = filteredUsers.map(user => (
      <tr key={uuidv4()}>
        <td>{user.firstName}</td>
        <td>{user.lastName}</td>
        <td>{user.campus}</td>
        <td>{user.role}</td>
        {user.linkedin && <td><a href={user.linkedin}><img style={{height: '13px'}} src="./linkedin.png" alt=""/></a></td>}
      </tr>
    ))

    return (
      <div className="main-container">
        <h1>Ironbook</h1>
        <input type="text" name="search" id="search" value={this.state.search} onChange={this.handleChange} placeholder="Search by name"/>
        <div className="filter">
          <div className="student">
            <label htmlFor="student">Student</label>
            <input type="checkbox" name="student" id="student" value={this.state.student} onChange={this.handleChange}/>
          </div>

          <div className="teacher">
            <label htmlFor="student">Teacher</label>
            <input type="checkbox" name="teacher" id="teacher" value={this.state.teacher} onChange={this.handleChange}/>
          </div>
          
          <div className="campus">
            <label htmlFor="campus">Campus: </label>
            <select name="campus" id="campus" onChange={this.handleChange} value={this.state.campus}>
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

