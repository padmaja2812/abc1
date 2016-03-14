
function sendNotification(msgTitle,msgBox,key,ufids){
   var intServiceInstance = kony.sdk.getCurrentInstance().getIntegrationService("sendPushNotifications");
   var operationName = "pushOperation";
   
   var eventid=sendCustomNotifications.listboxEventid.selectedKey;
   var sessionid=sendCustomNotifications.listboxSessionid.selectedKey;
   var form_details={"formopen":key,"eventid":eventid,"sessionid":sessionid};
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
  if(data2==[]){
    sendCustomNotifications.flexLoading.isVisible=false;
    alert("no one subscribe to the event");
  }
  else{
  //kony.print(data2);
  var message_data={"priorityService":"true","data":msgBox,"mimeType":"text/plain"};
  var data1={"ksid1":input1,"msg":message_data,"properties":properties_data}; 
  
  var token=XKONYTOKEN;
  var headers = {"X-Kony-Authorization":token,"Content-Type":"application/json"};
  intServiceInstance.invokeOperation(operationName, headers, data1, opSuccess1, opFailure1);
  }
}

function opSuccess1(response){
// response is the JSON returned data
  kony.print("---------------got  opsuccesss==================");
  //kony.print("got success------"+JSON.stringify(response));
  //popPUSH.dismiss();
  sendCustomNotifications.lblLoading.text=response["description"];
  sendCustomNotifications.flexLoading.isVisible=false;
 // alert(response["description"]);
  sendCustomNotifications.flexCustomNotifications.lblStatus.text=response["description"];
   
}
  
function opFailure1(response){
       //kony.print("status is -------");
       sendCustomNotifications.lblLoading.text="error occured please try again";
  sendCustomNotifications.flexLoading.isVisible=false;
     // kony.print("-----------------------------------------------------------------");
      kony.print("response of push  "+JSON.stringify(response));
   
}






function direcSendToAll(){
  
  
  var msgTitle=sendCustomNotifications.flexCustomNotifications.flexMessage.textTitle.text;
  var msgBox=sendCustomNotifications.flexCustomNotifications.flexMessage.textMsgBox.text;
  var intServiceInstance = kony.sdk.getCurrentInstance().getIntegrationService("sendPushNotifications");
  var operationName = "pushOperation";
   
  var form_details={"formopen":"1","eventid":"-1","sessionid":"-1"};
  //kony.print(form_details);
  
  
  var data=[];
  var data2=[];
  var input1=[{"allActive": "true"}];
  var properties_data={"iphone":{"title":msgTitle,"customData":{"key":{"name":"form","content":JSON.stringify(form_details)}}},"android":{"key":{"name":"form","value":JSON.stringify(form_details)}}};
  
 
 
  var message_data={"priorityService":"true","data":msgBox,"mimeType":"text/plain"};
  var data1={"ksid1":input1,"msg":message_data,"properties":properties_data}; 
  
   var token=XKONYTOKEN;
  var headers = {"X-Kony-Authorization":token,"Content-Type":"application/json"};
  intServiceInstance.invokeOperation(operationName, headers, data1, opSuccessDirect, opFailureDirect);
  
}



function opSuccessDirect(response){
  
  alert("notifications sended successfully...");
  //kony.print("got success------"+JSON.stringify(response));
  //popPUSH.dismiss();
  sendCustomNotifications.flexLoading.isVisible=false;
  sendCustomNotifications.flexCustomNotifications.lblStatus.text="Notifications send successfully";
}


function opFailureDirect(response){
  sendCustomNotifications.lblLoading.text="error occured try again";
  sendCustomNotifications.flexLoading.isVisible=false;
  kony.print(JSON.stringify(response));
}