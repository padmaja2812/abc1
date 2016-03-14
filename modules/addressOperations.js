function createAddress(name,line_one,line_two,city,zip,phone_one,phone_two,longitude,latitude,email,website)
{
  alert(name);
  var integrationObj=kony.sdk.getCurrentInstance.getIntegrationService("fetchEvents");
  var operationName = "konyevents_address_create";
  var data={name:name,line_one:line_one,line_two:line_two,city:city,zip:zip,phone_one:phone_one,phone_two:phone_two,longitude:longitude,latitude:latitude,email:email,website:website};
  var headers= {};
  alert("data is "+data);
  integrationObj.invokeOperation(operationName, headers, data, operationSuccess, operationFailure);
   alert("invoked operation");
}
function operationSuccess(response){
// response is the JSON returned data
 // alert("Address Added");
  kony.print("operationSuccess:start");
  kony.print(JSON.stringify(response));
  kony.print("operationSuccess:end");
  frmAddress.show();
}

function operationFailure(error){
//error is the error object
  alert("Operation Failed");
  kony.print("operationFailure:start");
  kony.print(JSON.stringify(error));
  kony.print("operationFailure:end");
}
function getAddress(){
  var intServiceInstance = kony.sdk.getCurrentInstance().getIntegrationService("fetchEvents");
  var operationName = "konyevents_address_read";
  var data = {};
  var headers = {};
  intServiceInstance.invokeOperation(operationName,headers,data,getAddressSuccessCallback,getAddressFailureCallback);
}
function getAddressSuccessCallback(response)
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
             frmAddress.segAddress.widgetDataMap=
                       {
                      
                      lblName:"name",
                      lblAddress1:"line_one",
                      lblAddress2:"line_two",
                      lblCity:"city",
                      lblZip:"zip",
                      lblPhone1:"phone_one",
                      lblPhone2:"phone_two",
                      lblEmail:"email",
                      lblWebsite:"website",
                      lblLat:"latitude",
                      lblLong:"longitude"
                      } ;            
               
           frmAddress.segAddress.setData(response.address);
         }
    }
  
}
function getAddressFailureCallback(error)
{
  alert("Failed To Retrive Address");
  kony.print("Failed to fetch : " + JSON.stringify(err));
}
function addAddress()
{
  var name=frmAddUpdateAddress.txtBoxName.text;
  var line_one=frmAddUpdateAddress.txtBoxAddress1.text;
  var line_two=frmAddUpdateAddress.txtBoxAddress2.text;
  var city=frmAddUpdateAddress.txtBoxCity.text;
  var zip=frmAddUpdateAddress.txtBoxZip.text;
  var phone_one=frmAddUpdateAddress.txtboxphone1.text;
  var phone_two=frmAddUpdateAddress.txtBoxPhone2.text;
  var longitude=frmAddUpdateAddress.txtboxlong.text;
  var latitude=frmAddUpdateAddress.txtBoxLat.text;
  var email=frmAddUpdateAddress.txtboxemail.text;
  var website=frmAddUpdateAddress.txtboxwebsite.text;
    createAddress(name,line_one,line_two,city,zip,phone_one,phone_two,longitude,latitude,email,website);
}
function updateAddressHelper()
{
  var SelectedIndex=frmAddress.flxSegAddress.segAddress.selectedItems[0];
  alert(JSON.stringify(SelectedIndex));
  frmAddUpdateAddress.txtBoxName.text=SelectedIndex.name;
  frmAddUpdateAddress.txtBoxAddress1.text=SelectedIndex.line_one;
  frmAddUpdateAddress.txtBoxAddress2.text=SelectedIndex.line_two;
  frmAddUpdateAddress.txtBoxCity.text=SelectedIndex.city;
  frmAddUpdateAddress.txtBoxZip.text=SelectedIndex.zip;
  frmAddUpdateAddress.txtBoxLat.text=SelectedIndex.latitude;
  frmAddUpdateAddress.txtboxlong.text=SelectedIndex.longitude;
  frmAddUpdateAddress.txtboxphone1.text=SelectedIndex.phone_one;
  frmAddUpdateAddress.txtBoxPhone2.text=SelectedIndex.phone_two;
  frmAddUpdateAddress.txtboxemail.text=SelectedIndex.email;
  frmAddUpdateAddress.txtboxwebsite.text=SelectedIndex.website;
  frmAddUpdateAddress.btnAddAddress.isVisible=false;
  frmAddUpdateAddress.btnUpdate.isVisible=true;
  frmAddUpdateAddress.show();
}
function updateAddress()
{
  var name=frmAddUpdateAddress.txtBoxName.text;
  var line_one=frmAddUpdateAddress.txtBoxAddress1.text;
  var line_two=frmAddUpdateAddress.txtBoxAddress2.text;
  var city=frmAddUpdateAddress.txtBoxCity.text;
  var zip=frmAddUpdateAddress.txtBoxZip.text;
  var phone_one=frmAddUpdateAddress.txtboxphone1.text;
  var phone_two=frmAddUpdateAddress.txtBoxPhone2.text;
  var longitude=frmAddUpdateAddress.txtboxlong.text;
  var latitude=frmAddUpdateAddress.txtBoxLat.text;
  var email=frmAddUpdateAddress.txtboxemail.text;
  var website=frmAddUpdateAddress.txtboxwebsite.text;
    updateAddressDetails(name,line_one,line_two,city,zip,phone_one,phone_two,longitude,latitude,email,website);
}
function updateAddressDetails(name,line_one,line_two,city,zip,phone_one,phone_two,longitude,latitude,email,website)
{
   var integrationObj=kony.sdk.getCurrentInstance().getIntegrationService("fetchEvents");
  var operationName = "konyevents_address_update";
  data={name:name,line_one:line_one,line_two:line_two,city:city,zip:zip,phone_one:phone_one,phone_two:phone_two,longitude:longitude,latitude:latitude,email:email,website:website};
   headers= {};
  integrationObj.invokeOperation(operationName, headers, data, updateAddressSuccess, updateAddressFailure);
}
function updateAddresssSuccess(response){
// response is the JSON returned data
  alert("Adress Updated");
  frmAddress.show();
  kony.print("operationSuccess:start");
  kony.print(JSON.stringify(response));
  kony.print("operationSuccess:end");
}

function updateAddressFailure(error){
//error is the error object
  alert("Error: Address could not be updated");
  kony.print("operationFailure:start");
  kony.print(JSON.stringify(error));
  kony.print("operationFailure:end");
}


