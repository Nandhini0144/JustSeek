import {Link} from 'react-router-dom'
const Header=()=>{
   return(
     
        <nav id="navigation">
            <div>
            <span>
             Logo
            </span>
            </div>
            <div id="head2">
            <span>
                <Link to="/" className="Lin">Jobs</Link>
            </span>
            <span>
                <Link to="/login" className="Lin">Login</Link>
            </span>
            <span>
                <Link to="/register" className='Lin'>Register</Link>
            </span>
            </div>
        </nav>
   
   )
}
export default Header;