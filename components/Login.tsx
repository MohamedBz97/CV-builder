import React from 'react';
import { Link } from 'react-router-dom';

const Login: React.FC = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-neutral-100 p-4 font-sans">
            <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg text-center animate-fade-in-up">
                <h1 className="text-3xl font-black text-neutral-800 mb-2">CV LEGEND</h1>
                <p className="text-neutral-500 text-sm uppercase tracking-widest mb-6">Craft Your Legacy</p>
                <p className="text-neutral-600 mb-6">
                    No sign-in is required. You can access the resume builder directly.
                </p>
                <Link to="/" className="inline-block px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-blue-800 transition-colors shadow-lg shadow-primary/20">
                    Enter Platform
                </Link>
            </div>
        </div>
    );
};

export default Login;