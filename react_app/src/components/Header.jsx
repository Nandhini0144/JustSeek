import {Link} from 'react-router-dom'
import { useState,useEffect } from 'react';
import './Header.css';
import logo from '../logo.png'
const Header=()=>{
    const [scrolled, isScrolled] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 20) {
        isScrolled(true);
      } else {
        isScrolled(false);
      }
    });
    return () => {
      window.removeEventListener("scroll", () => {
        if (window.scrollY > 20) {
          isScrolled(true);
        } else {
          isScrolled(false);
        }
      });
    };
  }, [scrolled]);
   return(
     
    <nav id="navigation" className="fixed-header">
            <div>
            <span>
             <img src={logo} alt="Just Seek" style={{ width: '150px', height: '140px' }}/>
            </span>
            </div>
            <div id="head2">
            <span>
                <Link to="/" className='Lin'>Home</Link>
            </span>
            <span>
                <Link to="/jobs" className="Lin">Jobs</Link>
            </span>
            <span>
                <Link to="/login" className="Lin">Login</Link>
            </span> 
            <span>
                <Link to="/profile" className="Lin">Profile</Link>
            </span>
            </div>
        </nav>
   
   )
}
export default Header;