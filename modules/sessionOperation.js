
/********************ADDING THE SESSION DETAIL (SERVICE)******************/
function getSessionDetail()
{
  var title= frmGetSession.tbxTitle.text;
  var start_time= frmGetSession.tbxStart.text;
  var end_time= frmGetSession.tbxEnd.text;
 // var date= frmGetSession.tbxDate.text;
 // alert(data);
  var date = new Date((frmGetSession.dayListBox.selectedKeyValue)[0]);
  var year1=date.getFullYear();
  var month1=date.getMonth()+1;
  var day1=date.getDay();
  var upload_id=upload_lat_id;
  if(day1<10){
    day1="0"+day1;
  }
  else{
    day1=""+day1;
  }
  if(month1<10){
    month1="0"+month1;
  }
  else{
    month1=month1+"";
  }
  //alert
  var date1=year1+"-"+month1+"-"+day1;
  var track_name= frmGetSession.tbxTrackName.text;
  var event_id= formSelectEvent.tbxEventId.text;
  var description= frmGetSession.txtAreaDesc.text;
  var rating_id=1;
  var is_break_session= frmGetSession.breakCheckBox.selectedKeys;
  var split_name= frmGetSession.addressline.selectedKeyValue;
  var venue_hall_id = split_name[0];
  //alert("venue_hall_id" +venue_hall_id);
  addSession(title,start_time,end_time,date1,description,rating_id,is_break_session,event_id,track_name,venue_hall_id,upload_id);
}


function addSession(title,start_time,end_time,date,description,rating_id,is_break_session,event_id,track_name,venue_hall_id)
{
  var integartionObject= kony.sdk.getCurrentInstance().getIntegrationService("fetchEvents");
  var operation_name= "konyevents_session_create";
  session_data= {"title":title,"start_time":start_time,"end_time":end_time,"date":date,"description":description,"rating_id":rating_id,"is_break_session":is_break_session,"event_id":event_id,"track_name":track_name,"venue_hall_id":venue_hall_id};
  headers= {};
  integartionObject.invokeOperation(operation_name, headers, session_data, addSessionSuccess, addSessionFailure); 
}

function addSessionSuccess(response)
{
  //alert("Session Added");
  kony.print("operationSuccess:start");
  kony.print(JSON.stringify(response));
  var sessionid=response["session"][0]["session_id"];
  sessionid_speaker=sessionid;
  getSelectedSpeaker(sessionid);
  kony.print("operationSuccess:end");
}

function addSessionFailure(error)
{
  //error is the error object
  //alert("Session Adding Operation Failed" +JSON.stringify(error));
  kony.print("operationFailure:start");
  kony.print(JSON.stringify(error));
  kony.print("operationFailure:end");
}
/**********************************READING VENUE ID (SERVICE)******************************/
function getVenueID()
{
  var integrationObj= kony.sdk.getCurrentInstance().getIntegrationService("fetchEvents");
  var operation_name= "konyevents_venue_hall_read";
  var data={};
  var headers= {};
  integrationObj.invokeOperation(operation_name,headers,data,getVenueIdSuccessCallBack,getFailureCallback);
}
var i=0;
var data2=[];
function getVenueIdSuccessCallBack(response)
{
  //alert(JSON.stringify(response.venue_hall));
  kony.print(JSON.stringify(response.venue_hall));
  kony.print("record::" + JSON.stringify(response.venue));
  if(response.venue_hall !== null)
    {
      if(response.venue_hall.length > 0)
        {
          for( i = 0 ; i < response.venue_hall.length ; i++)
            {
              data2[i]=[response.venue_hall[i].venue_hall_id,response.venue_hall[i].venue_hall_name];
              //alert("data1->" + data1[i] +"     " +"data2->" + data2[i]);
            }
         //alert(data1+"        "+data2);
         frmGetSession.addressline.masterData=data2;
        }
    }
}


/***********************************READING SPEAKER LIST (SERVICE)*************************/
var glb_speakercount=0;
function getSpeakerList()
{
  var integarionObj= kony.sdk.getCurrentInstance().getIntegrationService("fetchEvents");
  var operation_name= "konyevents_speaker_read";
  var data={};
  var headers= {};
  integarionObj.invokeOperation(operation_name,headers,data,getSpeakerListSuccess,getSpeakerFailureCallback);
}

