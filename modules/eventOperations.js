
var flag=false;




function createEvent(title,logo_id,banner_id,short_desc,long_desc,start_date,start_time,end_date,end_time,venue_id,rating_id,added_time,added_date,is_disabled,twitterCode){
  var integrationObj = kony.sdk.getCurrentInstance().getIntegrationService("fetchEvents");
  var operationName = "konyevents_event_create";

  var rating_operationName = "konyevents_rating_create";
  data= {"rating_average": 0.00,"no_of_votes": 0};
  headers= {};
 
  integrationObj.invokeOperation(rating_operationName, headers, data, function(response){
    rating_id = response.rating[0].rating_id;
    kony.print("created rating id = "+rating_id);
    data= {"title": title,"logo_id": logo_id,"banner_id": banner_id,"short_desc": short_desc,"long_desc": long_desc,"start_date": start_date,"start_time":start_time,"end_date": end_date,"end_time":end_time,"venue_id": venue_id,"rating_id": rating_id,"added_time": added_time,"added_date": added_date,"is_disabled": is_disabled,"twitter_hash_code": twitterCode};
    integrationObj.invokeOperation(operationName, headers, data, operationSuccess, operationFailure);
  }, function(error){
    kony.print("failed to create a rating id");
    kony.print(JSON.stringify(error));
  });

}

 

function operationSuccess(response){
// response is the JSON returned data
  alert("Event Added");
  kony.print("operationSuccess:start");
  kony.print(JSON.stringify(response));
  kony.print("operationSuccess:end");
}

function operationFailure(error){
//error is the error object
  alert("Failed to create the Event");
  kony.print("operationFailure:start");
  kony.print(JSON.stringify(error));
  kony.print("operationFailure:end");
}


function getEvents(){
  var intServiceInstance = kony.sdk.getCurrentInstance().getIntegrationService("fetchEvents");
  var operationName = "konyevents_event_read";
  var data = {};
  var headers = {};
  intServiceInstance.invokeOperation(operationName,headers,data,getEventsSuccessCallback,getEventsFailureCallback);
}

function getEventsSuccessCallback(response)
{
  kony.print(JSON.stringify(response.event));
  kony.print("record::" + JSON.stringify(response.event));
  //write code to set in the table
  //title = response.record[1].title
  if(response.event !== null)
    {
       if(response.event.length >0)
         {
           var len;
          
             frmEventDetails.SegEventDetails.widgetDataMap =
                       {
                      
                      lblTitle:"title",
                      lblVenue:"venue_id",
                      lblAddedTime:"added_time",
                      lblAddedDate:"added_date",
                      lblDesc:"long_desc",
                      lblStartDate:"start_date",
                      lblEndDate:"end_date",
                      lblStartTime:"start_time",
                      lblEndTime:"end_time"
                      } ;            
               
           frmEventDetails.SegEventDetails.setData(response.event);
         }
    }
  frmEventDetails.show();
  
}

function getEventsFailureCallback(error)
{
 // alert("Failed To Retrive Events");
  kony.print("Failed to fetch : " + JSON.stringify(error));
}



function getCurrentdate()
	{
		var d = new Date();
		var curr_date = d.getDate();
		var curr_month = d.getMonth()+1;
		var curr_year = d.getFullYear();
      
      if(curr_date<10)
        {
          curr_date = "0"+curr_date;
        }
      if(curr_month<10)
        {
          curr_month="0"+curr_month;
        }
		var formattedDate = curr_year + "-"  +curr_month + "-" + curr_date;
		kony.print("formattedDate-------->"+formattedDate);
		return formattedDate;
	}

	function getTime()
	{
		var d = new Date();
		var min=d.getMinutes();
		var hrs=d.getHours();
		kony.print("hours :"+d.getHours())
        
	
		
		var time=hrs+":"+min+":"+"00";
          //var time = hrs+":"+min
		
	return time;
		}


function getAddedTime()
{
  var AddedTime =  getCurrentdate() ;
  var AddedDate =  getTime();
  frmUpdateAndAddEvent.lblAddedTime.text = AddedTime;
  frmUpdateAndAddEvent.lblAddedDate.text= AddedDate;
  frmUpdateAndAddEvent.show();
}


