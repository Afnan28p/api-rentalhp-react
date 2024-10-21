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
            <NavLink to='/rentals/create' className="btn btn-primary my-4">
                Tambah
            </NavLink>

            <table className="table table-success table-striped-columns">
                <thead>
                    <tr>
                        <th scope="col">Nama Pelanggan</th>
                        <th scope="col">Nama Perangkat</th>
                        <th scope="col">Tanggal Mulai</th>
                        <th scope="col">Tanggal Selesai</th>
                        <th scope="col">Total Harga</th>
                        <th scope="col">Status Pembayaran</th>
                        <th scope="col">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        rental.map((data) => {
                            return (
                                <tr key={data.id}>
                                    <td>{data.name}</td>
                                    <td>{data.devices.nama}</td>
                                    <td>{data.tanggal_mulai}</td>
                                    <td>{data.tanggal_selesai}</td>
                                    <td>{data.total_harga}</td>
                                    <td>{data.status}</td>
                                    <td>
                                        <NavLink to={`/rentals/edit/${data.id}`} className="btn btn-warning">
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