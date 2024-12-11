import { QueryClient, QueryClientProvider } from "react-query"
import Data from "./Data"
import TaskOne from "./TaskOne"
import TaskTwo from "./TaskTwo"
const queryClient = new QueryClient()


function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <div className='p-4'>
                <h1 className='mb-4 text-3xl'>Data Display</h1>
                <Data/>
                <h1 className='mb-4 text-3xl'>Task One</h1>
                <TaskOne/>
                <h1 className='mb-4 text-3xl'>Task Two</h1>
                <TaskTwo/>
            </div>
        </QueryClientProvider>
    );
}

export default App


