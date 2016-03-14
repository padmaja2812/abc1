var e_startDate;
var e_endDate;
function showSessionEvent()
{
  //alert("Into show session event");
  var SelectedIndex = frmEventDetails.SegEventDetails.selectedItems[0];
  formSelectEvent.tbxEventId.text = SelectedIndex.event_id;
  formSelectEvent.tbxEventName.text = SelectedIndex.title;
  e_startDate = SelectedIndex.start_date;
  e_endDate = SelectedIndex.end_date;
  formSelectEvent.show();
}

function addNewSessionFromView()
{
  var selected = formViewSession.sessionSeg.selectedItems[0];
  formSelectEvent.tbxEventId.text=selected.event_id;
  formSelectEvent.tbxEventName.text= selected.event_title;
  
  formSelectEvent.show();
  
}


function editSessionOnRowClick()
{
  var selected_index= formViewSession.sessionSeg.selectedItems[0];
  //alert(selected_index);
 // frmGetSession.lblSessionCnt.text= "session :" +selected_index;
  frmGetSession.tbxTitle.text= selected_index.title;
  frmGetSession.tbxStart.text= selected_index.start_time;
  frmGetSession.tbxEnd.text= selected_index.end_time;
 // frmGetSession.tbxBreak.text = selected_index.is_break_session;
  frmGetSession.tbxTrackName.text = selected_index.track_name;
  frmGetSession.txtAreaDesc.text = selected_index.description;
  frmGetSession.btnNext.setEnabled(false);
  frmGetSession.btnSubmit.setEnabled(true);
  var venue_id=selected_index.venue_hall_id;
  var sessionid=selected_index.session_id;
  //alert("sessionid"+sessionid);
  dayList(e_startDate,e_endDate);
  updateSpeakerBox(sessionid);
  updateVenueBox(venue_id);
 // frmGetSession.btnSubmit.skin = "sknEDitBtn";
  //frmGetSession.btnNext.skin = "btn909ca3H";
  
  frmGetSession.show();
}


function updateSpeakerBox(sessionid){
  
   var integarionObj= kony.sdk.getCurrentInstance().getIntegrationService("fetchEvents");
  var operation_name= "konyevents_list_speakers_session_read";
  var filtering="session_id eq "+sessionid;
  var data={"$filter":filtering};
  var headers= {};
  integarionObj.invokeOperation(operation_name,headers,data,getSpeakerSuccess1,getSpeakerFailure1);
  
  
}

function getSpeakerSuccess1(response){
  //alert("get speakers ssuccess");
   kony.print("get Speaker success ");
 // alert(JSON.stringify(response));
  kony.print(JSON.stringify(response));
  var data1=[];
  var speakers_list=response["list_speakers_session"];
  if(speakers_list !== null)
    {
      if(speakers_list.length > 0)
        {
          for( i = 0 ; i < speakers_list.length ; i++)
            {
              data1[i]=[speakers_list[i].speaker_id,speakers_list[i].speaker_name];
              //alert("data1->" + data1[i] +"     " +"data2->" + data2[i]);
            }
         //alert(data1+"        "+data2);
         frmGetSession.speakerList.masterData = data1;
          kony.print(data1);
        }
    }
}


function getSpeakerFailure1(response){
  kony.print(JSON.stringify(response));
}

function updateVenueBox(venue_id){
  
   var integarionObj= kony.sdk.getCurrentInstance().getIntegrationService("fetchEvents");
  var operation_name= "konyevents_venue_hall_read";
 // var filtering="session_id eq "+sessionid;
  var data={};
  venue_id_dummy=venue_id;
  var headers= {};
  integarionObj.invokeOperation(operation_name,headers,data,getVenueSuccess1,getVenueFailure1);
  
  
}

function getVenueSuccess1(response){
  //alert("get speakers ssuccess");
   //alert(JSON.stringify(response.venue_hall));
  kony.print(JSON.stringify(response.venue_hall));
  kony.print("record::" + JSON.stringify(response.venue));
  var k=-1;
  if(response.venue_hall !== null)
    {
      if(response.venue_hall.length > 0)
        {
          for( i = 0 ; i < response.venue_hall.length ; i++)
            {
              if(response.venue_hall[i].venue_hall_id==venue_id_dummy){
                   k=i;
              }
              data2[i]=[response.venue_hall[i].venue_hall_id,response.venue_hall[i].venue_hall_name];
              //alert("data1->" + data1[i] +"     " +"data2->" + data2[i]);
            }
         //alert(data1+"        "+data2);
         frmGetSession.addressline.masterData=data2;
          frmGetSession.addressline.selectedKey=data2[k][0];
        }
    }
}




function getVenueFailure1(response){
  kony.print(JSON.stringify(response));
}





var session_flag=true;
var initial=1;
var session_cnt;
/*************TO SHOW FRMGETSESSION************/

