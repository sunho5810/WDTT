import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const [id, setId] = useState("");
    const [pw, setPw] = useState("");
    const [loginDesc, setLoginDesc] = useState("");

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const loginFunc = (e) => {
        e.preventDefault();

        if(id === "wdtt" && pw === "1234"){
            dispatch({type: "LOGIN__SUCCESS"});
            navigate("/");
            setLoginDesc("");
        } else {
            setLoginDesc("아이디나 비밀번호를 확인해주세요");
        }
    }

  return (
    <div className='inner'>
        <Form className='loginForm' onSubmit={(e) => loginFunc(e)}>
            <Form.Group className="mb-3" controlId="formID">
                <Form.Label>아이디</Form.Label>
                <Form.Control type="text" placeholder="아이디를 입력하세요" onChange={(e) => setId(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPW">
                <Form.Label>비밀번호</Form.Label>
                <Form.Control type="password" placeholder="비밀번호를 입력하세요" onChange={(e) => setPw(e.target.value)}/>
            </Form.Group>
            <p className='loginDesc'>{loginDesc}</p>
            <Button variant="dark" type="submit">로그인</Button>
        </Form>
    </div>
  )
}

export default Login