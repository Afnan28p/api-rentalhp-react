import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function List() {
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    axios
      .get('https://api-rentalhp.vercel.app/api/api/devices')
      .then((responses) => {
        console.log(responses.data.result);
        setDevices(responses.data.result);
      })
      .catch((error) => {
        console.log('Error : ', error);
      });
  }, []);

  // Fungsi untuk menghapus device berdasarkan ID dengan konfirmasi SweetAlert2
  const handleDelete = (id, nama) => {
    Swal.fire({
      title: 'Are you sure?',
      text: `You won't be able to revert this! Device: ${nama}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        // Lakukan penghapusan jika dikonfirmasi
        axios
          .delete(`https://api-rentalhp.vercel.app/api/api/devices/${id}`)
          .then((response) => {
            // Hapus device dari state setelah sukses dihapus dari server
            setDevices(devices.filter((device) => device.id !== id));
            // Tampilkan notifikasi sukses
            Swal.fire('Deleted!', 'Your data has been deleted.', 'success');
          })
          .catch((error) => {
            console.error('Error deleting data:', error); // Menangani error
            Swal.fire('Error', 'There was an issue deleting the data.', 'error');
          });
      }
    });
  };

  return (
    <div>
      <h2>List Devices</h2>
      <NavLink to='/devices/create' className='btn btn-primary my-4'>
        Tambah
      </NavLink>

      <table className='table table-success table-striped-columns'>
        <thead>
          <tr>
            <th scope='col'>Nama Device</th>
            <th scope='col'>Merek Device</th>
            <th scope='col'>Tipe Device</th>
            <th scope='col'>Harga Sewa per Hari</th>
            <th scope='col'>Stock</th>
            <th scope='col'>Status</th>
            <th scope='col'>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {devices.map((data) => (
            <tr key={data.id}>
              <td>{data.nama}</td>
              <td>{data.merek_device}</td>
              <td>{data.tipe_device}</td>
              <td>{data.harga_sewa_per_hari}</td>
              <td>{data.stock}</td>
              <td>{data.status}</td>
              <td>
                <NavLink to={`/devices/edit/${data.id}`} className='btn btn-warning'>
                  Edit
                </NavLink>
                <button
                  onClick={() => handleDelete(data.id, data.nama)}
                  className='btn btn-danger ms-2'
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
