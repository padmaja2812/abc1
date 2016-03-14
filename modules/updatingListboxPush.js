function get1Events(){
  
   var intServiceInstance = kony.sdk.getCurrentInstance().getIntegrationService("fetchEvents");
   var operationName ="konyevents_vw_events_push_read" ;
    //var filtering="event_id eq "+eventid+" "+"and "+"session_id eq "+sessionid;
   var data={};
    var headers={};
   // kony.print("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh");
     intServiceInstance.invokeOperation(operationName, headers, data, operationSuccessNotify1, operationFailureNotify1);
    //kony.print("cool cool cool");
}

var data=[];


function operationSuccessNotify1(response){
  
   //alert("success");
  //alert(JSON.stringify(response));
 
   if(response.vw_events_push !== null)
    {
      if(response.vw_events_push.length > 0)
        {
          data[0]=["-111","ALL"];
          for( i = 1 ; i < response.vw_events_push.length+1 ; i++)
            {
              data[i]=[response.vw_events_push[i-1].eventid,response.vw_events_push[i-1].title];
              //alert("data1->" + data1[i] +"     " +"data2->" + data2[i]);
            }
         //alert(data1+"        "+data2);
         sendCustomNotifications.listboxEventid.masterData=data;
        }
    } 
  }
 


function operationFailureNotify1(response){
  
   kony.print("failure");
  
}






function getSessionsForPush1(){
  
   //kony.application.showLoadingScreen(null, "Loading...",constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true );
  kony.application.showLoadingScreen("slForm", "Refereshing data Please Wait...", constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true, true, null); 
  var eventid=sendCustomNotifications.listboxEventid.selectedKey;
   //kony.print(eventid);
   if(eventid=="-111"){
     sendCustomNotifications.lblSessionID.isVisible=false;
     sendCustomNotifications.listboxSessionid.isVisible=false;
   }
  else{
   var intServiceInstance = kony.sdk.getCurrentInstance().getIntegrationService("fetchEvents");
   var operationName ="konyevents_vw_sessions_push_read" ;
    var filtering="eventid eq "+eventid;
   var data={$filter:filtering};
    var headers={};
     intServiceInstance.invokeOperation(operationName, headers, data, operationSuccessNotify2, operationFailureNotify2);
    sendCustomNotifications.lblSessionID.isVisible=true;
     sendCustomNotifications.listboxSessionid.isVisible=true;
  }//kony.print("cool cool cool");
}


function operationSuccessNotify2(response){
   kony.print("-----------------------------------------------------------------------------");
  //kony.print(JSON.stringify(response));
   data=[];
 // sessions_list=response["sessions_push"];
   if(response.vw_sessions_push !== null)
    {
      if(response.vw_sessions_push.length > 0)
        {
          data[0]=["-111","ALL"];
          for( i = 1 ; i < response.vw_sessions_push.length+1 ; i++)
            {
              data[i]=[response.vw_sessions_push[i-1].eventid,response.vw_sessions_push[i-1].title];
              //alert("data1->" + data1[i] +"     " +"data2->" + data2[i]);
            }
         //alert(data1+"        "+data2);
         
        }
    }
  kony.application.dismissLoadingScreen();
  sendCustomNotifications.listboxSessionid.masterData=data;
  }
  



function operationFailureNotify2(response){
  
  
  
}




function callSendPush(){
  //var sessionid=sendCustomNotifications.listboxSessionid.selectedkey;
  //popPUSH.show
  kony.application.showLoadingScreen("slForm","Sending ...../.....",constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true, true,null);
  sendCustomNotifications.flexLoading.isVisible=true;
  sendCustomNotifications.lblLoading.text="getting token....... Please wait";
  kony.application.showLoadingScreen("slForm","Subscribing for push notification...",constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true, true,null);
  var eventid=sendCustomNotifications.listboxEventid.selectedkey;
  getToken();
  
}