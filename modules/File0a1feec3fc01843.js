function getSpeaker(){
  var intServiceInstance = kony.sdk.getCurrentInstance().getIntegrationService("fetchEvents");
  var operationName = "konyevents_speaker_read";
  var data = {};
  var headers = {};
  intServiceInstance.invokeOperation(operationName,headers,data,getSpeakerSuccessCallback,getSpeakerFailureCallback);
}

function getSpeakerSuccessCallback(response)
{
  kony.print(JSON.stringify(response.speaker));
  kony.print("record::" + JSON.stringify(response.speaker));
  //write code to set in the table
  //title = response.record[1].title
  if(response.speaker !== null)
    {
       if(response.speaker.length >0)
         {
           var len;
          
             frmSpeakerDesktop.segmentSpeaker.widgetDataMap =
                       {
                      
                      lblSpeakerId:"speaker_id",
                      lblSpeakerName:"speaker_name",
                      lblSpeakerDetail:"speaker_details",
                      lblSpeakerDepartment:"speaker_dept",
                      lblSpeakerJob:"speaker_job_desc",
                    
                      lblSpeakerFb:"speaker_fb_detail",
                      lblSpeakerTwitter:"speaker_twitter_detail",
                      lblSpeakerGmail:"speaker_gmail_detail",
                      lblSpeakerLinkedin:"speaker_linkedin_detail"
                      } ;            
               
           frmSpeakerDesktop.segmentSpeaker.setData(response.speaker);
         }
    }
  
}

function getSpeakerFailureCallback(error)
{
  alert("Failed To Retrive Speakers");
  kony.print("Failed to fetch : " + JSON.stringify(err));
}


