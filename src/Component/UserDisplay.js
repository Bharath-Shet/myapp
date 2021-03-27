import React from 'react';
import Header from './Header';

const UserDisplay = (props) => {
    const renderUser = ({userData}) => {
        if(userData){
            return userData.map((item,index) => {
                return(
                    <tr>
                        <td>{index}</td>
                        <td>{item.fname}</td>
                        <td>{item.email}</td>
                        <td>{item.phone}</td>
                        <td>{item.dob}</td>
                        <td>{item.role}</td>
                    </tr>
                )
            })
        }
    }
    return(
        <>
        <Header/>
            <div>
                <center>
                    <h2>List Of Users</h2>
                </center>
                <div className="table-responsive">
                    <table className="table table-striped table-hover">
                        <thead className="thead-dark">
                            <tr>
                                <th>Sno</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone Number</th>
                                <th>Date of birth</th>
                                <th>Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderUser(props)}
                        </tbody>

                    </table>
                </div>
            </div>
        </>
    )
}



export default UserDisplay;