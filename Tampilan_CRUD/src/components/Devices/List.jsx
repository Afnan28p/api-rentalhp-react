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
            <h2>List Rentals</h2>
            <NavLink to='/devices/create' className="btn btn-primary my-4">
                Tambah
            </NavLink>

            <table className="table table-success table-striped-columns">
                <thead>
                    <tr>
                        <th scope="col">Nama Device</th>
                        <th scope="col">Merek Device</th>
                        <th scope="col">Tipe Device</th>
                        <th scope="col">Harga Sewa per Hari</th>
                        <th scope="col">Stock</th>
                        <th scope="col">Status</th>
                        <th scope="col">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        devices.map((data) => {
                            return (
                                <tr key={data.id}>
                                    <td>{data.nama}</td>
                                    <td>{data.merek_device}</td>
                                    <td>{data.tipe_device}</td>
                                    <td>{data.harga_sewa_per_hari}</td>
                                    <td>{data.stock}</td>
                                    <td>{data.status}</td>
                                    <td>
                                        <NavLink to={`/devices/edit/${data.id}`} className="btn btn-warning">
                                            Edit
                                        </NavLink>
                                    </td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
        </div>

    )
}