import connect from './connect.js'

const hospitalCollection = connect().collection('hospitals')

export const getAllHospitals = async () => {

    try{
        const snapshot = await hospitalCollection.get();
        const result = snapshot.docs.map((doc) => {
            const hospital = doc.data()
            hospital.id = doc.id
            return hospital

        })

        return result
    }
    catch(error){
        console.error(error)
    }

}

export const createHospital = async (hospital) => {

    try{
        const result = hospitalCollection.add(hospital)
        hospital.id = await result.id
        return hospital
    }
    catch(error){
        console.error(error)
    }
}

export const updateHospital = async (id, hospital) => {
    try{
       const result = await hospitalCollection
        .doc(id)
        .update(hospital)

        return await getHospitalById(id)

    }catch(error){
        console.log(error)
    }
}
export const getHospitalById = async id => {
    try{
        const result = await hospitalCollection.doc(id).get()
        return {
            id: result.id,
            ...result.data()
        }
    }catch (error){
        console.error(error)
    }
}

export const deleteHospital = async id =>{
    try {
        const result = await hospitalCollection.doc(id).delete()
        return "Hospital deleted"
        
    }catch (error){
        console.error(error)
    }
}

export const getHospitalByFilter = async hospitalFilter => {

    if(!hospitalFilter){
        hospitalFilter = {}
    }

    const { name, address, type, services } = hospitalFilter
    
    let query = hospitalCollection

    if(name){
        query = query.where("name", "==", name)
    }

    if(address){
        query = query.where("address", "==", address)
    }   
    
    if(type){
        query = query.where("type", "==", type)
    }  
    
    if(services){
        query = query.where("services", "==", services)
    }  
    
    try{
        const snapshot = await query.get()
        const result = snapshot.docs.map((doc) =>{
        const hospital = doc.data()
        hospital.id = doc.id
        return hospital    
   })

   return result

    }catch (error) {
        console.error(error)
    }


}