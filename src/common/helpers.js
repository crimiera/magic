import { RETRY } from '../common/constants';

export const refetch = async (request, payload) =>{
    try{
        const response = await request(payload);
        const text = await response.text();
        const data = JSON.parse(text);
        if(data) return  data ;
    }
    catch(error){
        setTimeout(()=>{ return request( request, payload )}, RETRY);
        throw new Error();
    }
}