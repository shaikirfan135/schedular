import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {


    return (
        <div>
            <ul className='nav-ul'>
                <li><Link to="/">Job Details</Link></li>
                {/* <li><Link to="/add">Add Product</Link></li> */}
            </ul>
        </div>
    );
}

export default Nav;