import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../stylesheet/Home.css'
import { Button } from "reactstrap";
import { useNavigate, useParams } from "react-router";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { UrlGetGameRate } from "../endpoint";
import Star from "./Star";

const Home = () => {

    console.log("hello")
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const {name}:any = useParams<{ name: string }>();
    const navigate = useNavigate();
    console.log("Name", name);

    const FetchData = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(UrlGetGameRate);
            setData(response.data);
        }
        catch (err){
            console.error(err);
        }
        setIsLoading(false);
    }
    //console.log(data);

    useEffect(() => {
        FetchData();
    }, []);

    const RenderList = (data: any) => {
        // Sort data by averageRating in descending order
        const sortedData = data.sort((a: any, b: any) => b.averageRating - a.averageRating);
 
        return (
            sortedData.map((item: any) => {

                let formattedName = item.name.toLowerCase().replace(/\s+/g, '');
                //console.log("Name", formattedName);
                if (formattedName === "rockpaperscissors"){
                    formattedName = "rps";
                }
                return(
                <ul key={item.gameId} className="game-list">
                    <li className="game-item">
                        <Button className="btn btn-primary btn-lg"
                            onClick={(e) => {
                                e.preventDefault();
                                navigate(`/${formattedName}/${name}`);
                            }}>{item.name}</Button>
                        <div className="rating">
                            {[1, 2, 3, 4, 5].map((i) => (
                            <Star
                            key={i}
                            selected={i <= Math.floor(item.averageRating)} // Full star if i is less than or equal to the integer part of averageRating
                            halfSelected={i === Math.ceil(item.averageRating) && item.averageRating % 1 !== 0} // Half star if i is the next integer above averageRating and there is a fractional part
                            />
                            ))}
                            <em>submitted by {item.numOfrate}</em>
                        </div>
                    </li>
                </ul>)
              })
        )
    }


    return ( 
    <body>    
        <div className="home-container">
        <h1>Welcome to My Mini Games, {name}</h1>
        {isLoading? <p><em>Loading...</em></p>: RenderList(data)}
        </div>
    </body>
 );
}
 
export default Home;


