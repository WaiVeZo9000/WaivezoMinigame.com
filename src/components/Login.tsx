import { useState } from "react";
import { Button, Col, Form, FormGroup, Input, InputGroup, InputGroupText, Label, Row } from "reactstrap";
import { useAuth } from "./AuthProvider";
import { useNavigate } from "react-router";
import '../stylesheet/loginAndSignUp.css'
import { Link } from "react-router-dom";
import axios from "axios";
import { UrlLoginCheck } from "../endpoint";
import { useUser } from "./userContext";

const SignUp = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState(false);
    const {login} = useAuth();
    const {setUsername} = useUser();
    const navigate = useNavigate();

    const HandleClick = async (e:any) => {
        e.preventDefault();
        if (!email || !password){
            return alert("Please input the field");
        }

        const respone = await axios.get(`${UrlLoginCheck}/${email}`);
        console.log(respone.data)
        if (respone){
            if (respone.data){
                if (respone.data.password === password){
                    alert("Login");
                    login();
                    setUsername(respone.data.name);
                    console.log("username", respone.data.name);
                    navigate(`/Home/${respone.data.name}`);
                }
                else {
                    alert("Wrong password")
                }
            }
        }
        else {
            return alert("email is wrong");
        }
        
    }


    return ( 
        <div className="login">
            <Form onSubmit={HandleClick}>
                <FormGroup>
                    <Row>
                        <Col>
                            <InputGroup>
                                <InputGroupText>Email</InputGroupText>
                                <Input 
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    type="email"
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
                                    onChange={(e) => setPassword(e.target.value)}
                                    type={showPassword ? "text" : "password"}
                                    required
                                />
                            </InputGroup>
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
                            <Button type="submit">Login</Button>
                            <div className="custom-div">
                                <p className="custom-p">Create New Account? <Link to='/signUp'>Create</Link></p>
                            </div>
                        </Col>
                    </Row>
                </FormGroup>
            </Form>
        </div>
     );
}
 
export default SignUp;