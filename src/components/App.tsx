import { QueryClient, QueryClientProvider } from "react-query"
import Data from "./Data"
const queryClient = new QueryClient()

const TaskOne: React.FC = () => {
    return (
        <div>
            <h1 className='mb-4 text-3xl'>Task One</h1>
            <TaskOne/>
            {/* TaskOne component, which states the percentages of issues of 500 data points*/}
        </div>
    )
}

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <div className='p-4'>
                <h1 className='mb-4 text-3xl'>Data Display</h1>
                <Data/>
                <TaskOne/>
            </div>
        </QueryClientProvider>
    );
}

export default App


