import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import Swal from 'sweetalert2'; // Import SweetAlert2

export default function List() {
    const [rental, setRental] = useState([]);
    const [devices, setDevices] = useState([]);

    // Mengambil data rental
    useEffect(() => {
        axios.get('https://api-rentalhp.vercel.app/api/api/rentals')
            .then(responses => {
                console.log(responses.data.result);
                setRental(responses.data.result);
            })
            .catch(error => {
                console.log('Error : ', error);
            });
    }, []);

    // // Mengambil data devices
    // useEffect(() => {
    //     axios.get('https://api-rentalhp.vercel.app/api/api/devices')
    //         .then(responses => {
    //             console.log(responses.data.result);
    //             setDevices(responses.data.result);
    //         })
    //         .catch(error => {
    //             console.log('Error : ', error);
    //         });
    // }, []);

    // Fungsi untuk menghapus data rental berdasarkan ID
    const handleDelete = (id, name) => {
        Swal.fire({
            title: 'Are you sure?',
            text: `You won't be able to revert this! Rental for: ${name}`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`https://api-rentalhp.vercel.app/api/api/rentals/${id}`)
                    .then(response => {
                        // Menghapus data rental dari state setelah berhasil dihapus dari server
                        setRental(rental.filter((item) => item.id !== id));
                        Swal.fire('Deleted!', 'Your data has been deleted.', 'success');
                    })
                    .catch(error => {
                        console.log('Error deleting data:', error);
                        Swal.fire('Error', 'There was an issue deleting the data.', 'error');
                    });
            }
        });
    };

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
                    {rental.map((data) => {
                        return (
                            <tr key={data.id}>
                                <td>{data.name}</td>
                                <td>{data.devices.nama}</td>
                                <td>{data.tanggal_mulai}</td>
                                <td>{data.tanggal_selesai}</td>
                                <td>{data.total_harga}</td>
                                <td>{data.status}</td>
                                <td>
                                    <NavLink to={`/rentals/edit/${data.id}`} className="btn btn-warning mx-2">
                                        Edit
                                    </NavLink>
                                    <button
                                        onClick={() => handleDelete(data.id, data.name)}
                                        className="btn btn-danger"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
