//start with imports
import React, {useEffect} from 'react';//React
import axios from 'axios';//is a promise based HTTP client, used for making requests to API
import { SampleData } from '../api/types';// TypeScript type that defines structure of the data returned

//need the dataURL. This is also used to specify the number of data points
const DATA_URL = '/api/data?limit=500';

//need to create the function to fetch the data from the API
async function fetchData() {
    const {data} = await axios.get<SampleData>(DATA_URL);
    return data;
}

async function calculatePriorityIssues(){
    //fetch data using fetchData
    const data = await fetchData();
    //calculate total number of priorities
    const total = data.results.length;
    //accumulate each type of priority
    const typeCounts = data.results.reduce((acc, issue) => {
        acc[issue.priority] = (acc[issue.priority] || 0) + 1;
        return acc
    }, {} as Record<string, number>);//typescript - key value pairs

    //typeCounts into an array of key value pairs
    const percentages = Object.entries(typeCounts).map(([priority, count]) => ({
        priority,
        percentage: (count / total) * 100,//puts into percentage
    }))
    return percentages
}

//function to calculate the percentage of priority type
const TaskTwo: React.FC = () => {
    const [percentages, setPercentages] = React.useState<{ priority: string; percentage: number}[]>([]);

    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/todos/1')
            .then(response => console.log(response))
            .catch(error => console.error('Test request error:', error));
    }, []);

    useEffect(() => {
        calculatePriorityIssues().then(data => {
            console.log('Setting Percentages:', data); //debugging output
            setPercentages(data)
        })
    }, []);

    return(
        <div>
            <h2>Priority Type Percentages</h2>
            <ul>
                {percentages.map((item, index) => (
                    <li key={index}>{item.priority}: {item.percentage.toFixed(2)}%</li>
                ))}
            </ul>
        </div>
    );
};

export default TaskTwo;
