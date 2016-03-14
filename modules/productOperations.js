
//Products page
//Adding products to the database

function addProduct() 
{
  	//Inputs are taken from the desktop form of product details and added into the database
	var productName = frmProductDetails.tbxProductName.text;
  	var shortDesc = frmProductDetails.tbxShortDescp.text;
  	var longDesc = frmProductDetails.tbxAbout.text;
  	var icons = upload_lat_id;
  	
  addToProductList(productName,shortDesc,longDesc,icons);
}

function addToProductList(productName,shortDesc,longDesc,icons)
{
  
  //Takes the instance of the database from the mobile fabric
	var integrationObj = kony.sdk.getCurrentInstance().getIntegrationService("fetchEvents");  
		
  //Operation name as it was given in the service operations list
  	var operationName = "konyevents_product_create";
  
  	var data= {"name": productName,"short_desc": shortDesc,"long_desc": longDesc,"icon_id":icons};
  	var headers= {};
    
  integrationObj.invokeOperation(operationName, headers, data, productSuccessResponse, productFailureResponse);
  
}

function productSuccessResponse(response)
{
// response is the JSON returned data
  alert("Product added to the list");
  kony.print("operationSuccess:start");
  kony.print(JSON.stringify(response));
  kony.print("operationSuccess:end");
}

function productFailureResponse(error)
{
//error is the error object
  alert("Product operation failure");
  kony.print("operationFailure:start");
  alert("$$$$$"+JSON.stringify(error));
  kony.print("operationFailure:end");
}


function getProducts()
{
  alert("Alert : Getting products");
  //Takes the instance of the database from the mobile fabric
	var integrationObj = kony.sdk.getCurrentInstance().getIntegrationService("fetchEvents");  
	
  //Operation name as it was given in the service operations list
  	var operationName = "konyevents_product_read";
  
  	var data= {};
  	var headers= {};
    
  integrationObj.invokeOperation(operationName, headers, data, productSuccessCallBack, productFailureCallBack);
}

function productSuccessCallBack(response)
{
  
  alert("$$$$$ Sucessfully fetched");
  //write code to set in the table
  //title = response.record[1].title
  if(response.product !== null)
    {
       if(response.product.length >0)
         {
          
             frmProductsList.segProduct.widgetDataMap =
                       {
                      		labProductName	: "name",
               				labShortDesc	: "short_desc",
               				labLongDesc		: "long_desc",
               				ImgIcon			: "icon"
						} ;            
               
           frmProductsList.segProduct.setData(response.product);
         }
    }
  
}

function productFailureCallBack(error)
{
  alert("Failed To Retrive Products");
  kony.print("$$$$$$$ Failed to fetch : " + JSON.stringify(err));
}
