import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import env from 'dotenv'
import { Configuration, OpenAIApi } from 'openai'

const app = express()

env.config()

app.use(cors())
app.use(bodyParser.json())

//Configuration
const configuration = new Configuration({
    organization: "org-9ZmNmMHV3qJA6CJnQZhwHKHc",
    apiKey: process.env.API_KEY
})
const openai = new OpenAIApi(configuration)

//Listening to Port
const port = process.env.PORT || 3080
app.listen(port, () =>{
    console.log(`Listening to request on port ${port}`)
})
app.get('/', (req, res)=>{
    res.send('<h1>Hello world</h1>')
})

//Post route for making request
app.post('/', async(req, res) =>{
    const {message} = req.body
    try {
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `${message}`,
            max_tokens: 100,
            temperature: .5
        })
        res.json({message: response.data.choices[0].text})
    } catch (e) {
        console.log(e)
        res.send(e).status(400)
        
    }
})