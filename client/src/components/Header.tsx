import React from 'react'
import { NavLink } from 'react-router-dom'




const Header = () => {

    return (<ul className="header">
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/login">Login</NavLink></li>


        {/* {!loggedIn ? (<LogIn login={login} />) :
            (<>
                {user.roles.split(',').includes('admin') ? 
                    (<>
                    <li><NavLink to="/admin">Admin Oversigt</NavLink></li>
                    <li><NavLink to="/newhouse">Opret nyt hus</NavLink></li>
                    <li><NavLink to="/newrental">Opret ny lejeaftale</NavLink></li>
                    <li><NavLink to="/allrentalsadmin">Se alle lejeaftaler</NavLink></li>
                    </>)
                    
                    : (<>
                    <li><NavLink to="/user">Bruger Oversigt</NavLink></li>
                    <li><NavLink to="/allrentalsuser">Se alle lejeaftaler</NavLink></li>
                    
                </>)}
                <div className='mx-4 mt-2' style={{float: 'right'}}><LoggedIn user={user} logout={logout} /></div>
                
            </>)} */}
    </ul>
    )
}

export default Header;