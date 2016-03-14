var uploadFiles;
var upload_lat_id;
function createUpload(img,type,name,size,IsAdmin,IsDisabled,IsAnonymous)
{
  var intServiceInstance = kony.sdk.getCurrentInstance().getIntegrationService("uploadTableJavaService");
  var operationName = "create";
  var data = {blob_obj:img,file_type:type,is_disabled:IsDisabled,file_size:size,is_anonymous_read:IsAnonymous,is_admin_only:IsAdmin,file_name:name};
  var headers = {};
 // alert(JSON.stringify(data));
  kony.print(JSON.stringify(data.file_type));
  intServiceInstance.invokeOperation(operationName,headers,data,uploadSuccess,uploadFailure);
}

//To browse a file we need to use the browse and upload feature of the IO system
function ClickBrowse()
{
  alert("$$$$$$$ Browse Images");
  //The config parameter enables to provide the following functionalities
  var config = {
    
    	selectMultipleFiles: true,
    	filter:	["image/png","file/pdf"]
  };
  
  //BrowseSelectedFiles callback enables to list down the files
  kony.io.FileSystem.browse(config,BrowseSelectedFiles);
 // alert("going toretutn");
 // return;
}

function BrowseSelectedFiles(event,FileList)
{
	uploadFiles = FileList;
  //	alert(JSON.stringify(FileList));
  var reader = new FileReader(); 
   reader.onload = function(evt) { // upon successful file read
   var chars  = new Uint8Array(evt.target.result);
     var CHUNK_SIZE = 0x8000, index = 0, result = '', slice;
     while (index < chars.length) {
           slice = chars.subarray(index, Math.min(index + CHUNK_SIZE, chars.length)); 
     result += String.fromCharCode.apply(null, slice);
     index += CHUNK_SIZE;
   }
  onselectioncallback(result);
   addUploadHelper(FileList[0]);// call callback with final file binary string
 };
  reader.onerror = function(evt) {  // error handler
 if(evt.target.error instanceof FileError){  // Read error code in case of error is of FileError type
    switch(evt.target.error.code){
          case FileError.NOT_FOUND_ERR: kony.print("openMediaGallery error:: The file resource couldn't be found at the time the read was processed."); 
               break;
          case FileError.NOT_READABLE_ERR: kony.print("openMediaGallery error:: 2101, The resource couldn't be read. Insufficient Permissions."); 
                break;
        case FileError.ENCODING_ERR: kony.print("openMediaGallery error:: The resource couldn't be encoded."); 
                 break;
        case FileError.SECURITY_ERR: 
        default: kony.print("openMediaGallery error:: The file resource is unsafe/changed/other unspecified security error.");
  }
}else  // read error name & message in case error is of DomError type
                                                                                                kony.print("openMediaGallery error:: "+evt.target.error.name+", "+evt.target.error.message);
  };
  reader.readAsArrayBuffer(FileList[0].file); 

  //	Upload();
}

var str;
function onselectioncallback(result){
  console.log(result);
frmAddUpdateUpload.imgBlobObj.base64=window.btoa(result);
  str=window.btoa(result);
}
function UpLoadCallBack(url,UpLoadStates)
{
  kony.print("The url:	"+url);
  kony.print("Uplaod status: "+JSON.stringify(UpLoadStates));
  var imgData = {base64:uploadFiles[0]};
  frmAddUpdateUpload.imgBlobObj.src = imgData;
}
 var type;
var res;
function addUploadHelper(result)
{
  tym=new Date();
  res=result;
  // alert(JSON.stringify(result));
 // alert(result.size);
// frmAddUpdateUpload.txtBoxAddedTym.text=tym;
  //frmAddUpdateUpload.txtBoxIsAdmin=1;
 // frmAddUpdateUpload.txtBoxIsDisabled=0;
  frmAddUpdateUpload.txtBoxFileSize.text=result.size;
  frmAddUpdateUpload.txtBoxFileName.text=result.name;
  var dot=(result.name).indexOf(".");
//  alert("dot value:"+dot);
 // frmAddUpdateUpload.lblFileType=(result.name).slice(-1,dot);*/
  type=(result.name).slice(dot+1);
 // alert((result.name).slice(dot));
  frmAddUpdateUpload.txtBoxFileType.text=type;
//  frmAddUpdateUpload.imgBlobObj.base64=str;
  // frmAddUpdateUpload.;*/
//return;
  //addUpload();
 var c_form=kony.application.getCurrentForm();
 // alert(c_form);
  if(c_form!="frmAddUpdateUpload")
      addUpload();
}
function addUpload()
{
  //alert(frmAddUpdateUpload.btnIsAnonymous.selectedKey);
//  alert("uploading");
// createUpload(frmAddUpdateUpload.imgBlobObj.base64,frmAddUpdateUpload.txtBoxFileType.text,frmAddUpdateUpload.txtBoxFileName.text,frmAddUpdateUpload.txtBoxFileSize.text,frmAddUpdateUpload.txtBoxIsAdmin.text,frmAddUpdateUpload.txtBoxIsDisabled.text,frmAddUpdateUpload.btnIsAnonymous.selectedKey);
createUpload(frmAddUpdateUpload.imgBlobObj.base64,type,res.name,res.size,frmAddUpdateUpload.btnIsAdmin.selectedKey,frmAddUpdateUpload.btnIsDisabled.selectedKey,frmAddUpdateUpload.btnIsAnonymous.selectedKey);
}
function uploadSuccess(response){
  if(response.records!==null)
     upload_lat_id=response.records[0].upload_id;
  else
    alert("upload failed");
  
  //frmAddUpdateUpload.destroy();
    //                   frmAddUpdateUpload.show();
    }
function uploadFailure(){}
function getUpload()
{
  var intServiceInstance = kony.sdk.getCurrentInstance().getIntegrationService("fetchEvents");
  var operationName = "konyevents_upload_read";
  var data = {};
  var headers = {};
  intServiceInstance.invokeOperation(operationName,headers,data,getUploadSuccessCallback,getUploadFailureCallback);
}
function getUploadSuccessCallback(response)
{
  if(response.upload !== null)
    {
       if(response.upload >0)
         {      
           //alert(JSON.stringify(response.upload));
             frmFileUpload.segUploadDetails.widgetDataMap=
                       {
                          lblFileUrl:"file_url",
                          lblFileType:"file_type",
                          lblFileName:"file_name",
                          lblFileSize:"file_size",
                          lblAddedTime:"added_time",
                          lblIsDisabled:"is_disabled",
                          lblIsAdmin:"is_admin",
                          lblIsAnonymousRead:"is_anonymous_read",
                          lblUploadId:"upload_id",
                          imgBlobObj:"upload_id_blob"
                       } ;            
               
           frmFileUpload.segUploadDetails.widgetDataMap.setData(response.upload);
 
         }
    }
}
  function getUploadFailureCallback()
  {}

 