function AddEvent()
{
  
  var title = frmUpdateAndAddEvent.txtTitle.text;
  var StartDate = frmUpdateAndAddEvent.txtStartDate.text ;
  var StartTime = frmUpdateAndAddEvent.txtStartTime.text;
  var EndDate = frmUpdateAndAddEvent.txtEndDate.text;
  var EndTime=  frmUpdateAndAddEvent.txtEndTime.text;
  var AddedTime = frmUpdateAndAddEvent.lblAddedTime.text;
  var AddedDate= frmUpdateAndAddEvent.lblAddedDate.text;
  var Venue = frmUpdateAndAddEvent.txtVenue.text;
  var LogoId= upload_lat_id;
  var BannerId= frmUpdateAndAddEvent.txtBannerID.text;
  var RatingId= frmUpdateAndAddEvent.txtRatingID.text;
  var ShortDesc= frmUpdateAndAddEvent.txtShortDesc.text;
  var LongDesc = frmUpdateAndAddEvent.txtLongDesc.text;
  var Visible=  frmUpdateAndAddEvent.txtIsVisible.text;
  var twitterCode = frmUpdateAndAddEvent.tbxTwitter.text;
  
  createEvent(title,LogoId,BannerId,ShortDesc,LongDesc,StartDate,StartTime,EndDate,EndTime,Venue,RatingId,AddedTime,AddedDate,Visible,twitterCode);
}

function updateEventHelper()
{
  var SelectedIndex = frmEventDetails.SegEventDetails.selectedItems[0];
 // startDate = SelectedIndex.start_date_time;
  //startDate1 = startDate.split(" ");
  //sdate = startDate1[0];
  //stime = startDate1[1];
  
  //endDate = SelectedIndex.end_date_time;
  //endDate1= endDate.split(" ");
  //edate= endDate1[0];
  //etime=endDate1[1];
  
  frmUpdateAndAddEvent.txtTitle.text = SelectedIndex.title;
  frmUpdateAndAddEvent.txtVenue.text = SelectedIndex.venue_id;
  //frmUpdateAndAddEvent.txtAddedTime.text = SelectedIndex.added_time;
  frmUpdateAndAddEvent.txtLongDesc.text = SelectedIndex.long_desc;
  frmUpdateAndAddEvent.txtStartDate.text = SelectedIndex.start_date;
  frmUpdateAndAddEvent.txtStartTime.text =SelectedIndex.start_time;
  frmUpdateAndAddEvent.txtEndDate.text = SelectedIndex.end_date;
  frmUpdateAndAddEvent.txtEndTime.text = SelectedIndex.end_time;
  frmUpdateAndAddEvent.txtLogoID.text = SelectedIndex.logo_id;
  frmUpdateAndAddEvent.txtBannerID.text=SelectedIndex.banner_id;
  frmUpdateAndAddEvent.txtRatingID.text=SelectedIndex.rating_id;
  frmUpdateAndAddEvent.txtIsVisible.text=SelectedIndex.is_disabled;
  frmUpdateAndAddEvent.txtShortDesc.text=SelectedIndex.short_desc;
 // frmUpdateAndAddEvent.tbxTwitter.text = SelectedIndex.twitter_hash_code;
  frmUpdateAndAddEvent.btnUpdateAdd.setVisibility(false);
  frmUpdateAndAddEvent.btnUpdate.setVisibility(true);
  frmUpdateAndAddEvent.btnProducts.setVisibility(true);
  frmUpdateAndAddEvent.btnSessions.setVisibility(true);
  frmUpdateAndAddEvent.txtEndDate.setVisibility(true);
  frmUpdateAndAddEvent.txtStartDate.setVisibility(true);
  frmUpdateAndAddEvent.txtRatingID.setEnabled(false);
  frmUpdateAndAddEvent.lblAddedDate.text = SelectedIndex.added_date;
  frmUpdateAndAddEvent.lblAddedTime.text = SelectedIndex.added_time;
  
  
  
  
  frmUpdateAndAddEvent.show();
  
  
}


