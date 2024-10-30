import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function EditDevice() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [device, setDevice] = useState({
        nama: '',
        merek_device: '',
        tipe_device: '',
        harga_sewa_per_hari: '',
        stock: '',
        status: ''
    });
    const [error, setError] = useState('');

    useEffect(() => {
        axios.get(`https://api-rentalhp.vercel.app/api/api/devices/${id}`)
            .then((response) => {
                setDevice(response.data.result);
                
            })
            .catch((error) => {
                console.error("Error fetching device data:", error);
                setError("An error occurred while fetching device data.");
            });
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDevice((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.patch(`https://api-rentalhp.vercel.app/api/api/devices/${id}`, device)
            .then((response) => {
                navigate("/devices");
            })
            .catch((error) => {
                console.error("Error updating device:", error);
                setError("An error occurred while updating device.");
            });
    };

    return (
        <div>
            <h2>Edit Device</h2>
            {error && <p className="alert alert-danger">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="nama" className="form-label">Nama Device</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="nama"
                        name="nama"
                        value={device.nama}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="merek_device" className="form-label">Merek Device</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="merek_device"
                        name="merek_device"
                        value={device.merek_device}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="tipe_device" className="form-label">Tipe Device</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="tipe_device"
                        name="tipe_device"
                        value={device.tipe_device}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="harga_sewa_per_hari" className="form-label">Harga Sewa per Hari</label>
                    <input 
                        type="number" 
                        className="form-control" 
                        id="harga_sewa_per_hari"
                        name="harga_sewa_per_hari"
                        value={device.harga_sewa_per_hari}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="stock" className="form-label">Stock</label>
                    <input 
                        type="number" 
                        className="form-control" 
                        id="stock"
                        name="stock"
                        value={device.stock}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="status" className="form-label">Status</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="status"
                        name="status"
                        value={device.status}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary">Update Device</button>
            </form>
        </div>
    );
}
