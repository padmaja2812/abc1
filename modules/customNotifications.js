function sendCustomNotifications_fun()
{
      var input=[];
      var filtering;
      input[0]=sendCustomNotifications.listboxEventid.selectedKey;
      if(input[0]=="-111"){
         direcSendToAll();
        }
      else{
         input[1]=sendCustomNotifications.listboxSessionid.selectedKey;
         if(input[1]=="-111"){
                 filtering="event_id eq "+input[0];
          }
         else
            filtering="event_id eq "+input[0]+" "+"and "+"session_id eq "+input[1];
         var msgBox=sendCustomNotifications.flexCustomNotifications.flexMessage.textMsgBox.text;
         if(msgBox==null){
    
          }
         else{
            var intServiceInstance = kony.sdk.getCurrentInstance().getIntegrationService("fetchEvents");
            var operationName ="konyevents_vw_user_email_read" ;
            var data={"$filter":filtering};
            var headers={};
            intServiceInstance.invokeOperation(operationName, headers, data, operationSuccessNotify, operationFailureNotify);
         }
      }
}


function operationSuccessNotify(response){
  // kony.print("-----------------------------------------------------------------------------");
  //kony.print(JSON.stringify(response));
  sendCustomNotifications.lblLoading.text="filtering list.....please wait";
  var msgTitle=sendCustomNotifications.flexCustomNotifications.flexMessage.textTitle.text;
  var msgBox=sendCustomNotifications.flexCustomNotifications.flexMessage.textMsgBox.text;
  var key=sendCustomNotifications.ListBox1.selectedKey;
 
  var mailids=response["vw_user_email"];
  sendNotification(msgTitle,msgBox,key,mailids);
  
  
}


function operationFailureNotify(response){
   //kony.print(response);
  sendCustomNotifications.lblLoading.text="eror occured please try again";
  sendCustomNotifications.flexLoading.isVisible=false;
  
}