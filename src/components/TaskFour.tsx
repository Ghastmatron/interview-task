// Task at hand
// A service desk operator wants to filter all the open issues of high priority

//start with imports
import React, {useEffect} from 'react';//React
import axios from 'axios';//is a promise based HTTP client, used for making requests to API
import { SampleData } from '../api/types';// TypeScript type that defines structure of the data returned

//need the dataURL.
const DATA_URL = '/api/data';

//need to create the function to fetch the data from the API
async function fetchData() {
    const {data} = await axios.get<SampleData>(DATA_URL);
    return data;
}

//need a function that filters the data by priority
async function filterDataByPriority(){
    //fetch data using fetchData
    const data = await fetchData();
    //filter the data by priority
    const filteredData = data.results.filter(issue => issue.priority === 'high' && issue.status === 'open');
    return filteredData;
}

//function to display the filtered data
const TaskFour: React.FC = () => {
    const [filteredData, setFilteredData] = React.useState<SampleData['results']>([]);
    const [highPriorityCount, setHighPriorityCount] = React.useState<number>(0);//0 is starting value

    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/todos/1')
            .then(response => console.log(response))
            .catch(error => console.error('Test request error:', error));//error handling
    }, []);

    useEffect(() => {
        filterDataByPriority().then(data => {
            console.log('Setting filtered data:', data); //debugging output
            setHighPriorityCount(data.length);
            setFilteredData(data);
        })
    }, []);

    return(
        <div>
            <h2>High Priority Open Issues</h2>
            <p>Total: {highPriorityCount}</p>
            <ul>
                {filteredData.map((issue, index) => (
                    <li key={index}> ID: {issue.id}, Type: {issue.type}</li>
                ))}
            </ul>
        </div>
    );
}

//export the function
export default TaskFour;
