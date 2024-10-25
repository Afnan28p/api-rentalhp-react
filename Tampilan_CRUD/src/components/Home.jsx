import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div>
            {/* Header Section */}
            <header className="bg-primary text-white text-center py-5">
                <h1>Welcome to Rental HP</h1>
                <p>Your go-to platform for renting mobile devices easily!</p>
            </header>

            {/* Main Content Section */}
            <div className="container my-5">
                <h2 className="text-center mb-4">Why Choose Us?</h2>
                <div className="row">
                    <div className="col-md-4 text-center">
                        <h3>Variety of Devices</h3>
                        <p>We offer a wide range of mobile devices for rent, from budget models to the latest flagship phones.</p>
                    </div>
                    <div className="col-md-4 text-center">
                        <h3>Affordable Pricing</h3>
                        <p>Our rental plans are competitively priced, making it affordable for everyone to rent a phone.</p>
                    </div>
                    <div className="col-md-4 text-center">
                        <h3>Easy Process</h3>
                        <p>Our seamless online process makes it easy to rent devices with just a few clicks.</p>
                    </div>
                </div>

                {/* CTA Buttons */}
                <div className="text-center mt-5">
                    <Link to="/rentals" className="btn btn-primary mx-2">
                        View Rentals
                    </Link>
                    <Link to="/devices" className="btn btn-secondary mx-2">
                        Rent a Device
                    </Link>
                </div>
            </div>

            {/* Footer Section */}
            <footer className="bg-dark text-white text-center py-3">
                <p>&copy; 2024 Rental HP. All rights reserved.</p>
            </footer>
        </div>
    );
}
