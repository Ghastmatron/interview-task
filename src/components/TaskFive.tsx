//Task at hand
//A service desk manager wants a high-level view of key data including number of tickets by priority, type, status and satisfaction_rating

//start with imports
import React, {useEffect} from 'react';//React
import axios from 'axios';//is a promise based HTTP client, used for making requests to API
import { SampleData } from '../api/types';// TypeScript type that defines structure of the data returned

//need the dataURL. This is also used to specify the number of data points
const DATA_URL = '/api/data';

//need to create the function to fetch the data from the API
async function fetchData() {
    const {data} = await axios.get<SampleData>(DATA_URL);
    return data;
}

const TaskFive: React.FC = () => {
    //get tickets
    const [tickets, setTickets] = React.useState<SampleData['results']>([]);

    //useEffect to fetch data when the component mounts
    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/todos/1')
            .then(response => console.log(response))
            .catch(error => console.error('Test request error:', error));//error handling
    }, []);

    //useEffect to fetch and set tickets data
    useEffect(() => {
        fetchData().then(data => {
            console.log('Setting tickets:', data); //debugging output
            setTickets(data.results);
        })
    }, []);

    return (
        <div>
            <h2>Tickets of Key Data</h2>
            <p>Total Tickets: {tickets.length}</p>
            <table className="min-w-full bg-white">
                <thead>
                <tr>
                    <th className="py-2">Priority</th>
                    <th className="py-2">Type</th>
                    <th className="py-2">Status</th>
                    <th className="py-2">Satisfaction Rating</th>
                </tr>
                </thead>
                <tbody>
                {tickets.map((ticket, index) => (
                    <tr key={index}>
                        <td className="border px-4 py-2">{ticket.priority}</td>
                        <td className="border px-4 py-2">{ticket.type}</td>
                        <td className="border px-4 py-2">{ticket.status}</td>
                        <td className="border px-4 py-2">{ticket.satisfaction_rating.score}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default TaskFive;
