import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'

const Navigation = () => {

    const [open, setOpen] = useState("");
   
    const auth = useSelector((state) => state.auth.authenticate);

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const openMenu = () => {
        if(open == "open"){
            setOpen("");
        } else {
            setOpen("open");
        }
    }

  return (
    <div>
        <header className="header">
            <div className="inner inner--header">
                <h1><Link to={"/"} className='logo' onClick={() => setOpen("")}></Link></h1>
                <div className='headerBtns'>
                    <div className='loginBtn' onClick={() => {auth == true ? dispatch({type: "LOGIN__FAIL"}) : navigate("/login"); setOpen("")}}>{auth ? "로그아웃" : "로그인"}</div>
                    <div className={"menuBtn " + open} onClick={() => openMenu()}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
                <div className={'navWrap ' + open}>
                    <ul className="menuList">
                        <li className="menuList__li">
                            <Link to={"/members"} className="menuList__li__link" onClick={() => setOpen("")}>Members</Link>
                        </li>
                        {
                            auth && (
                                <li className="menuList__li">
                                    <Link to={"/entry"} className="menuList__li__link" onClick={() => setOpen("")}>Entry</Link>
                                </li>
                            )
                        }
                        
                    </ul>
                </div>
            </div>
        </header>
    </div>
  )
}

export default Navigation