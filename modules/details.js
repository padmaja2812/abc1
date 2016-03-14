function getDetails()
{
  alert("Alert : Getting Details");
  //Takes the instance of the database from the mobile fabric
	var integrationObj = kony.sdk.getCurrentInstance().getIntegrationService("fetchEvents");  
	
  //Operation name as it was given in the service operations list
  	var operationName = "konyevents_address_read";
  
  	var data= {};
  	var headers= {};
    
  integrationObj.invokeOperation(operationName, headers, data, detailsSuccessCallBack, detailsFailureCallBack);
}

function detailsSuccessCallBack(response)
{
  
  alert("$$$$$ Sucessfully fetched");
  //write code to set in the table
  //title = response.record[1].title
  if(response.address !== null)
    {
       if(response.address.length >0)
         {
          
             frmContact.segdetails.widgetDataMap =
                       {
                      		labName	: "name",
               				labDesg	: "city",
               				labEmail: "email",
						} ;            
               
           frmContact.segdetails.setData(response.address);
         }
    }
  
}

function detailsFailureCallBack(error)
{
  alert("Failed To Retrive Details");
  kony.print("$$$$$$$ Failed to fetch : " + JSON.stringify(err));
}
