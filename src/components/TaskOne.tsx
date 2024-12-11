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

async function calculateIssueTypePercentages() {
    //fetch data using fetchData
    const data = await fetchData();
    //calulate total number of issues
    const total = data.results.length;
    //accumulate the amount of each issue
    //reduce iterates for each issue in data.results
    //if there is already an issue type, increments by one, if not, intialises to 1
    const typeCounts = data.results.reduce((acc, issue) => {
        acc[issue.type] = (acc[issue.type] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);//TypeScript. acc object needs to have strings as keys and values as numbers

    //typeCounts into an array of key Value pairs,
    const percentages = Object.entries(typeCounts).map(([type, count]) => ({
        type,
        percentage: (count / total) * 100,//puts into percentage
    }));

    return percentages;
}

//Function to calculate the percentage of each issue type

const TaskOne: React.FC = () => {
    const [percentages, setPercentages] = React.useState<{ type: string; percentage: number }[]>([]);

    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/todos/1')
            .then(response => console.log(response))
            .catch(error => console.error('Test request error:', error));
    }, []);

    useEffect(() => {
        calculateIssueTypePercentages().then(data => {
            console.log('Setting percentages:', data); //debugging output
            setPercentages(data);
        }).catch(error => {
            console.error('An error occured:', error.message);//error handling
            if (error.response){
                //the server responded with a status code that falls out of the range of 2xx
                console.error('Status:', error.response.status);
                console.error('Data:', error.response.data);
            }else if (error.request){
                //request was made but no response was received
                console.error('Request:', error.request);
            }else {
                //something happened in setting up the request that triggered an error
                console.error('Error:', error.message);
            }
        });
    }, []);

    return(
        <div>
            <h2>Issue Type Percentages</h2>
            <ul>
                {percentages.map((item, index) => (
                    <li key={index}>{item.type}: {item.percentage.toFixed(2)}%</li>
                ))}
            </ul>
        </div>
    );
};

export default TaskOne;


