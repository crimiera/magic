import { RETRY } from '../common/constants';

export const refetch = async (request, payload) =>{
    try{
        return await request(payload);
    }
    catch(error){
        setTimeout(()=>{ return request( request, payload )}, RETRY);
        throw new Error();
    }
}