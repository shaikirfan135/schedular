import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const JobDetailsList = () => {
    const [jobDetailsData, setJobDetailsData] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [selectedTable, setSelectedTable] = useState('');

    useEffect(() => {
        getJobDetails();

    }, [])

    const getJobDetails = async () => {
        let result = await fetch('http://localhost:5000/loadJobDetails');
        result = await result.json();
        setJobDetailsData(result);
    }

    const onSelectedTableChange = async (event) => {
        const tableSelcted = event.target.value;
        let result = await fetch(`http://localhost:5000/loadTableDetails/${tableSelcted}`);
        result = await result.json();
        // const userElements = [];
        // // for (let i = 0; i < result.length; i++) {
        // //     userElements.push(<p key={i}>{result[i]}</p>);
        // // }
        console.log('result : ', result)
        setTableData(result);
        setSelectedTable(tableSelcted);
        let result1 = await fetch('http://localhost:5000/loadJobDetails');
        result1 = await result1.json();
        setJobDetailsData(result1);
    };

    return (
        <div className='box'>

            <label htmlFor="country-select" className='selectedtable'>Select Table: </label>
            <select id="country-select" value={selectedTable} onChange={onSelectedTableChange}>
                <option value="">--Select a Table--</option>
                {jobDetailsData.map((job) => (<option key={job.tableName} value={job.tableName}>{job.tableName}</option>))}
            </select>

            <div className='selectedtable'>{selectedTable ? (<p>You selected: {selectedTable}</p>) : (<p>Please select a table.</p>)}</div>

            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Click Table to be Loaded</th>
                            <th>Click Table to be Loaded</th>
                            <th>Click Table to be Loaded</th>
                            {/* <th>S.No</th>
                            <th>Table Name</th>
                            <th>Selected Columns</th>
                            <th>Where Clause</th>
                            <th>Schema</th>
                            <th>Orderby</th>
                            <th>Sorted </th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            tableData.length > 0 ?
                                tableData.map((item, index) => (
                                    <tr key={index}>
                                        {Object.entries(item).map(([key, value]) => (
                                            <td>{renderValue(value)}</td>
                                        ))}
                                    </tr>
                                ))
                                : <tr><td colSpan={7}>No Result Found</td></tr>
                            }
                    </tbody>
                </table>
            </div>

        </div>
    )

    function renderValue(value) {
        if (value !== null && value !== undefined) {
            //console.log("value: ", value)
            if (Array.isArray(value)) {
                return (
                    <ul>
                        {value.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                );
            } else if (typeof value === 'object') {
                return (
                    <div>
                        {Object.entries(value).map(([key, nestedValue]) => (
                            <div key={key}>
                                <strong>{key}:</strong> {renderValue(nestedValue)}
                            </div>
                        ))}
                    </div>
                );
            } else {
                return <span>{value}</span>;
            }
        }
    }

}

export default JobDetailsList;