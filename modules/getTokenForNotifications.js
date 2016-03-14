var XKONYTOKEN;
function getToken(){
  
  var intServiceInstance = kony.sdk.getCurrentInstance().getIntegrationService("authenticationService");//authenticationService
  var operationName = "getToken";//getToken
  var data = {};
 
  var headers = {"Content-Type":"application/json"};
 
  intServiceInstance.invokeOperation(operationName, headers, data, opSuccessToken, opFailureToken);
}

function opSuccessToken(response){
  kony.print("success getting token");
  //kony.print(JSON.stringify(response));
  
  XKONYTOKEN=response["claims_token"];
  //gotToken=true;
  sendCustomNotifications_fun();
  //kony.print("-------------------------------------xkonytoken       "+XKONYTOKEN);

}

function  opFailureToken(response){
  kony.print("failure occured");
  
  
}
