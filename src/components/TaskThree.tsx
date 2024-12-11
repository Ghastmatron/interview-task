//Task at hand
// A service desk operator wants to view a list of all issues of any type, sorted by priority (use sample of 100 data points)

//start with imports
import React, {useEffect} from 'react';//React
import axios from 'axios';//is a promise based HTTP client, used for making requests to API
import { SampleData } from '../api/types';// TypeScript type that defines structure of the data returned

//need the dataURL. This is also used to specify the number of data points
const DATA_URL = '/api/data?limit=100';

//need to create the function to fetch the data from the API
async function fetchData() {
    const {data} = await axios.get<SampleData>(DATA_URL);
    return data;
}

//need to change Priority to integers so we can compare their values to swap them
function PriorityToIntegers(priority: string){
    switch(priority){
        case 'low':
            return 1;
        case 'normal':
            return 2;
        case 'high':
            return 3;
        default:
            return 0;
    }
}

//need a function that sorts the data by priority
//first highest to lowest
async function sortDataByPriority_HighestToLowest(){
    //fetch data using fetchData
    const data = await fetchData();
    //sort the data by priority
    const sortedData = data.results.sort((a, b) => {
        if (PriorityToIntegers(a.priority) > PriorityToIntegers(b.priority)) return -1;
        if (PriorityToIntegers(a.priority) < PriorityToIntegers(b.priority)) return 1;
        return 0;
    });
    return sortedData;
}

//lowest to highest
async function sortDataByPriority_LowestToHighest(){
    //fetch data using fetchData
    const data = await fetchData();
    //sort the data by priority
    const sortedData = data.results.sort((a, b) => {
        if (PriorityToIntegers(a.priority) < PriorityToIntegers(b.priority)) return -1;
        if (PriorityToIntegers(a.priority) > PriorityToIntegers(b.priority)) return 1;
        return 0;
    });
    return sortedData;
}

//will allow the service desk user to view the sorted data in which way they like

//function to display the sorted data
const TaskThree: React.FC = () => {
    //make two buttons to allow the user to choose how they want to view the data
    const [sortedData, setSortedData] = React.useState<{priority: string; type: string}[]>([]);

    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/todos/1')
            .then(response => console.log(response))
            .catch(error => console.error('Test request error:', error));
    }, []);

    useEffect(() => {
        sortDataByPriority_HighestToLowest().then(data => {
            console.log('Setting Sorted Data:', data); //debugging output
            setSortedData(data);
        })
    }, []);

    //two buttons
    //one for lowest to highest
    //one for highest to lowest
    //within this section, the data will be displayed with a table, to make it clear to the user
    //the table will have two columns, one for priority and one for type

    return(
        <div>
            <h2 className={"mb-4 text-xl font-bold"}>Sort Data By Priority</h2>
            <div className={"mb-4 flex space-x-4"}>
                <button
                    onClick={() => sortDataByPriority_LowestToHighest().then(data => setSortedData(data))}
                    className={"hover:bg-gray-500 rounded bg-black px-4 py-2 text-white"}
                >
                    Lowest to Highest
                </button>
                <button
                    onClick={() => sortDataByPriority_HighestToLowest().then(data => setSortedData(data))}
                    className={"hover:bg-gray-500 rounded bg-gray-200 px-4 py-2 text-black"}
                >
                    Highest to Lowest
                </button>
            </div>
            <table className={"min-w-full bg-white"}>
                <thead>
                    <tr>
                        <th className={"py-2"}>Priority</th>
                        <th className={"py-2"}>Type</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedData.map((item, index) => (
                        <tr key={index}>
                            <td className={"border px-4 py-2"}>{item.priority}</td>
                            <td className={"border px-4 py-2"}>{item.type}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
//export the component
export default TaskThree;