var data1= [];
function getSpeakerListSuccess(response)
{
  kony.print("record::" + JSON.stringify(response.speaker));
  
  
  glb_speakercount=response.speaker.length;
  if(response.speaker !== null)
    {
      if(response.speaker.length > 0)
        {
          for( i = 0 ; i < response.speaker.length ; i++)
            {
              data1[i]=[response.speaker[i].speaker_id,response.speaker[i].speaker_name];
              //alert("data1->" + data1[i] +"     " +"data2->" + data2[i]);
            }
         //alert(data1+"        "+data2);
         frmGetSession.speakerListBox.masterData = data1;
          
        }
    }
}
function getSpeakerFailureCallback(error)
{
  // alert("Failed To Retrive speaker " + JSON.stringify(error));
  kony.print("Failed to fetch : " + JSON.stringify(error));
}

/***********************************READING SESSION DATA (SERVICE)*************************/

function readSessionData()
{
  var intReadObj= kony.sdk.getCurrentInstance().getIntegrationService("fetchEvents");
  var operation_name= "konyevents_session_read";
  var data = {};
  var headers = {};
  intReadObj.invokeOperation(operation_name,headers,data,getSessionSuccessCallback,getFailureCallback);  
}

function getSessionSuccessCallback(response)
{
  kony.print(JSON.stringify(response.session));
  kony.print("record::" + JSON.stringify(response.session));
  if(response.session !== null)
    {
      if(response.session.length > 0)
        {
          formViewSession.sessionSeg.widgetDataMap=
            {
            lblTitle: "title",
            lblDuration: "start_time" + "end_time",
            lblDate: "date",
            lblDesc: "description", 
            Track_Name: "track_Name"
          };
          formViewSession.sessionSeg.setData(response.session);
        }
    }
  
}

function getFailureCallback(error)
{
  //alert("Failed To Retrive ");
  kony.print("Failed to fetch : " + JSON.stringify(error));
}

/****************************UPDATE SESSION (SERVICE)***************************/

function callupdateSession()
{
  var selectedRow= formViewSession.sessionSeg.selectedItems[0];
  var session_id= selectedRow.session_id;
  var title= frmGetSession.tbxTitle.text;
  var start_time= frmGetSession.tbxStart.text;
  var end_time= frmGetSession.tbxEnd.text;
  var date= (frmGetSession.dayListBox.selectedKeyValue)[0]; 
  var date1=new Date(date);
  var year1=date1.getFullYear();
  var month1=date1.getMonth()+1;
  var day1=date1.getDay();
  if(month1<10){
    month1="0"+month1;
  }
  else
    month1=""+month1;
  if(day1<10){
    day1="0"+day1;
  }
  else
    day1=""+day1;
  var date2=year1+"-"+month1+"-"+day1;
  var event_id= selectedRow.event_id;
  
  eventid_session=event_id;
  sessionid_session=selectedRow.session_id;
 // alert(event_id);
  var description= frmGetSession.txtAreaDesc.text;
  var rating_id= 1;
   var is_break_session;
  if(frmGetSession.breakCheckBox.selectedKey===null){
    is_break_session=0;
  }
  else
   is_break_session= frmGetSession.breakCheckBox.selectedKey;
   //alert(frmGetSession.breakCheckBox.selectedKey);
  kony.print(frmGetSession.breakCheckBox.selectedKey);
  var track_name= frmGetSession.tbxTrackName.text;
  var split_name= frmGetSession.addressline.selectedKeyValue;
  var venue_hall_id = split_name[0];
  updateSession(session_id,title,start_time,end_time,date2,description,rating_id,is_break_session,event_id,track_name,venue_hall_id);
  
}

function updateSession(session_id,title,start_time,end_time,date,description,rating_id,is_break_session,event_id,track_name,venue_hall_id)
{
  var integrationObj=  kony.sdk.getCurrentInstance().getIntegrationService("fetchEvents");
  var operation_name= "konyevents_session_update";
  var session_data1= {"session_id":session_id,"title":title,"start_time":start_time,"end_time":end_time,"date":date,"description":description,"rating_id":rating_id,"is_break_session":is_break_session,"event_id":event_id,"track_name":track_name,"venue_hall_id":venue_hall_id};
  var headers= {};
  integrationObj.invokeOperation(operation_name, headers, session_data1, sessionUpdateSuccess, sessionUpdateFailure);  
}

function sessionUpdateSuccess(response)
{
  //alert("Session Detail Updated");
  kony.print("operationSuccess:start");
  kony.print(JSON.stringify(response));
  kony.print("operationSuccess:end"); 
  if(frmGetSession.notifications1.selectedKeys===null){
    alert("i am not sending notifications");
  }
  //alert(frmGetSession.notifications1.selectedKeys);
  if(frmGetSession.notifications1.selectedKeys=="1")
              getToken_session();
}

function sessionUpdateFailure(error)
{
 // alert("Error: Session Detail could not be updated");
  kony.print("operationFailure:start");
  kony.print(JSON.stringify(error));
  kony.print("operationFailure:end");  
}