



function createSpeaker(speaker_name,speaker_details,speaker_dept,speaker_job_desc,speaker_fb_detail,speaker_twitter_detail,speaker_gmail_detail,speaker_linkedin_detail,speaker_addressId){
  var integrationObj = kony.sdk.getCurrentInstance().getIntegrationService("fetchEvents");
  var operationName = "konyevents_speaker_create";
  data= {"speaker_name": speaker_name,"speaker_details": speaker_details,"speaker_dept": speaker_dept,"speaker_job_desc": speaker_job_desc,"speaker_fb_detail": speaker_fb_detail,"speaker_twitter_detail": speaker_twitter_detail,"speaker_gmail_detail": speaker_gmail_detail,"speaker_linkedin_detail": speaker_linkedin_detail,"speaker_address_id":speaker_addressId};
  headers= {};
  integrationObj.invokeOperation(operationName, headers, data, operationSuccessSpeaker, operationFailureSpeaker);
}

 

function operationSuccessSpeaker(response){
// response is the JSON returned data
  alert("speaker Added");
  kony.print("operationSuccess:start");
  kony.print(JSON.stringify(response));
  kony.print("operationSuccess:end");
}

function operationFailureSpeaker(error){
//error is the error object
  alert("Operation Failed");
  kony.print("operationFailure:start");
  kony.print(JSON.stringify(error));
  kony.print("operationFailure:end");
}


function getSpeaker(){
  var intServiceInstance = kony.sdk.getCurrentInstance().getIntegrationService("fetchEvents");
  var operationName = "konyevents_vw_speaker_address_details_read";
  var data = {};
  var headers = {};
  intServiceInstance.invokeOperation(operationName,headers,data,getSpeakerSuccessCallback,getSpeakerFailureCallback);
}

function getSpeakerSuccessCallback(response)
{
  alert(JSON.stringify(response.speaker));
  kony.print("record::" + JSON.stringify(response.speaker));
  //write code to set in the table
  //title = response.record[1].title
  
  if(response.vw_speaker_address_details !== null)
    {
       if(response.vw_speaker_address_details.length >0)
         {
           var len;
          
             frmSpeakerDesktop.segmentSpeaker.widgetDataMap =
                       {
                      
                      lblSpeakerId:"speaker_id",
                      lblSpeakerName:"speaker_name",
                      lblSpeakerDetail:"speaker_details",
                      lblSpeakerDepartment:"speaker_dept",
                      lblSpeakerJob:"speaker_job_desc",
                      lblFb:"speaker_fb_detail",
                      lblTwitter:"speaker_twitter_detail",
                      lblGmail:"speaker_gmail_detail",
                      lblLinkedin:"speaker_linkedin_detail",
                      lblSpeakerAddressId:"line_one"
                      } ;            
               
           frmSpeakerDesktop.segmentSpeaker.setData(response.vw_speaker_address_details);
         }
    }
  frmSpeakerDesktop.show();
  
}

function getSpeakerFailureCallback(error)
{
  alert("Failed To Retrive Speakers");
  kony.print("Failed to fetch : " + JSON.stringify(error));
}


function AddSpeaker()
{
  var speakerId = frmAddNewFieldsSpeaker.tbxSpeakerId.text;
  var speakerName = frmAddNewFieldsSpeaker.tbxSpeakerName.text;
  var speakerDetail = frmAddNewFieldsSpeaker.tbxSpeakerDetail.text;
  var speakerDepartment = frmAddNewFieldsSpeaker.tbxSpeakerDepartment.text;
  var speakerJob = frmAddNewFieldsSpeaker.tbxSpeakerJob.text;
  var speakerFb= frmAddNewFieldsSpeaker.tbxFb.text;
  var speakerTwitter= frmAddNewFieldsSpeaker.tbxTwitter.text;
  var speakerGmail= frmAddNewFieldsSpeaker.tbxGmail.text;
  var speakerLinkedin= frmAddNewFieldsSpeaker.tbxLinkedin.text;
  //var speakerAddress= frmAddNewFieldsSpeaker.tbxAddress.text;
  var speakerAddressId="1";
      //frmAddNewFieldsSpeaker.tbxAddressId.text;
 
 
  
  createSpeaker(speakerName,speakerDetail,speakerDepartment,speakerJob,speakerFb,speakerTwitter,speakerGmail,speakerLinkedin,speakerAddressId);
}

function updateSpeakerHelper()
{
  
  var SelectedIndex = frmSpeakerDesktop.segmentSpeaker.selectedItems[0];
 frmAddNewFieldsSpeaker.tbxSpeakerId.text = SelectedIndex.speaker_id;
  frmAddNewFieldsSpeaker.tbxSpeakerName.text = SelectedIndex.speaker_name;
  frmAddNewFieldsSpeaker.tbxSpeakerDetail.text = SelectedIndex.speaker_details;
 frmAddNewFieldsSpeaker.tbxSpeakerDepartment.text= SelectedIndex.speaker_dept;
 frmAddNewFieldsSpeaker.tbxSpeakerJob.text = SelectedIndex.speaker_job_desc;
  frmAddNewFieldsSpeaker.tbxFb.text= SelectedIndex.speaker_fb_detail;
  frmAddNewFieldsSpeaker.tbxTwitter.text = SelectedIndex.speaker_twitter_detail;
  frmAddNewFieldsSpeaker.tbxGmail.text=SelectedIndex.speaker_gmail_detail;
  frmAddNewFieldsSpeaker.tbxLinkedin.text=SelectedIndex.speaker_linkedin_detail;
   
  frmAddNewFieldsSpeaker.btnAdd.setVisibility(false);
  frmAddNewFieldsSpeaker.btnUpdate.setVisibility(true);
  
  frmAddNewFieldsSpeaker.show();
  
  
}


