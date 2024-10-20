import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { NavLink } from 'react-router-dom'

export default function List() {
    const [devices, setDevices] = useState([])

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
            <h2>List Devices</h2>

            <NavLink to='/devices/create' className="btn btn-primary my-4">
                Tambah
            </NavLink>

            <ul className="list-group">
                {
                    devices.map((data) => {
                        return (
                            <li key={data.id} className='list-group-item'>
                                {data.nama}
                                <NavLink to={`/devices/edit/${data.id}`} className="btn btn-warning mx-2">
                                    Edit
                                </NavLink>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}