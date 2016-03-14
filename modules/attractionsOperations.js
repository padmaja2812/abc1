function addAttractionsHelper()
{
 
  var intServiceInstance = kony.sdk.getCurrentInstance().getIntegrationService("fetchEvents");
  var operationName = "konyevents_vw_venue_details_read";
  var data = {};
  var headers = {};
  intServiceInstance.invoskeOperation(operationName,headers,data,getVenueforAttractionsSuccessCallback,getVenueforAttractionsFailureCallback);
}
function getVenueforAttractionsSuccessCallback(response)
{
  var ary=[];
  for(i=0;i<response.vw_venue_details.length;i++)
    {
      ary[i]=[response.vw_venue_details[i].venue_id,response.vw_venue_details[i].venue_id+"."+response.vw_venue_details[i].venue_name];
    }
  frmAddUpdateVenue.listaddress.masterData=ary;
 
}
function getVenueforAttractionsFailureCallback(){}
function addAttractions()
{
   var title=frmAddAttractions.txtboxTitle.text;
  var lat=frmAddAttractions.txtboxlat.text;
  var long=frmAddAttractions.txtBoxLongitude.text;
  var venue_id=frmAddAttractions.listBoxVenue.selectedKey;
  var detail=frmAddAttractions.txtAreaDetail.text;
  var isdisabled=frmAddAttractions.btnIsAnonymous.selectedKeyValue;
    createAttractions(title,lat,long,venue_id,detail,isdisabled);
}
function createAttractions(title,lat,long,venue_id,detail,isdisabled)
{
  var intServiceInstance = kony.sdk.getCurrentInstance().getIntegrationService("fetchEvents");
  var operationName = "konyevents_venue_attractions_create";
  var data = {detail:detail,title:title,latitude:lat,longitude:long,venue_id:venue_id,is_disabled:isdisabled};
  var headers = {};
 // alert(JSON.stringify(data));
  intServiceInstance.invokeOperation(operationName,headers,data,Success,Failure);
}
function Success(res){
 // alert(JSON.stringify(res));
  frmAttractions.show();}
function Failure(){alert("in failure");}
function updateAttractionsHelper()
{
  var SelectedIndex=frmAttractions.flxAttractions.attractionsSeg.selectedItems[0];
  frmAddAttractions.txtboxTitle.text=SelectedIndex.title;
  frmAddAttractions.txtboxlat.text=SelectedIndex.latitude;
  frmAddAttractions.txtBoxLongitude.text=SelectedIndex.longitude;
  frmAddAttractions.listBoxVenue.selectedKey=SelectedIndex.venue_id;
  frmAddAttractions.txtAreaDetail.text=SelectedIndex.detail;
  frmAddAttractions.btnAddAttraction.isVisible=false;
  frmAddAttractions.btnUpdate.isVisible=true;  
  frmAddAttractions.show();
}
function updateAttractions()
{
  var title=frmAddAttractions.txtboxTitle.text;
  var lat=frmAddAttractions.txtboxlat.text;
  var long=frmAddAttractions.txtBoxLongitude.text;
  var venue_id=frmAddAttractions.listBoxVenue.selectedKey;
  var detail=frmAddAttractions.txtAreaDetail.text;
  UpdateAttractions(title,lat,long,venue_id,detail);
}
function UpdateAttractions(title,lat,long,venue_id,detail)
{
  var intServiceInstance = kony.sdk.getCurrentInstance().getIntegrationService("fetchEvents");
  var operationName = "konyevents_venue_attractions_update";
  var data = {detail:detail,title:title,latitude:lat,longitude:long,venue_id:venue_id};
  var headers = {};
  intServiceInstance.invokeOperation(operationName,headers,data,Success,Failure);
}
function Success(){frmAttractions.show();}
function Failure(){}
function addAttractionsHelper()
{
  var intServiceInstance = kony.sdk.getCurrentInstance().getIntegrationService("fetchEvents");
  var operationName = "konyevents_vw_venue_details_read";
  var data = {};
  var headers = {};
  intServiceInstance.invokeOperation(operationName,headers,data,helperSuccess,helperFailure);
}
function helperSuccess(response)
{
 // alert("in success");
  var ary=[];
//  alert(response.vw_venue_details);
  for(i=0;i<response.vw_venue_details.length;i++)
    {
      ary[i]=[response.vw_venue_details[i].venue_id,response.vw_venue_details[i].venue_id+"."+response.vw_venue_details[i].venue_name];
    }
  frmAddAttractions.listBoxVenue.masterData=ary;
}
function helperFailure(){}
function getAttractions()
{
   var intServiceInstance = kony.sdk.getCurrentInstance().getIntegrationService("fetchEvents");
  var operationName = "konyevents_vw_venue_attractions_details_read";
  var data = {};
  var headers = {};
  intServiceInstance.invokeOperation(operationName,headers,data,attractionsSuccess,attractionsFailure);
}
function attractionsSuccess(response)
{
  if(response.vw_venue_attractions_details!==null)
    {
       if(response.vw_venue_attractions_details.length >0)
         {  
         //  alert(JSON.stringify(response.vw_venue_attractions_details));
           frmAttractions.flxAttractions.attractionsSeg.widgetDataMap=
             {
             lblAttractionTitle:"title",
             lblLatitude:"latitude",
             lblLongitude:"longitude",
             lblDetail:"detail",
             lblVenueid:"venue_name",
             lblisdisabled:"is_disabled"
              };
           frmAttractions.flxAttractions.attractionsSeg.setData(response.vw_venue_attractions_details);
            }
    }
}
function attractionsFailure(){}