function updateSpeakerDetails()
{
  var SelectedIndex = frmSpeakerDesktop.segmentSpeaker.selectedItems[0];
  var speakerId = SelectedIndex.speaker_id;
  var speakerName = frmAddNewFieldsSpeaker.tbxSpeakerName.text;
  var speakerDetail = frmAddNewFieldsSpeaker.tbxSpeakerDetail.text;
  var speakerDepartment = frmAddNewFieldsSpeaker.tbxSpeakerDepartment.text;
  var speakerJob = frmAddNewFieldsSpeaker.tbxSpeakerJob.text;
  var speakerFb= frmAddNewFieldsSpeaker.tbxFb.text;
  var speakerTwitter= frmAddNewFieldsSpeaker.tbxTwitter.text;
  var speakerGmail= frmAddNewFieldsSpeaker.tbxGmail.text;
  var speakerLinkedin= frmAddNewFieldsSpeaker.tbxLinkedin.text;
 
  
  updateSpeaker(speakerId,speakerName,speakerDetail,speakerDepartment,speakerJob,speakerFb,speakerTwitter,speakerGmail,speakerLinkedin);
}

function updateSpeaker(speaker_id,speaker_name,speaker_details,speaker_dept,speaker_job_desc,speaker_fb_detail,speaker_twitter_detail,speaker_gmail_detail,speaker_linkedin_detail){
  var integrationObj = kony.sdk.getCurrentInstance().getIntegrationService("fetchEvents");
  var operationName = "konyevents_speaker_update ";
  data= {"speaker_id": speaker_id,"speaker_name": speaker_name,"speaker_details": speaker_details,"speaker_dept": speaker_dept,"speaker_job_desc": speaker_job_desc,"speaker_fb_detail": speaker_fb_detail,"speaker_twitter_detail": speaker_twitter_detail,"speaker_gmail_detail": speaker_gmail_detail,"speaker_linkedin_detail": speaker_linkedin_detail};
  headers= {};
  integrationObj.invokeOperation(operationName, headers, data, updateSuccessSpeaker, updateFailureSpeaker);
}

 

function updateSuccessSpeaker(response){
// response is the JSON returned data
  alert("Speaker Updated");
  kony.print("operationSuccess:start");
  kony.print(JSON.stringify(response));
  kony.print("operationSuccess:end");
}

function updateFailureSpeaker(error){
//error is the error object
  alert("Error: Speaker could not be updated");
  kony.print("operationFailure:start");
  kony.print(JSON.stringify(error));
  kony.print("operationFailure:end");
}


function getSpeakerAddress(){
  var intServiceInstance = kony.sdk.getCurrentInstance().getIntegrationService("fetchEvents");
  var operationName = "konyevents_address_read";
  var data = {};
  var headers = {};
  intServiceInstance.invokeOperation(operationName,headers,data,getSpeakerAddressSuccessCallback,getSpeakerAddressFailureCallback);
}
function getSpeakerAddressSuccessCallback(response)
{
  kony.print(JSON.stringify(response.address));
  kony.print("record::" + JSON.stringify(response.address));
  //write code to set in the table
  //title = response.record[1].title
  if(response.address !== null)
    {
       if(response.address.length >0)
         {
           var len;
           alert(JSON.stringify(response.address));
             frmAddNewFieldsSpeaker.speakerAddressSeg.widgetDataMap=
                       {
                      
                      lblAddressId:"address_id",
                      lblAddress:"line_one"
                 
                     
                      } ;            
               
           frmAddNewFieldsSpeaker.speakerAddressSeg.setData(response.address);
           alert(frmAddNewFieldsSpeaker.speakerAddressSeg.data);
           frmAddNewFieldsSpeaker.flexSelectSpeakerAddress.isVisible=true;
         }
    }
  
}
function getSpeakerAddressFailureCallback(error)
{
  alert("Failed To Retrive Address");
  kony.print("Failed to fetch : " + JSON.stringify(err));
}


function populateAddressDetails()
{
     var SelectedIndex = frmAddNewFieldsSpeaker.speakerAddressSeg.selectedItems[0];
     frmAddNewFieldsSpeaker.tbxAddressId.text=SelectedIndex.address_id;
      frmAddNewFieldsSpeaker.tbxAddress.text=SelectedIndex.line_one;
       frmAddNewFieldsSpeaker.flexSelectSpeakerAddress.isVisible=false;

  
  
}