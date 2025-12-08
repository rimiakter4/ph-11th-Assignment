import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Page/Shared/NavBar/NavBar';
import Fotter from '../Page/Shared/Fotter/Fotter';

const RootLayOuts = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Fotter></Fotter>
        </div>
    );
};

export default RootLayOuts;