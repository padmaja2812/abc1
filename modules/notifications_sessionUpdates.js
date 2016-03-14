
var XKONYTOKEN_SESSION;
function getToken_session(){
  
  var intServiceInstance = kony.sdk.getCurrentInstance().getIntegrationService("authenticationService");//authenticationService
  var operationName = "getToken";//getToken
  var data = {};
 
  var headers = {"Content-Type":"application/json"};
 
  intServiceInstance.invokeOperation(operationName, headers, data, opSuccessToken_session, opFailureToken_session);
}

function opSuccessToken_session(response){
  kony.print("success getting token");
  //kony.print(JSON.stringify(response));
  
  XKONYTOKEN_SESSION=response["claims_token"];
  //gotToken=true;
  sendCustomNotifications_fun_session();
  //kony.print("-------------------------------------xkonytoken       "+XKONYTOKEN);

}

function  opFailureToken_session(response){
  kony.print("failure occured");
  
  
}




function sendCustomNotifications_fun_session()
{
      var input=[];
      var filtering;
      input[0]=eventid_session;
      
    
         input[1]=sessionid_session;
         
        filtering="event_id eq "+input[0]+" "+"and "+"session_id eq "+input[1];
         var msgBox=frmGetSession.txtAreaMsg.text;
         if(msgBox===null){
    
          }
         else{
            var intServiceInstance = kony.sdk.getCurrentInstance().getIntegrationService("fetchEvents");
            var operationName ="konyevents_vw_user_email_read" ;
            var data={"$filter":filtering};
            var headers={};
            intServiceInstance.invokeOperation(operationName, headers, data, operationSuccessNotify_session, operationFailureNotify_session);
         }
      }



function operationSuccessNotify_session(response){
  // kony.print("-----------------------------------------------------------------------------");
  //kony.print(JSON.stringify(response));
  //sendCustomNotifications.lblLoading.text="filtering list.....please wait";
  var msgTitle=frmGetSession.tbxNotificationTitle.text;
  var msgBox=frmGetSession.txtAreaMsg.text;
  //var key=;
 //alert(JSON.stringify(response));
  var mailids=response["vw_user_email"];
  sendNotification_session(msgTitle,msgBox,mailids);
  
  
}


function operationFailureNotify_session(response){
   //kony.print(response);
  //sendCustomNotifications.lblLoading.text="eror occured please try again";
  //sendCustomNotifications.flexLoading.isVisible=false;
  
}





function sendNotification_session(msgTitle,msgBox,ufids){
   var intServiceInstance = kony.sdk.getCurrentInstance().getIntegrationService("sendPushNotifications");
   var operationName = "pushOperation";
   
   var eventid=eventid_session;
   var sessionid=sessionid_session;
   var form_details={"formopen":"2","eventid":eventid,"sessionid":sessionid};
   //kony.print(form_details);
  
   var mailid_store=[];
   var index;
   var event_id=3;
   for(index=0;index<ufids.length;index++){
     
        mailid_store.push(ufids[index]["mail_id"]);
       
   }
   var input={"ufid":""};
   kony.print("----------------------------------------------");
   //kony.print(mailid_store);
   var data=[];
   var data2=[];
   
   var properties_data={"iphone":{"title":msgTitle,"customData":{"key":{"name":"form","content":JSON.stringify(form_details)}}},"android":{"key":{"name":"form","value":JSON.stringify(form_details)}}};
  
  var i=0;
  for(i=0;i<mailid_store.length;i++){
    input['ufid']="";
     input['ufid']=mailid_store[i];
    data2.push(input);
    
  }
  
  //var input1=[{"ufid":"kmsdemouser1@kony.com"},{"ufid":"phani@gmail.com"}];
  var input1=data2;
  //alert("mailids"+input1);
  if(data2===null){
   // sendCustomNotifications.flexLoading.isVisible=false;
    //alert("no one subscribe to the event");
  }
  else{
  //kony.print(data2);
  var message_data={"priorityService":"true","data":msgBox,"mimeType":"text/plain"};
  var data1={"ksid1":input1,"msg":message_data,"properties":properties_data}; 
  
  var token=XKONYTOKEN_SESSION;
  var headers = {"X-Kony-Authorization":token,"Content-Type":"application/json"};
  intServiceInstance.invokeOperation(operationName, headers, data1, opSuccess1_session, opFailure1_session);
  }
}

function opSuccess1_session(response){
// response is the JSON returned data
  kony.print("---------------got  opsuccesss==================");
  //kony.print("got success------"+JSON.stringify(response));
  //popPUSH.dismiss();
  //sendCustomNotifications.lblLoading.text=response["description"];
  //sendCustomNotifications.flexLoading.isVisible=false;
 // alert(response["description"]);
  //sendCustomNotifications.flexCustomNotifications.lblStatus.text=response["description"];
   
}
  
function opFailure1_session(response){
       //kony.print("status is -------");
      // sendCustomNotifications.lblLoading.text="error occured please try again";
 // sendCustomNotifications.flexLoading.isVisible=false;
     // kony.print("-----------------------------------------------------------------");
      kony.print("response of push  "+JSON.stringify(response));
   
}





