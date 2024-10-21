import React, { useState } from 'react';
import axios from 'axios';

export default function CreateDevices() {
    const [namaDevice, setNamaDevice] = useState('');
    const [merekDevice, setMerekDevice] = useState(''); 
    const [tipeDevice, setTipeDevice ] = useState('');
    const [hargaSewaPerHari, setHargaSewaPerHari] = useState('');
    const [stockDevice,setStockDevice] = useState('');
    const [status, setStatus] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!namaDevice || !merekDevice || !tipeDevice || !hargaSewaPerHari || !stockDevice || !status) {
            setError('All fields are required');
            return;
        }

        try {
            const response = await axios.post(
                'https://api-rentalhp.vercel.app/api/api/devices',
                {
                    nama: namaDevice,
                    merek_device: merekDevice,
                    tipe_device: tipeDevice,
                    harga_sewa_per_hari: hargaSewaPerHari,
                    stock: stockDevice,  
                    status: status
                }
            );

            if (response.status === 201) {
                setSuccess('Device created successfully');
                setNamaDevice('');
                setMerekDevice('');
                setHargaSewaPerHari('');
                setStatus('');
            } else {
                setError('Failed to create device');
            }
        } catch (error) {
            setError('An error occurred while creating device');
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Create Device</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="namaDevice" className="form-label">
                        Nama Device
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="namaDevice"
                        value={namaDevice}
                        onChange={(e) => setNamaDevice(e.target.value)}
                        placeholder="Masukan Nama Device"
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="merekDevice" className="form-label">
                        Merek Device
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="merekDevice"
                        value={merekDevice}
                        onChange={(e) => setMerekDevice(e.target.value)}
                        placeholder="Masukan Merek Device"
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="tipeDevice" className="form-label">
                        Tipe Device
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="tipeDevice"
                        value={tipeDevice}
                        onChange={(e) => setTipeDevice(e.target.value)}
                        placeholder="Masukan Merek Device"
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="hargaSewaPerHari" className="form-label">
                        Harga Sewa per Hari
                    </label>
                    <input
                        type="number"
                        className="form-control"
                        id="hargaSewaPerHari"
                        value={hargaSewaPerHari}
                        onChange={(e) => setHargaSewaPerHari(e.target.value)}
                        placeholder="Masukan Harga Sewa per Hari"
                    />
                </div>
                
                <div className="mb-3">
                    <label htmlFor="stockDevice" className="form-label">
                        Stock Device
                    </label>
                    <input
                        type="number"
                        className="form-control"
                        id="stockDevice"
                        value={stockDevice}
                        onChange={(e) => setStockDevice(e.target.value)}
                        placeholder="Masukan Harga Sewa per Hari"
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="status" className="form-label">
                        Status
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        placeholder="Masukan Status"
                    />
                </div>

                <button type="submit" className="btn btn-primary">
                    Create
                </button>
            </form>
        </div>
    );
}
