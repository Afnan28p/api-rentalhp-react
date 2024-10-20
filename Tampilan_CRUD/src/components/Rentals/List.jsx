import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { NavLink } from 'react-router-dom'

export default function List() {
    const [rental, setRental] = useState([])

    useEffect(() => {
        axios.get('https://api-rentalhp.vercel.app/api/api/rentals')
        .then(responses =>{ 
            console.log(responses.data.result)
            setRental(responses.data.result)
        })
        .catch(error => {
            console.log('Error : ',error)
        })
    }, [])

    useEffect(() => {
        axios.get('https://api-rentalhp.vercel.app/api/api/devices')
        .then(responses =>{ 
            console.log(responses.data.result)
            setDevices(responses.data.result)
        })
        .catch(error => {
            console.log('Error : ',error)
        })
    }, [])

    return (
        <div>
            <h2>List Rentals</h2>
            <NavLink to='/rental/create' className="btn btn-primary my-4">
                Tambah
            </NavLink>

            <ul className="list-group">
                {
              <table class="table table-success table-striped-columns">
                <thead>
                    <tr>
                    <th scope="col">Nama</th>
                        <th scope="col">Fakultas</th>
                        <th>#</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        rental.map((data) => {
                            return (
                                <tr>
                                    <td>{data.name}</td>
                                    <td>{data.devices.nama}</td>
                                    <td>
                                        <NavLink to={`/rental/edit/${data.id}`} className = "btn btn-warning">
                                             Edit
                                        </NavLink>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
                }
            </ul>
        </div>
    )
}