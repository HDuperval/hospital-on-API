import express from 'express';
//import { getAllHospitals, createHospital, updateHospital, getHospitalById, deleteHospital, getHospitalsByFilter } from './scr/hospitals.js';
import { getAllHospitals, createHospital, updateHospital, getHospitalById, deleteHospital, getHospitalByFilter} from './scr/hospitals.js';

const app = express()
app.use(express.json())

// app.get("/hospitals", async (req, res) => {
//     try{
//         const result = await getAllHospitals();
//         res.status(200).send(result)

//     } catch (error){
//         res.status(500).send(error)
//     }
// })
app.post('/hospitals', async (req, res) =>{
    const hospital = req.body;

    try{
        const result = await createHospital(hospital)
        res.status(200).send(result)
        
    }catch(error){
        res.status(500).send(error)
        
    }

})
app.patch('/hospitals/:id', async (req, res) => {
    const updateInput = req.body
    const { id } = req.params

    if (!updateInput) {
        res.status(400).send("empty body")
        return
    }
    try{
        const result = await updateHospital(id, updateInput)
        res.status(200).send(result)

    }catch (error) {
        res.status(500).send(error)
    }
})

app.get('/hospitals/:id', async (req, res) => {
    try{
        const { id } = req.params
        const result = await getHospitalById(id)
        res.status(200).send(result)
    }catch (error) {
        res.status(500).send(error)
    }
})
    
app.delete('/hospitals/:id', async (req, res) => {
    const { id } = req.params

    try {
        //const { id } = req.params
        const result = await deleteHospital(id)
        res.status(200).send(result)

    } catch (error) {
        res.status(500).send(error)
    }
})

app.get('/hospitals', async (req, res) => {
    const {name, address, type, services} = req.query
    const filter = {name, address, type, services}

    try{
        const result = await getHospitalByFilter(filter)
        res.status(200).send(result)

    }catch (error) {
        res.status(500).send(error)
    }
})


const port = 5014
app.listen(port, () => {
    console.log(`we are litening ${port}`)

})