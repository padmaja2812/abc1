function contactEventNameListBox(){ 
  // alert("in contact event name list boc");
var integrationObj = kony.sdk.getCurrentInstance().getIntegrationService("fetchEvents");
  var operationName = "konyevents_event_read";
  data= {};
  headers= {};
  integrationObj.invokeOperation(operationName, headers, data, successContactEvents, failureContactEvents);

}


function successContactEvents(response){
   //alert(JSON.stringify(response));
  kony.print(JSON.stringify(response));
    var eventlist=response["event"];
  var i;
  var data=[];
  if(eventlist!==null){
  for(i=0;i<eventlist.length;i++){
    data[i]=[eventlist[i]["event_id"],eventlist[i]["title"]];
  }
    frmContactUsFrontEnd.listBoxEventName.masterData=data;
  }
  
}

function failureContactEvents(response){
  kony.print(JSON.stringify(response));
}



function onSelectlistboxEventName(){
 // alert("in on select listbox eventname");
  var selectedkey=frmContactUsFrontEnd.listBoxEventName.selectedKey;
  var integrationObj = kony.sdk.getCurrentInstance().getIntegrationService("fetchEvents");
  var operationName = "konyevents_list_venue_for_event_contact_read";
  data= {"$filter":"eventid eq "+selectedkey};
  eventid_contact=selectedkey;
  headers= {};
  integrationObj.invokeOperation(operationName, headers, data, successContactEvents1, failureContactEvents1);
}

function successContactEvents1(response){
 // alert("onsuccess1");
    var eventlist=response["list_venue_for_event_contact"];
  var i;
  var data=[];
  if(eventlist!==null){
  for(i=0;i<eventlist.length;i++){
    data[i]=[eventlist[i]["venueid"],eventlist[i]["venue_name"]];
  }
    frmContactUsFrontEnd.listBoxVenueName.masterData=data;
  }
  
  //var venueid=eventlist[i]["venue_id"];
  getAddressForVenue();
}

function failureContactEvents1(response){
  kony.print(JSON.stringify(response));
}


function getAddressForVenue(){
 // alert("in get address");
  var venueid=frmContactUsFrontEnd.listBoxVenueName.selectedKey;
   var integrationObj = kony.sdk.getCurrentInstance().getIntegrationService("fetchEvents");
  var operationName = "konyevents_vw_venue_details_read";
  data= {"$filter":"venue_id eq "+venueid};
  headers= {};
  integrationObj.invokeOperation(operationName, headers, data, successContactEvents2, failureContactEvents2);
  
}


function successContactEvents2(response){
 // alert("in success");
    var list=response["vw_venue_details"];
   var i;
  //alert(JSON.stringify(list));
   if(list!==null){
     //alert(JSON.stringify(list));
    var addressid=list[0]["venue_address_id"];
     addressid_contact=addressid;
     //alert("addressid"+addressid);
   functionGetAddressDetails(addressid);
    
   }
  // frmContactUsFrontEnd.listBoxVenueName.masterData=data;  
  }
  
  
  
function failureContactEvents2(response){
  
}




function functionGetAddressDetails(addressid){
  //alert("in get address details");
  //var venueid=frmContactUsFrontEnd.listBoxVenueName.selectedKey;
   var integrationObj = kony.sdk.getCurrentInstance().getIntegrationService("fetchEvents");
  var operationName = "konyevents_address_read";
  data= {"$filter":"address_id eq "+addressid};
  headers= {};
  integrationObj.invokeOperation(operationName, headers, data, successContactEvent3, failureContactEvents3);
  
}


function successContactEvent3(response){
 // alert("in success3");
    var list=response["address"];
   var i;
   if(list!==null){
     //alert(JSON.stringify(list));
    var addressid1=list[0]["address_id"];
     var addressname=list[0]["name"];
     var addressphone1=list[0]["phone_one"];
     var addressphone2=list[0]["phone_two"];
     var addressmail=list[0]["mail"];
     var name=frmContactUsFrontEnd.tbxName.text;
     var designation=frmContactUsFrontEnd.tbxDesg.text;
     updateContactUsInfoIntoDB(name,designation,addressid1,addressname,addressphone1,addressphone2,addressmail);
    //functionGetAddressDetails(addressid);
     //alert("addressid: "+addressid1);
     //alert("addressname: "+addressname);
     
    
   }
  // frmContactUsFrontEnd.listBoxVenueName.masterData=data;  
  }
  
  
  
function failureContactEvents3(response){
  
}



function updateContactUsInfoIntoDB(name,designation,addressid1,addressname,addressphone1,addressphone2,addressmail){
  
 // alert("updating db");
    var integrationObj = kony.sdk.getCurrentInstance().getIntegrationService("fetchEvents");
  var operationName = "konyevents_contact_create";
  data= {"name":name,"designation":designation,"event_id":parseInt(eventid_contact),"contact_img_id":"","address_id":parseInt(addressid_contact)};
  headers= {};
  integrationObj.invokeOperation(operationName, headers, data, successContactEvents4, failureContactEvents4);
  
  
}


function successContactEvents4(response){
  alert(JSON.stringify(response));
}


function failureContactEvents4(respons){
  
}