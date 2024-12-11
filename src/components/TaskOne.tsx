//start with imports
import axios from 'axios';//is a promise based HTTP client, used for making requests to API
import { SampleData } from '../api/types';// TypeScript type that defines structure of the data returned

//need the dataURL. This is also used to specify the number of data points
const DATA_URL = 'https://sampleapi.sqauredup.com/integrations/v1/service-desk?datapoints=500';

//need to create the fucntion to fetch the data from the API
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

calculateIssueTypePercentages().then(console.log);
export default class TaskOne {
}
