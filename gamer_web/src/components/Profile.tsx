import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Button, ButtonToolbar, Col, Form, FormGroup, Input, InputGroup, InputGroupText, Row } from "reactstrap";
import { UrlGetProfilePic, UrlGetUserByName, UrlUpdateUser } from "../endpoint";
import '../stylesheet/profile.css'
import { useUser } from "./userContext";
import { Link } from "react-router-dom";


const Profile = () => {
    
    const [NewName, setNewName] = useState();
    const [NewEmail, setNewEmail] = useState();
    const {name}: any = useParams();
    const [rowId, setRowId] = useState();
    //const [ProfileImage, setProfileImage] = useState<string | undefined>();
    const [ProfileImageFile, setProfileImageFile] = useState<File | null>(null);
    const [message, setMessage] = useState<string>();
    const navigate = useNavigate();
    const {profileImage, setProfileImage} = useUser();
    const [image, setImage] = useState<string>('');

    const fetchData = async () => {
        const response = await axios.get(`${UrlGetUserByName}/${name}`);
        if (response){
            if (response.data){
                setNewEmail(response.data.email);
                setNewName(name);
                setRowId(response.data.rowKey);
                //setProfileImage(GetPicUrl());
            }
        }
        else {
            console.error();
        }
    }
    //console.log("Row number", rowId);
    useEffect(()=> {
        fetchData();
    }, [])

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
          const file = event.target.files[0];
          setProfileImageFile(file);
          const reader = new FileReader();
          reader.onload = (e) => {
            setImage(e.target?.result as string);
          };
          reader.readAsDataURL(file);
        }
      };


    const HandleSubmit = async (e : any) => {
        e.preventDefault();
        if (!NewName || !NewEmail){
            return alert("Please input the field");
        }

        const formData = new FormData();
        formData.append("name", NewName);
        formData.append("email", NewEmail);
        formData.append("rowKey", rowId!);
        if (ProfileImageFile) {
            formData.append("picuture", ProfileImageFile);
        }

        try {
            const response = await axios.post(UrlUpdateUser, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log("Updated", response.data);
            setMessage("Updated");
            setProfileImage(image)
            //window.location.reload();
        } catch (err) {
            console.error(err);
        }
    }

    const GetPicUrl = () => {
        console.log("Name", name);
        if (name === ''){
            return "";
        }
        const url = `${UrlGetProfilePic}/${name}`;
        return url;
    }


    return ( 
    <div className="profile-div">
        <Form onSubmit={HandleSubmit}>
            <FormGroup>
                <Row>
                    <Col>
                        <div className="avatar">
                        <img src={GetPicUrl() && image || profileImage || GetPicUrl() } alt="Profile" className="avatar-image" />
                        <input type="file" accept="image/*" onChange={handleImageChange}/>
                        </div>
                    </Col>
                </Row>
            </FormGroup>
            <FormGroup>
                <Row>
                    <Col>
                        <InputGroup>
                            <InputGroupText>User Name</InputGroupText>
                            <Input 
                            value={NewName}
                            type="text"
                            onChange={(e: any) => setNewName(e.target.value)}>
                            </Input>
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
                            value={NewEmail}
                            type="email"
                            onChange={(e : any) => setNewEmail(e.target.value)}>
                            </Input>
                        </InputGroup>
                    </Col>
                </Row>
            </FormGroup>
            <FormGroup>
                <Row>
                    <Col>
                        <Button type="submit">Save</Button>
                        <p>{message}</p>
                        <div className="custom-div">
                                <p className="custom-p">Change <Link to={`/password/${rowId}`}>Password</Link></p>
                        </div>
                    </Col>
                </Row>
            </FormGroup>
        </Form>
    </div> );
}
 
export default Profile;