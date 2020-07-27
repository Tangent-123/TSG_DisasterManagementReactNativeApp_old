import axios from 'axios';
import Constants from '../Constants';

export default class Api {

    static fetchDataByPOST=async(url,data)=>{
        try {
            const response=await axios({
                method:'POST',
                headers:{'Content-Type':'multipart/form-data','Accept': 'application/json'},
                url: Constants.Base_Url+url,
                data
            })
           return response.data
        } catch (error) {
            throw error
        }
    }
  
    static fetchDataByGET=async(url)=>{
      try {
        const response=await axios({
            method:'GET',
            headers:{'Content-Type':'multipart/form-data','Accept': 'application/json'},
            url: Constants.Base_Url+url
        })
         return response.data
      } catch (error) {
          throw error
      }
  }
  
  
  
  }