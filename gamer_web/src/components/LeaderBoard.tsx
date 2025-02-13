import axios from "axios";
import React, { useEffect, useState } from "react";
import { UrlGetUserInfo } from "../endpoint";
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Table } from "reactstrap";

const LeaderBoard = () => {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [dataList, setDataList] = useState([]);
    //const [dropdownOpen, setDropdownOpen] = useState(false);
    const [sortCriterion, setSortCriterion] = useState("score");
    const [sortOrder , setSortOrder] = useState<"asc" | "des">("asc");


    const FetchData = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(UrlGetUserInfo);
            setDataList(response.data);
        }
        catch (err){
            console.error(err);
        }
        setIsLoading(false);
    }

    useEffect(() => {
        FetchData();
    }, [])

    //const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

    const handleSortChange = (criterion: string) => {
        const newSortOrder = sortCriterion === criterion && sortOrder === "des" ? "asc" : "des";
        setSortOrder(newSortOrder);
        setSortCriterion(criterion);
    };

    const renderTable = (data: any) => {
        const sortedData = data.sort((a: any, b: any) => {
            if (sortOrder === "asc") {
                return a[sortCriterion] - b[sortCriterion];
              } else {
                return b[sortCriterion] - a[sortCriterion];
              }
        });
        return (
            <Table className="table table-striped table-dark">
                <thead>
                    <tr>
                        <th>User Name</th>
                        <th onClick={() => handleSortChange("score")}>Score</th>
                        <th onClick={() => handleSortChange("memPoint")}>Card Game</th>
                        <th onClick={() => handleSortChange("rpsPoint")}>Rock Paper Scissor</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedData.map((item : any) => 
                        <tr key={item.rowKey}>
                            <td>{item.name}</td>
                            <td>{item.score}</td>
                            <td>{item.memPoint}</td>
                            <td>{item.rpsPoint}</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        )
    }

    return (
        <div>
        {isLoading ? <p><em>Loading...</em></p> : renderTable(dataList)}
        </div>
     );
}
 
export default LeaderBoard;