function updateEventDetails()
{
  var SelectedIndex = frmEventDetails.SegEventDetails.selectedItems[0];
  var title = frmUpdateAndAddEvent.txtTitle.text;
  var StartDate = frmUpdateAndAddEvent.txtStartDate.text;
  var StartTime =frmUpdateAndAddEvent.txtStartTime.text;
  var EndDate = frmUpdateAndAddEvent.txtEndDate.text;
  var EndTime= frmUpdateAndAddEvent.txtEndTime.text;
  //var AddedTime = frmUpdateAndAddEvent.txtAddedTime.text;
  var Venue = frmUpdateAndAddEvent.txtVenue.text;
  var LogoId= frmUpdateAndAddEvent.txtLogoID.text;
  var BannerId= frmUpdateAndAddEvent.txtBannerID.text;
 // var RatingId= frmUpdateAndAddEvent.txtRatingID.text;
  var ShortDesc= frmUpdateAndAddEvent.txtShortDesc.text;
  var LongDesc = frmUpdateAndAddEvent.txtLongDesc.text;
  var Visible= frmUpdateAndAddEvent.txtIsVisible.text;
  var eventId= SelectedIndex.event_id;
 // var AddedTime =SelectedIndex.added_time;
  var AddedTime = SelectedIndex.added_time;
  var AddedDate = SelectedIndex.added_date;
  var RatingId= SelectedIndex.rating_id;
  var twitterCode = frmUpdateAndAddEvent.tbxTwitter.text;
  
  updateEvent(eventId,title,LogoId,BannerId,ShortDesc,LongDesc,StartDate,StartTime,EndDate,EndTime,Venue,RatingId,AddedTime,AddedDate,Visible,twitterCode);
}

function updateEvent(event_id,title,logo_id,banner_id,short_desc,long_desc,start_date,start_time,end_date,end_time,venue_id,rating_id,added_time,added_date,is_disabled,twitterCode){
  var integrationObj = kony.sdk.getCurrentInstance().getIntegrationService("fetchEvents");
  var operationName = "konyevents_event_update ";
  alert(twitterCode);
  data= {"event_id":event_id,"title": title,"logo_id": logo_id,"banner_id": banner_id,"short_desc": short_desc,"long_desc": long_desc,"start_date": start_date,"start_time":start_time,"end_date": end_date,"end_time":end_time,"venue_id": venue_id,"rating_id": rating_id,"added_time": added_time,"added_date": added_date,"is_disabled": is_disabled,"twitter_hash_code": twitterCode};
  headers= {};
  integrationObj.invokeOperation(operationName, headers, data, updateSuccess, updateFailure);
}

 

function updateSuccess(response){
// response is the JSON returned data
//  alert("Event Updated");
  kony.print("operationSuccess:start");
  kony.print(JSON.stringify(response));
  kony.print("operationSuccess:end");
}

function updateFailure(error){
//error is the error object
  alert("Error: Event could not be updated");
  kony.print("operationFailure:start");
  kony.print(JSON.stringify(error));
  kony.print("operationFailure:end");
}





function getVenueforEvents(){
  var intServiceInstance = kony.sdk.getCurrentInstance().getIntegrationService("fetchEvents");
  var operationName = "konyevents_vw_venue_details_read";
  var data = {};
  var headers = {};
  intServiceInstance.invokeOperation(operationName,headers,data,getVenueForEventsSuccessCallback,getVenueforEventsFailureCallback);
}

function getVenueForEventsSuccessCallback(response)
{
  
  
  kony.print(JSON.stringify(response.vw_venue_details));
  kony.print("record::" + JSON.stringify(response.vw_venue_details));
  //write code to set in the table
  //frmVenue.flxVenueDetails.segVenue.isVisible=true;
  if(response.vw_venue_details !== null)
    {
       if(response.vw_venue_details.length >0)
         {      
           response.vw_venue_details.template = flexVenueForEvents;
             frmUpdateAndAddEvent.VenueSeg.widgetDataMap=
                       {
                          lblVenueId:"venue_id",
                          lblVenueName:"venue_name",
                       } ;            
              // frmUpdateAndAddEvent.VenueSeg.removeAll();
               frmUpdateAndAddEvent.VenueSeg.setData(response.vw_venue_details);
               frmUpdateAndAddEvent.flexSelectVenue.isVisible=true;
           
 
         }
    }
}
function getVenueforEventsFailureCallback(error)
{
  alert("Failed To Retrive Venue");
  kony.print("Failed to fetch : " + JSON.stringify(error));
}


function SelectingVenueForEvents()
{
   var SelectedIndex = frmUpdateAndAddEvent.VenueSeg.selectedItems[0];
   frmUpdateAndAddEvent.txtVenue.text = SelectedIndex.venue_id;
   frmUpdateAndAddEvent.txtVenueName.text = SelectedIndex.venue_name;
   frmUpdateAndAddEvent.flexSelectVenue.setVisibility(false);
  
}