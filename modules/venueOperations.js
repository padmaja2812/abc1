function getVenue(){
  var intServiceInstance = kony.sdk.getCurrentInstance().getIntegrationService("fetchEvents");
  var operationName = "konyevents_vw_venue_details_read";
  var data = {};
  var headers = {};
  intServiceInstance.invokeOperation(operationName,headers,data,getVenueSuccessCallback,getVenueFailureCallback);
}

function getVenueSuccessCallback(response)
{
  kony.print(JSON.stringify(response.vw_venue_details));
  kony.print("record::" + JSON.stringify(response.vw_venue_details));
  //write code to set in the table
  //frmVenue.flxVenueDetails.segVenue.isVisible=true;
  if(response.vw_venue_details !== null)
    {
       if(response.vw_venue_details.length >0)
         {      
             frmVenue.flxVenueDetails.segVenue.widgetDataMap=
                       {
                          lblVenueId:"venue_id",
                          lblAddressId:"venue_address_id",
                          lblAddressName:"ad_name",
                          lblVenueName:"venue_name"
                       } ;            
               
           frmVenue.flxVenueDetails.segVenue.setData(response.vw_venue_details);
 
         }
    }
}
function getVenueFailureCallback(error)
{
  alert("Failed To Retrive Venue");
  kony.print("Failed to fetch : " + JSON.stringify(err));
}
function addVenueHelper()
{
 
  var intServiceInstance = kony.sdk.getCurrentInstance().getIntegrationService("fetchEvents");
  var operationName = "konyevents_address_read";
  var data = {};
  var headers = {};
  intServiceInstance.invokeOperation(operationName,headers,data,getAddressVenueSuccessCallback,getAddressVenueFailureCallback);
}
function getAddressVenueSuccessCallback(response)
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
          // alert(JSON.stringify(response.address));
             frmAddUpdateVenue.AddressSeg.widgetDataMap=
                       {
                      lblAddressId:"address_id",
                      lblAddress:"line_one"              
                      } ;            
               
           frmAddUpdateVenue.AddressSeg.setData(response.address);
           
           //alert(frmAddUpdateVenue.flexSelectSpeakerAddress.isVisible);
           frmAddUpdateVenue.flexSelectAddress.setVisibility(true);
           //alert(frmAddUpdateVenue.flexSelectSpeakerAddress.isVisible);
         //  frmAddUpdateVenue.btnSelectAddress.setVisibility(false);
         }
    }
 
}
function getAddressVenueFailureCallback(){}

function populateAddressDetailsVenue()
{
     var SelectedIndex = frmAddUpdateVenue.AddressSeg.selectedItems[0];
     frmAddUpdateVenue.lblAddressIdData.text=SelectedIndex.address_id;
    //  frmAddUpdateVenue.tbxAddress.text=SelectedIndex.line_one;
       frmAddUpdateVenue.flexSelectAddress.isVisible=false;
  frmAddUpdateVenue.btnSelectAddress.isVisible=true;

  
  
}
function addVenue()
{
   var address_id=frmAddUpdateVenue.lblAddressIdData.text;
  var venue_name=frmAddUpdateVenue.txtboxVenueName.text;
    createVenue(address_id,venue_name);
}
function createVenue(address_id,venue_name)
{
  var intServiceInstance = kony.sdk.getCurrentInstance().getIntegrationService("fetchEvents");
  var operationName = "konyevents_venue_create";
  var data = {address_id:address_id[0],venue_name:venue_name};
  //alert(JSON.stringify(data));
  var headers = {};
  intServiceInstance.invokeOperation(operationName,headers,data,SuccessCallback,FailureCallback);
}
function SuccessCallback(){frmVenue.show();}
function FailureCallback(){alert("Failure callback");}
function updateVenueHelper()
{
  var SelectedIndex=frmVenue.flxVenueDetails.segVenue.selectedItems[0];
  frmAddUpdateVenue.listaddress.selectedKeyValue=SelectedIndex.ad_name;
  frmAddUpdateVenue.txtboxVenueName.text=SelectedIndex.venue_name;
  frmAddUpdateVenue.btnAddVenue.isVisible=false;
  frmAddUpdateVenue.btnUpdate.isVisible=true;
  frmAddUpdateVenue.show();
}
function updateVenue()
{
  var address_id=frmAddUpdateVenue.listaddress.selectedKeys;
  var venue_name=frmAddUpdateVenue.txtboxVenueName.text;
 // alert(address_id);
    updateVenueDetails(address_id,venue_name);
}
function updateVenueDetails(address_id,venue_name)
{
  var intServiceInstance = kony.sdk.getCurrentInstance().getIntegrationService("fetchEvents");
  var operationName = "konyevents_venue_update";
 // alert(address_id);
  var data = {address_id:address_id,venue_name:venue_name};
  var headers = {};
  intServiceInstance.invokeOperation(operationName,headers,data,UpdateVenueSuccessCallback,UpdateVenueFailureCallback);
}
function UpdateVenueSuccessCallback(){frmVenue.show();}
function UpdateVenueFailureCallback(){}