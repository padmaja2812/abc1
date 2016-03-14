function getSessionDetailsToPopUp()
{
  
  //Takes the instance of the database from the mobile fabric
	var integrationObj = kony.sdk.getCurrentInstance().getIntegrationService("fetchEvents");  
	
  //Operation name as it was given in the service operations list
  	var operationName = "konyevents_session_read";
  
  	var data= {};
  	var headers= {};
    
  integrationObj.invokeOperation(operationName, headers, data, sessionSuccessCallBack, sessionFailureCallBack);
}

function sessionSuccessCallBack(response)
{
  
  kony.print("in success callback")
 var session_title=[];
  var i;
  kony.print(JSON.stringify(response));
  //alert("Displaying flxPopup");
 //frmSurevyQuestions.flxPopUp.setVisibility(true);
  
  //alert("$$$$$ Sucessfully fetched");
  //alert("$$$$$ Response"+JSON.stringify(response));
  //write code to set in the table
  //title = response.record[1].title
  if(response.session !== null)
    {
      //alert("$$$$$"+JSON.stringify(response.session));
       for( i = 0 ; i < response.session.length ; i++)
            {
              session_title[i]=[response.session[i].session_id,response.session[i].title];
              //alert("data1->" + data1[i] +"     " +"data2->" + data2[i]);
            }
         //alert(data1+"        "+data2);
             
      frmSurevyQuestions.LstBoxSessions.masterData = session_title;
      
    }
}


function sessionFailureCallBack(error)
{
  alert("Failed To Retrive sessions");
  kony.print("$$$$$$$ Failed to fetch : " + JSON.stringify(err));
}


function addingQuestionsIntoDB()
{
  var sessionid=frmSurevyQuestions.LstBoxSessions.selectedKey;
  var type=frmSurevyQuestions.radioButton.selectedKey;
  var typeQ;
  if(type=="1"){
    typeQ="slider";
  }
  if(type=="2"){
    typeQ="radio";
  }
  if(type=="3"){
    typeQ="comment";
  }
  var question=frmSurevyQuestions.tbxQuestion.text;
  
   var integrationObj = kony.sdk.getCurrentInstance().getIntegrationService("fetchEvents");  
	
  //Operation name as it was given in the service operations list
  	var operationName = "konyevents_question_table_create";
  
  	var data= {"question":question,"type":typeQ,"session_id":sessionid};
  	var headers= {};
    
  integrationObj.invokeOperation(operationName, headers, data, surveySuccessCallBack, surveyFailureCallBack);  
  
}

function  surveySuccessCallBack(response){
  alert(JSON.stringify(response));
}

function surveyFailureCallBack(response){
  alert(JSON.stringify(response));
}



function viewServeyQuestionws(){
   var sessionid=frmSurevyQuestions.LstBoxSessions.selectedKey;
   var integrationObj = kony.sdk.getCurrentInstance().getIntegrationService("fetchEvents");  
	
  //Operation name as it was given in the service operations list
  	var operationName = "konyevents_vw_survey_questions_read";
  
  	var data= {"$filter":"session_id eq "+sessionid};
  	var headers= {};
    
  integrationObj.invokeOperation(operationName, headers, data, view1, view2); 
  
}

function view1(response){
  alert(JSON.stringify(response));
   var details=response["vw_survey_questions"];
  frmServeyQuestionsList.segQuestions.widgetDataMap={"lblQ":"question","lblT":"type"};
  frmServeyQuestionsList.segQuestions.setData(details);
  frmServeyQuestionsList.show();
}

function view2(response){
  alert(JSON.stringify(response));
}