import React, { useState } from "react";
import { Button, Col, Input, InputGroup, InputGroupText, Row, Form, FormGroup, Label } from "reactstrap";
import { useAuth } from "./AuthProvider";
import { useNavigate } from "react-router";
import '../stylesheet/loginAndSignUp.css';
import { Link } from "react-router-dom";
import axios from "axios";
import { UrlSignUp } from '../endpoint';
import { useUser } from "./userContext";

const Login = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const { login } = useAuth();
    const {setUsername} = useUser();
    const navigate = useNavigate();
    const [passwordError, setPasswordError] = useState('');

    const validatePassword = (password: string) => {
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    };


    const HandleClick = async (e : any) => {
        e.preventDefault();

        if (!name || !email || !password) {
            return alert("Please input all the fields");
        }

        if (!validatePassword(password)){
           return setPasswordError("Password must contain at least one capital letter, one special character, and one number")
        }

        const payload = {
            name: name,
            email: email,
            password: password
        };

        console.log("Payload:", payload);

        try {
            const response = await axios.post(UrlSignUp, payload, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log("Response:", response);
            alert("Account created");
            login();
            setUsername(name);
            navigate(`/Home/${name}`);
        } catch (err : any) {
            console.error("Error:", err);
            if (err.response) {
                console.error("Server Response:", err.response.data);
                alert(`Error creating account: ${JSON.stringify(err.response.data.errors)}`);
            } else {
                alert("Error creating account: " + err.toString());
            }
        }
    };

    return (
        <div className="signUp">
            <Form onSubmit={HandleClick}>
                <FormGroup>
                    <Row>
                        <Col>
                            <InputGroup>
                                <InputGroupText>User Name</InputGroupText>
                                <Input
                                    name="username"
                                    onChange={(e) => setName(e.target.value)}
                                    value={name}
                                    type="text"
                                    required
                                />
                            </InputGroup>
                        </Col>
                    </Row>
                </FormGroup>
                <FormGroup>
                    <Row>
                        <Col>
                            <InputGroup>
                                <InputGroupText>Email</InputGroupText>
                                <Input
                                    name="email"
                                    value={email}
                                    type="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </InputGroup>
                        </Col>
                    </Row>
                </FormGroup>
                <FormGroup>
                    <Row>
                        <Col>
                            <InputGroup>
                                <InputGroupText>Password</InputGroupText>
                                <Input 
                                    name="password"
                                    value={password} 
                                    type={showPassword ? "text":"password"}
                                    onChange={(e) => {
                                        setPassword(e.target.value)
                                        setPasswordError('');}
                                    }
                                    required
                                />
                            </InputGroup>
                            {passwordError && <div className="error">{passwordError}</div>}
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col>
                            <FormGroup check>
                                <Label check>
                                    <Input type="checkbox" onChange={(e:any) => setShowPassword(!showPassword)} />{' '}
                                    Show Password
                                </Label>
                            </FormGroup>
                        </Col>
                    </Row>
                    </FormGroup>
                <FormGroup>
                    <Row>
                        <Col>
                            <Button type="submit">Sign Up</Button>
                            <div className="custom-div">
                                <p className="custom-p">Already have an account? <Link to='/login'>login</Link></p>
                            </div>
                        </Col>
                    </Row>
                </FormGroup>
            </Form>
        </div>
    );
};

export default Login;
