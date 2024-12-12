//imports
import axios from 'axios';//is a promise based HTTP client, used for making requests to API
import { SampleData } from '../api/types';// TypeScript type that defines structure of the data returned
//need the dataURL. This is also used to specify the number of data points
const DATA_URL = '/api/data';

//need to create the function to fetch the data from the API
async function fetchData() {
    const {data} = await axios.get<SampleData>(DATA_URL);
    return data;
}


async function giveDataNumbers(...attributes: string[]): Promise<Record<string, number>> {
    //give each attribute a number
    //for loop through array of attributes
    //any repeats get assigned the same number as the first instance
    const attributeNumbers: Record<string, number> = {};
    let currentNumber = 1;
    //iterate through each attribute
    for (const attribute of attributes) {
        //checks if the attribute is already in the attribute numbers object
        if (!(attributeNumbers[attribute])) {
            //if not present, assign the current number to the attribute
            attributeNumbers[attribute] = currentNumber;
            //increment the attribute number
            currentNumber++;
        }
        //otherwise skip over, since it has already been assigned a number in record
    }

    return attributeNumbers;
}

function getNestedValue(obj: any, path: string): any {
    //split the path into an array of strings
    //reduce the array of strings to a single value
    //if the value is not null and the key is not undefined, return the value
    //otherwise return null
    return path.split('.').reduce((value, key) => (value && value[key] !== undefined) ? value[key] : null, obj);}

async function sortDataByAttribute(attribute: string, order: 'asc' | 'desc'){
    //fetch data using fetchData
    const data = await fetchData();
    //set numbers for each of the attributes
    const attributeNumbers = await giveDataNumbers(...data.results.map(result => result[attribute]));
    //sort the data by the attribute
    const sortedData = data.results.sort((a, b) => {
        const valueA = getNestedValue(a, attribute);
        const valueB = getNestedValue(b, attribute);
        if (valueA === null || valueB === null){
            return 0;
        }
        if (order === 'asc'){
            return attributeNumbers[a[attribute]] - attributeNumbers[b[attribute]];
        } else {
            return attributeNumbers[b[attribute]] - attributeNumbers[a[attribute]];
        }
    });
    return sortedData;
}

export {sortDataByAttribute, fetchData};
