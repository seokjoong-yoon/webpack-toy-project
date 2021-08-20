import axios from 'axios'

const model = {
    get: async function() {
        try {
            // const result = await axios.get('/api/keywords'); // when using React devServer
            const result = await axios.get('http://localhost:8080/api/keywords') // when using node-api-server
            console.log(result.data)
            return result.data
        } catch (err) {
            console.log(err)
        }
    }
}

export default model

// Javascript normally executes one line after another line,
// but some APIs are designed to be executed "asynchronously", which means
// lines after that API is executed first, not waiting for the API to finish its function.
// So, for those API to be guaranteed its execution order, we use callback functions, promise or async/await.
// async function contains await keyword which is added before the API which is executed asynchronously but whose
// execution order must be guaranteed. That API, used with await should be a Promise.
// codes in async functions are seperated from the original codes and executed independently so that other codes
// in the program don't have to be waiting considerable time until the async API gets the result.
// by this reason, async function's return value is wrapped in Promise object before it is actually returned.