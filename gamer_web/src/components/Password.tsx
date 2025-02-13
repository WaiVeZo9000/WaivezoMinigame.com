import axios from "axios";
import { useState } from "react";
import { Button, Col, Form, FormGroup, Input, InputGroup, InputGroupText, Label, Row } from "reactstrap";
import { UrlCheckPassword, UrlUpdatePassword } from "../endpoint";
import { useParams } from "react-router";

const PasswordChange = () => {

    const [password, setPassword] = useState();
    const [newPassword, setNewPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>(""); 
    const [correctPass, setCorrectPass] = useState(false);
    const [message, setMessage] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
    const {id}: any = useParams();

    console.log("Id", id);
    const CheckPassword = async () => {
        const response = await axios.get(`${UrlCheckPassword}/${id}`);
        if (response.data){
            console.log(response.data);
            if (response.data.password === password){
                setCorrectPass(true);
            }
        }
        else {
            setMessage("Wrong password");
            console.error();
        }  
    }   

    const HandlePassword = () => {
        console.log("password", newPassword);
        if (newPassword !== confirmPassword) {
            setMessage("Passwords do not match");
            return;
          }

        if (!validatePassword(newPassword)){
            return setMessage("Password must contain at least one capital letter, one special character, and one number")
        }
        
        axios.post(UrlUpdatePassword, {
            rowKey : id,
            password : newPassword
        }).then(res => {
            setMessage("success");
        }).catch(err => {
            console.error();
        })
    } 

    const validatePassword = (password: string) => {
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    };

    return ( 
        <div>
            <Form>
                <FormGroup>
                    <Row>
                        <Col>
                        <InputGroup>
                            <InputGroupText>Password</InputGroupText>
                            <Input 
                            value={password}
                            type={showPassword ? "text" : "password"}
                            onChange={(e : any) => setPassword(e.target.value)}>
                            </Input>
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
                            {correctPass?
                            <div>
                            <InputGroup>
                                <InputGroupText>New Password</InputGroupText>
                                <Input 
                                value={newPassword}
                                type={showNewPassword ? "text" : "password"}
                                onChange={(e:any) => setNewPassword(e.target.value)}></Input>
                            <Row className="mb-3">
                                <Col>
                                    <FormGroup check>
                                        <Label check>
                                            <Input type="checkbox" onChange={(e:any) => setShowNewPassword(!showNewPassword)} />{' '}
                                            Show Password
                                        </Label>
                                    </FormGroup>
                                </Col>
                            </Row>
                            </InputGroup> 
                            <InputGroup>
                                <InputGroupText>Confirm Password</InputGroupText>
                                <Input 
                                value={confirmPassword}
                                type={showConfirmPassword ? "text" : "password"}
                                onChange={(e:any) => setConfirmPassword(e.target.value)}></Input>
                                <Row className="mb-3">
                                    <Col>
                                        <FormGroup check>
                                            <Label check>
                                                <Input type="checkbox" onChange={(e:any) => setShowConfirmPassword(!showConfirmPassword)} />{' '}
                                                Show Password
                                            </Label>
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </InputGroup> 
                            <Button onClick={HandlePassword}>Submit</Button>
                            <p>{message}</p>
                            </div>: 
                            <div>
                                <Button onClick={CheckPassword}>Change</Button>
                                <p>{message}</p>
                            </div>
                            }
                        </Col>
                    </Row>
                </FormGroup>
            </Form>
        </div>
     );
}
 
export default PasswordChange;