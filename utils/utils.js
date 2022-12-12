module.exports.validate=(sTime,eTime,batches)=>{

    for(let batch of batches)
    {   
        console.log(new Date(eTime)  , new Date(sTime) );
        if(!(new Date(eTime) < new Date(meeting.startTime) || new Date(sTime) > new Date(meeting.endTime)))
        return false;
    }
     return true;
}

module.exports.CompletePayment=(check)=>{
    let myPromise = new Promise(function(resolve, reject) {    
        if (check == 1) 
          resolve({"success":true,"message":"Payment successful!"});
        else 
          reject({"success":false,"message":"Payment Failed!"});
        
      });

      return myPromise;
}
