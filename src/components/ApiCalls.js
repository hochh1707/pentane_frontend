export default class ApiCalls {

    getPropertyRecords(returnStateToApp,oldState){
        fetch(oldState.baseUrl + "/api/property/" + oldState.filter1 + "/asc/" + oldState.startRecord,{
          method: "POST",
          body: JSON.stringify(
            {
              username: localStorage.getItem("username"),
              password: localStorage.getItem("password"),
              filter2_field: oldState.filter2Field,
              filter2_search_string: oldState.filter2ActiveSearchString,
            })
        }).then(function(response){
            return response.json();
          }).then(function(myJson){
              let objReturnApiData = {};
            //aaa76 indicates no records to match query
            if(myJson == "aaa76"){
                objReturnApiData.myJson = "";
                objReturnApiData.recordCount = 0;
                objReturnApiData.recordCountTotal = 0;
                objReturnApiData.okToRender = 1;
                objReturnApiData.waitingForUpdate = 0;
            }else{
                objReturnApiData.myJson = myJson;
                objReturnApiData.recordCount = Object.keys(myJson).length;
                objReturnApiData.recordCountTotal = myJson[0]['count'];
                objReturnApiData.okToRender = 1;
                objReturnApiData.waitingForUpdate = 0;
            }
            returnStateToApp(objReturnApiData);
        });
    }
}



