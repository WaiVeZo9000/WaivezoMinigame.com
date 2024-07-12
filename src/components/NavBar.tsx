import { Link, useNavigate } from "react-router-dom";
import '../stylesheet/Navbar.css'
import React, { useEffect } from "react";
import { useUser } from "./userContext";
import { Button } from "reactstrap";
import { UrlGetProfilePic } from "../endpoint";

const NavBar= () => {

    const {username} = useUser();
    const navigate = useNavigate();
    const {profileImage} = useUser();

    const handleLogout = (e : any) => {
        e.preventDefault();
        const userConfirmed = window.confirm("Are you sure you want to log out?");
        if (userConfirmed) {
          window.location.reload();
        }
      };

      const GetPicUrl = () => {
        console.log("Name", username);
        if (username === ''){
            return "";
        }
        const url = `${UrlGetProfilePic}/${username}`;
        return url;
    }

    // useEffect(()=> {
    //   GetPicUrl();
    // }, [username]);

    return ( 
    <nav className="navbar">
    <h1>My Game</h1>
    <ul className="nav-links">
        <li><Link to={`/Home/${username}`}>Home</Link></li>
        <li><Link to={`/memoryGame/${username}`}>Memory Game</Link></li>
        <li><Link to={`/rps/${username}`}>Rock Paper Scissor</Link></li>
        <li><Link to={`/leaderBoard/${username}`}>leaderBoard</Link></li>
        <li><Link to={`/tictactoe/${username}`}>Tic Tac Toe</Link></li>
        <li><Link to={`/profile/${username}`}><img className="profile-img" src={username ? profileImage || GetPicUrl() :require('../img/defaultProfile.png')} alt="profile"></img></Link></li>
        <li><Button onClick={handleLogout}>Log Out</Button></li>
    </ul>
    </nav> );
}
 
export default NavBar;