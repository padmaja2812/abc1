function addVenueHallHelper()
{
 
  var intServiceInstance = kony.sdk.getCurrentInstance().getIntegrationService("fetchEvents");
  var operationName = "konyevents_vw_venue_details_read";
  var data = {};
  var headers = {};
  intServiceInstance.invokeOperation(operationName,headers,data,getVenueforHallSuccessCallback,getVenueforHallFailureCallback);
}
function getVenueforHallSuccessCallback(response)
{
  var ary=[];
  for(i=0;i<response.vw_venue_details.length;i++)
    {
      ary[i]=[response.vw_venue_details[i].venue_id,response.vw_venue_details[i].venue_id+"."+response.vw_venue_details[i].venue_name];
    }
   frmAddUpdateFloorPlans.lstBoxVenueId.masterData=ary;
}
function getVenueforHallFailureCallback(){}
function addVenueHall()
{
  var venue_id=frmAddUpdateFloorPlans.lstBoxVenueId.selectedKey;
  var hall_id=upload_lat_id;
  var hall_desc=frmAddUpdateFloorPlans.txtFloorDesc.text;
  var hall_name=frmAddUpdateFloorPlans.txtBoxFloorNumber.text;
  createvenue_hall(venue_id,hall_id,hall_desc,hall_name);
}
function createvenue_hall(venue_id,hall_id,hall_desc,hall_name)
{
  var intServiceInstance = kony.sdk.getCurrentInstance().getIntegrationService("fetchEvents");
  var operationName = "konyevents_venue_hall_create";
  var data={venue_hall_name:hall_name,venue_id:parseInt(venue_id),venue_hall_description:hall_desc,venue_hall_image_id:parseInt(hall_id)};
   var headers = {};
 // alert(JSON.stringify(data));
  intServiceInstance.invokeOperation(operationName,headers,data,uploadhallSuccess,uploadhallFailure);
}
function uploadhallSuccess()
{
  alert("success");
 // frmAddUpdateFloorPlans.destroy();
  //frmAddUpdateFloorPlans.show();
  frmFloorMaps.show();
}
function uploadhallFailure(response)
{
  alert("failure  :"+JSON.stringify(response));
}
function getvenuehalldetails()
{
  var intServiceInstance = kony.sdk.getCurrentInstance().getIntegrationService("fetchEvents");
  var operationName = "konyevents_vw_venue_hall_details_read";
  var data={};
   var headers = {};
 // alert(JSON.stringify(data));
  intServiceInstance.invokeOperation(operationName,headers,data,successhall,failurehall);
}
function successhall(response)
{
 if(response.vw_venue_hall_details !== null)
    {
     // alert(JSON.stringify(response.vw_venue_hall_details ));
       if(response.vw_venue_hall_details.length >0)
         {     
            for(var i=0;i<response.vw_venue_hall_details.length;i++)
            {
              response.vw_venue_hall_details[i]["upload_id_blob1"]={"base64":response.vw_venue_hall_details[i]["upload_id_blob"]};
            } 
           
             frmFloorMaps.flxhalls.segFloormaps.widgetDataMap=
                       {
                          lblVenueId:"venue_name",
                          lblHallName:"venue_hall_name",
                          lblHallDesc:"venue_hall_description",
                          imgFloorMap:"upload_id_blob1"
                         // imgFloorMap:"upload_id_blob"
                       } ;        
          // alert(JSON.stringify(frmFloorMaps.segFloormaps.imgFloorMap.base64))
               
           frmFloorMaps.flxhalls.segFloormaps.setData(response.vw_venue_hall_details);
 
         }
    }
}
function failurehall()
{}
function updateVenuehallHelper()
{
  
  var SelectedIndex=frmFloorMaps.flxhalls.segFloormaps.selectedItems[0];
  frmAddUpdateFloorPlans.txtBoxFloorNumber.text=SelectedIndex.venue_hall_name;
  frmAddUpdateFloorPlans.txtFloorDesc.text=SelectedIndex.venue_hall_description;
  frmAddUpdateFloorPlans.lstBoxVenueId.selectedKeyValue=SelectedIndex.venue_name;
  frmAddUpdateFloorPlans.btnUpdate.isVisible=true;
  frmAddUpdateFloorPlans.btnAddFloorPlan.isVisible=false;
  frmAddUpdateFloorPlans.show();
}
function updateVenueHallhelp()
{
  var venue_id=frmAddUpdateFloorPlans.lstBoxVenueId.selectedKey;
  var hall_id=upload_lat_id;
  var hall_desc=frmAddUpdateFloorPlans.txtFloorDesc.text;
  var hall_name=frmAddUpdateFloorPlans.txtBoxFloorNumber.text;
  updatevenue_hall(venue_id,hall_id,hall_desc,hall_name);
}
function updatevenue_hall(venue_id,hall_id,hall_desc,hall_name)
{
  var intServiceInstance = kony.sdk.getCurrentInstance().getIntegrationService("fetchEvents");
  var operationName = "konyevents_venue_hall_update";
  var data={venue_hall_name:hall_name,venue_id:parseInt(venue_id),venue_hall_description:hall_desc,venue_hall_image_id:parseInt(hall_id)};
   var headers = {};
 // alert(JSON.stringify(data));
  intServiceInstance.invokeOperation(operationName,headers,data,updatehallSuccess,updatehallFailure);
}
function updatehallSuccess(response)
{
   frmAddUpdateFloorPlans.btnUpdate.isVisible=false;
  frmAddUpdateFloorPlans.btnAddFloorPlan.isVisible=true;
  frmFloorMaps.show();
}
