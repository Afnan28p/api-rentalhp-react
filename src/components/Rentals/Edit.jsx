import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditRental() {
    const { id } = useParams(); // Get rental ID from URL
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [deviceId, setDeviceId] = useState('');
    const [tanggalMulai, setTanggalMulai] = useState('');
    const [tanggalSelesai, setTanggalSelesai] = useState('');
    const [devices, setDevices] = useState([]);
    const [totalHarga, setTotalHarga] = useState(0);
    const [status, setStatus] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Fetch list of devices and current rental data
    useEffect(() => {
        axios.get('https://api-rentalhp.vercel.app/api/api/devices')
            .then(response => {
                setDevices(response.data.result);
            })
            .catch(error => {
                console.log('Error :', error);
                setError('Error fetching devices.');
            });

        axios.get(`https://api-rentalhp.vercel.app/api/api/rentals/${id}`)
            .then(response => {
                const rental = response.data.result;
                setName(rental.name);
                setDeviceId(rental.device_id);
                setTanggalMulai(rental.tanggal_mulai);
                setTanggalSelesai(rental.tanggal_selesai);
                setTotalHarga(rental.total_harga);
                setStatus(rental.status);
            })
            .catch(error => {
                console.log('Error fetching rental:', error);
                setError('Error fetching rental data.');
            });
    }, [id]);

    // Recalculate total price whenever device, start date, or end date changes
    useEffect(() => {
        if (deviceId && tanggalMulai && tanggalSelesai) {
            const selectedDevice = devices.find(device => device.id === deviceId);
            const mulai = new Date(tanggalMulai);
            const selesai = new Date(tanggalSelesai);
            const diffTime = Math.abs(selesai - mulai);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            if (selectedDevice) {
                setTotalHarga(diffDays * selectedDevice.harga_sewa_per_hari);
            }
        }
    }, [deviceId, tanggalMulai, tanggalSelesai, devices]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (name.trim() === '' || status === '') {
            setError('Please fill all fields except device and dates.');
            return;
        }

        try {
            const response = await axios.patch(`https://api-rentalhp.vercel.app/api/api/rentals/${id}`, {
                name,
                device_id: deviceId || undefined, // Send deviceId only if it's provided
                tanggal_mulai: tanggalMulai || undefined, // Send tanggalMulai only if it's provided
                tanggal_selesai: tanggalSelesai || undefined, // Send tanggalSelesai only if it's provided
                total_harga: totalHarga, // Send the updated totalHarga
                status,
            });

            if (response.status === 200) {
                setSuccess('Rental updated successfully.');
                navigate('/rentals'); // Redirect back to the list page
            } else {
                setError('Failed to update rental.');
            }
        } catch (error) {
            setError('An error occurred while updating rental.');
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Edit Rental</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                        Nama Pelanggan
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Masukan Nama Pelanggan"
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="deviceId" className="form-label">
                        Pilih Perangkat
                    </label>
                    <select
                        className="form-select"
                        id="deviceId"
                        value={deviceId}
                        onChange={(e) => setDeviceId(e.target.value)}
                    >
                        <option value="">Pilih Perangkat</option>
                        {devices.map(device => (
                            <option key={device.id} value={device.id}>
                                {device.nama} - {device.harga_sewa_per_hari} / hari
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="tanggalMulai" className="form-label">
                        Tanggal Mulai
                    </label>
                    <input
                        type="date"
                        className="form-control"
                        id="tanggalMulai"
                        value={tanggalMulai}
                        onChange={(e) => setTanggalMulai(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="tanggalSelesai" className="form-label">
                        Tanggal Selesai
                    </label>
                    <input
                        type="date"
                        className="form-control"
                        id="tanggalSelesai"
                        value={tanggalSelesai}
                        onChange={(e) => setTanggalSelesai(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="totalHarga" className="form-label">
                        Total Harga
                    </label>
                    <input
                        type="number"
                        className="form-control"
                        id="totalHarga"
                        value={totalHarga}
                        readOnly
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="status" className="form-label">
                        Status Pembayaran
                    </label>
                    <select
                        className="form-select"
                        id="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="">Pilih Status</option>
                        <option value="Lunas">Lunas</option>
                        <option value="Belum Lunas">Belum Lunas</option>
                    </select>
                </div>

                <button type="submit" className="btn btn-primary">
                    Update
                </button>
            </form>
        </div>
    );
}