function addSessions()
{
  //alert("To add Session form");
  //frmGetSession.tbxBreak.text = "";
  //frmGetSession.tbxDate.text = "";
  frmGetSession.tbxEnd.text = "";
  frmGetSession.tbxStart.text = "";
  frmGetSession.tbxTitle.text = "";
  frmGetSession.tbxTrackName.text = "";
  frmGetSession.txtAreaDesc.text = "";
  
  if(initial < session_cnt)
    {
      session_flag = true;
      initial++;
    }
  else if(initial === session_cnt)
    {
      session_flag = false;
      initial++;
    }
     
      frmGetSession.txtAreaMsg.setEnabled(false);
  
  if(session_flag===true)
    {
      frmGetSession.btnSubmit.setEnabled(false);
      frmGetSession.btnNext.setEnabled(true);    
      //frmGetSession.btnSubmit.skin = "btn909ca3H";
      //frmGetSession.btnNext.skin = "sknEDitBtn";
    }
  else if(session_flag===false)
    {
      frmGetSession.btnSubmit.setEnabled(true);
      frmGetSession.btnNext.setEnabled(false);     
     // frmGetSession.btnSubmit.skin = "sknEDitBtn";
      //frmGetSession.btnNext.skin = "btn909ca3H";
    }
  dayList(e_startDate,e_endDate);
  getVenueID();
  getSpeakerList();  
  frmGetSession.show();
}

function dayList(start,end)
{
 // alert("in daylist");
  kony.print("in daylist");
var data2=[];
var start1 = new Date(start);
var end1 = new Date(end);
var year = start1.getFullYear();
var    month = start1.getMonth();
var    day = start1.getDate();
var    dates = [start1];
var i;
var temp,key;  
while(dates[dates.length-1] < end1) {
  dates.push(new Date(year, month, ++day));
 //dates.push("day"+i,new Date(year,month, ++day));
  //i++;
// alert(dates);
}
 for(i=0 ; i<dates.length-1;i++) 
   {
     //alert(dates[i]);
   //  alert(dates[i].toString());
     temp= (dates[i].toString()).slice(4,15);
    // key = convertMonthNameToNumber((dates[i].toString()).slice(4,8));
     key = (dates[i].toString()).slice(11,15)+"-"+convertMonthNameToNumber((dates[i].toString()).slice(4,8))+"-"+(dates[i].toString()).slice(8,10);
    // alert(key);
     data2[i]=[key,temp];
    //alert(convertMonthNameToNumber((dates[i].toString()).slice(4,8)));
     //alert(data2[i]);    
   }
  //alert(data2);
  kony.print(data2);
 frmGetSession.dayListBox.masterData=data2;
}

function convertMonthNameToNumber(monthName) {
    var myDate = new Date(monthName + " 1, 2000");
    var monthDigit = myDate.getMonth();
    return isNaN(monthDigit) ? 0 : (monthDigit + 1);
}


function onClickOfNext()
{
  getSessionDetail();  
  addSessions();
}

function onClickOfSubmit()
{
  var prev = kony.application.getPreviousForm();
  if(prev.id === "formSelectEvent" || prev.id === "frmGetSession")
    {
  getSessionDetail();
  toViewSessions();
    }
  else if(prev.id === "formViewSession")
    {
      callupdateSession();
      toViewSessions();
    }
}
/*****************TO SHOW FORMVIEWSESSION****************/
function toViewSessions()
{
 // alert("Into view sessiobn");
  readSessionData();
  formViewSession.show();
}

function showAddSpeakerForm()
{
  frmAddNewFieldsSpeaker.show();
}


/**************TO GET THE SELECTED SPEAKER FROM SEGMENT*************/
var speaker_list=[];
function getSelectedSpeaker(sessionid)
{
  
  var selected_speaker=frmGetSession.speakerListBox.selectedKeyValues;
  var i;
  for(i=0;i<selected_speaker.length;i++){
    callSessionSpeakerUpdate(selected_speaker[i][0],sessionid);
  }
}

function callSessionSpeakerUpdate(speakerid,sessionid){
  speakerid=parseInt(speakerid);
  sessionid=parseInt(sessionid);
  
  var integarionObj= kony.sdk.getCurrentInstance().getIntegrationService("fetchEvents");
  var operation_name= "konyevents_session_speaker_create";
  var data={"speaker_id":speakerid,"session_id":sessionid};
  var headers= {};
  integarionObj.invokeOperation(operation_name,headers,data,sessionSpeakerUpdateSuccess,sessionSpeakerUpdateFailure);
}

function sessionSpeakerUpdateSuccess(response){
  if(response.opstatus===0){
    kony.print("inserted successfully");
  }
  
  
  
}

function sessionSpeakerUpdateFailure(response){
  kony.print(JSON.stringify(response));
  alert(JSON.stringify(response));
  
}
function showFlexSpeakerList()
{
  getSpeakerList();
  frmGetSession.flexSelectSpeaker.setVisibility(true);
}




