import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const JobDetailsList = () => {
    const [jobDetailsData, setJobDetailsData] = useState([]);

    useEffect(() => {
        getJobDetails();
        
    }, [])

    const getJobDetails = async () => {
        let result = await fetch('http://localhost:5000/loadJobDetails');
        result = await result.json();
        setJobDetailsData(result);
    }
    
    return (
        <div className='productList'>
            <h3>Schedular List</h3>
            <ul>
                <li>S.No</li>
                <li>Table Name</li>
                <li>Selected Columns</li>
                <li>Where Clause</li>
                <li>Schema</li>
                <li>Orderby</li>
                <li>Sorted </li>
            </ul>
            {
                jobDetailsData.length > 0 ? jobDetailsData.map((job, index) => 
                    <ul key={job._id}>
                        <li>{index+1}</li>
                        <li>{job.tableName}</li>
                        <li>{job.selectColumns}</li>
                        <li>{job.whereClause}</li>
                        <li>{job.schema}</li>
                        <li>{job.orderbyColumn}</li>
                        <li>{job.sortDirection}</li>
                    </ul>
                )
                : <h1>No Result Found</h1>
            }
        </div>
    )
    
}

export default JobDetailsList;