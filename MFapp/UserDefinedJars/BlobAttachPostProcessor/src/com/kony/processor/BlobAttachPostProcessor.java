package com.kony.processor;

import java.sql.Blob;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map.Entry;
import java.util.TreeMap;

import org.apache.log4j.Logger;

import com.konylabs.middleware.common.DataPostProcessor2;
import com.konylabs.middleware.common.JavaService2;
import com.konylabs.middleware.controller.DataControllerRequest;
import com.konylabs.middleware.controller.DataControllerResponse;
import com.konylabs.middleware.dataobject.Dataset;
import com.konylabs.middleware.dataobject.Param;
import com.konylabs.middleware.dataobject.Record;
import com.konylabs.middleware.dataobject.Result;

public class BlobAttachPostProcessor implements DataPostProcessor2{

	private static final Logger LOG = Logger.getLogger(JavaService2.class);
	private static final boolean DEBUG = LOG.isDebugEnabled();
	Connection con;
	
	//container having columns to search for
	HashMap<String, String> blob_columns = new HashMap<String, String>();
			
	
	TreeMap<String, String> blob_request_list = new TreeMap<String, String>();
	HashMap<Integer,String> blob_result_list = new HashMap<Integer,String>();
	
	@Override
	public Object execute(Result result, DataControllerRequest arg1,
			DataControllerResponse arg2)  {
		System.out.println("BlobAttachPostProcessor: execute : start");
		LOG.debug("BlobAttachPostProcessor: execute : start");
		
		//columns which need to be considered as upload_id should added here
		blob_columns.put("banner_id", "");
		blob_columns.put("logo_id", "");
		blob_columns.put("image_id", "");
		blob_columns.put("upload_id", "");	
		blob_columns.put("speaker_image_id", ""); //vw_schedule_list
		
		
		ArrayList<Dataset> dataSet_list = result.getDataSets();
		System.out.println("BlobAttachPostProcessor : dataset length = "+dataSet_list.size());
		LOG.debug("BlobAttachPostProcessor : dataset length = "+dataSet_list.size());
		System.out.println("BlobAttachPostProcessor : dataset to string = "+dataSet_list.toString());
		LOG.debug("BlobAttachPostProcessor : dataset to string = "+dataSet_list.toString());
		
		for (Dataset dataset : dataSet_list) {
			ArrayList<Record> record_list = dataset.getRecords();
			System.out.println("BlobAttachPostProcessor : record list to string = "+record_list.toString());
			LOG.debug("BlobAttachPostProcessor : record list to string = "+record_list.toString());
			for (Record record : record_list) {
				blob_request_list.clear(); // empty the request list before going to the next record
				blob_result_list.clear(); // empty the result list before going to the next record
				String upload_ids = "";
				ArrayList<Param> params_list = record.getParams();
				for (Param param : params_list) {
					if(blob_columns.containsKey(param.getName())){
						blob_request_list.put(param.getName(), param.getValue());
						if(upload_ids.equals(""))
							upload_ids= upload_ids+param.getValue();
						else
							upload_ids = upload_ids+","+param.getValue();
					}
						
				}
				//code to get the list and append new blob param to the record
				try {
					if(!blob_request_list.isEmpty()){
						System.out.println("No Blob objects to id");
						addBlobParamToRecord(record,upload_ids);
					}
						
				} catch (ClassNotFoundException | SQLException e) {
					System.out.println("BlobAttachPostProcessor: failed to get blob data and add them to record");
					LOG.debug("BlobAttachPostProcessor: failed to get blob data and add them to record");
					e.printStackTrace();
					
				}
				
				System.out.println("BlobAttachPostProcessor: record to string = "+record.toString());
				LOG.debug("BlobAttachPostProcessor: record to string = "+record.toString());
			}
		}
		System.out.println("BlobAttachPostProcessor: end analyzing request");
		LOG.debug("BlobAttachPostProcessor: end analyzing request");
		
		System.out.println("BlobAttachPostProcessor: input result = "+result.toString());
		LOG.debug("BlobAttachPostProcessor: input result = "+result.toString());
		
		System.out.println("BlobAttachPostProcessor: result to string "+result.toString());
		LOG.debug("BlobAttachPostProcessor: result to string "+result.toString());
		System.out.println("BlobAttachPostProcessor: execute: end");
		LOG.debug("BlobAttachPostProcessor: execute: end");
		return result;
	}
	
	//For every row, identify the blob columns and append blob data to the row
	void addBlobParamToRecord(Record record, String upload_ids) throws ClassNotFoundException, SQLException {
		System.out.println("start : addBlobParamToRecord");
		Result result = null;
		result = getRecords(upload_ids);
		
		ArrayList<Dataset> dataset_list = result.getDataSets();
		System.out.println("BlobAttachPostProcessor : addBlobParamToRecord : data set list"+dataset_list.toString());
		ArrayList<Record> records_list = dataset_list.get(0).getRecords();
		System.out.println("BlobAttachPostProcessor : addBlobParamToRecord : records list : "+records_list.toString());
		System.out.println("BlobAttachPostProcessor : addBlobParamToRecord : records list size : "+records_list.size());
		int records_count = records_list.size();
		if(records_count>0){
			for (int i = 0; i < records_count; i++) {
				Record curr_record = records_list.get(i);	
				System.out.println("BlobAttachPostProcessor : curr_record = "+curr_record.toString());
				String blob_data_toInsert = null;
				int upload_id = -1;

				ArrayList<Param> params_list = curr_record.getParams();
				for (Param param : params_list) {
					System.out.println("param = "+param.toString());
					if(param.getName().equals("upload_id")){
						System.out.println("BlobAttachPostProcessor : inside if param upload_id");
						upload_id = Integer.parseInt(param.getValue());
					}
					if(param.getName().equals("blob_data")){
						System.out.println("BlobAttachPostProcessor : inside if param blob_data");
						blob_data_toInsert = param.getValue();
						System.out.println("BlobAttachPostProcessor : blob to isert = "+blob_data_toInsert);
						if(blob_data_toInsert!=null)
							blob_result_list.put(upload_id,blob_data_toInsert);
						else
							blob_result_list.put(upload_id,"-1"); //-1 implies no blob data
						}

					}

					
			}
			System.out.println("BlobAttachPostProcessor : blob_request_list size = "+blob_request_list.size());
			System.out.println("BlobAttachPostProcessor : blob_request_list contents = "+blob_request_list.toString());
			System.out.println("BlobAttachPostProcessor : blob_result_list size = "+blob_result_list.size());
			System.out.println("BlobAttachPostProcessor : blob_result_list contents = "+blob_result_list.toString());
			
			LOG.debug("BlobAttachPostProcessor : blob_request_list size = "+blob_request_list.size());
			LOG.debug("BlobAttachPostProcessor : blob_request_list contents = "+blob_request_list.toString());
			LOG.debug("BlobAttachPostProcessor : blob_result_list size = "+blob_result_list.size());
			LOG.debug("BlobAttachPostProcessor : blob_result_list contents = "+blob_result_list.toString());
			
			for (Entry<String, String> request : blob_request_list.entrySet()) {
				String key = request.getKey();
				int value = Integer.parseInt(request.getValue());
				String temp_value = blob_result_list.get(value);
				String blob_string = null;
				if(!temp_value.equals("-1"))
					blob_string = temp_value;
				record.setParam(new Param(key+"_blob", blob_string, "String"));
			}
			System.out.println("addBlobParamToRecord result = "+result.toString());
			System.out.println("end : addBlobParamToRecord");
			
			LOG.debug("addBlobParamToRecord result = "+result.toString());
			LOG.debug("end : addBlobParamToRecord");
		}
	}
	
	
	//for the identified upload id's, get the blob data and return it.
	public Result getRecords(String upload_ids_string) throws ClassNotFoundException, SQLException {
		Result result = new Result();
		ResultSet rs_get = null;
		LOG.debug("------begin getRecords------");
		System.out.println("inside java service invoke method");
		String upload_ids = upload_ids_string.trim();
		try{
			connection();

			System.out.println("In multi get");
			Statement stmt = con.createStatement();
			System.out.println("select * from upload where upload_id in ("+upload_ids+")"
					+ " ORDER BY FIELD(upload_id,"+upload_ids+");");
			rs_get = stmt.executeQuery("select * from upload where upload_id in ("+upload_ids+")"
					+ " ORDER BY FIELD(upload_id,"+upload_ids+");");
			
			Dataset dataset = new Dataset();
			dataset.setId("records");
			while(rs_get.next()){

				int upload_id = rs_get.getInt("upload_id");
				String file_url = rs_get.getString("file_url");
				Blob blob_data = rs_get.getBlob("blob_obj");
				String file_name = rs_get.getString("file_name");


				String blob_string = null;
				if(!(blob_data == null))
				{
					byte[] bdata = blob_data.getBytes(1, (int) blob_data.length());
					blob_string = new String(bdata);
				}

				System.out.println("blob string = "+blob_string);

				Record record = new Record();
				record.setParam(new Param("upload_id",Integer.toString(upload_id) , "number"));
				record.setParam(new Param("file_url", file_url, "string"));
				record.setParam(new Param("blob_data", blob_string, "string"));
				record.setParam(new Param("file_name", file_name, "string"));

				dataset.setRecord(record);
				LOG.debug("upload_id = "+upload_id);
				System.out.println("BlobAttachPostProcessor : rs = "+rs_get.getString("upload_id"));
				LOG.debug("BlobAttachPostProcessor : rs = "+rs_get.getMetaData());

			}
			
			result.setDataSet(dataset);
			result.getParamList().add(new Param("opstatus", "0", "int"));
			result.getParamList().add(new Param("httpStatusCode", "200", "int"));
		}


		finally {
			if(!(rs_get==null) && !rs_get.isClosed())
				rs_get.close();
			if(!(con==null) && !con.isClosed())
				con.close();
		}
		System.out.println("result = "+result.toString());
		return result;
	}
	


	void connection() throws ClassNotFoundException, SQLException{
		System.out.println("BlobAttachPostProcessor: connection: start");
		Class.forName("com.mysql.jdbc.Driver");
		//con = DriverManager.getConnection("jdbc:mysql://10.11.12.137:3306/konyevents","acedev","acedev123");
		con = DriverManager.getConnection("jdbc:mysql://eventsdbdrive.c7ecpxua8lql.us-west-2.rds.amazonaws.com:3306/konyevents","eventsdbuser","pass4eventsdbuser");
		System.out.println("BlobAttachPostProcessor: connection status: "+(!(con.isClosed())));
		System.out.println("BlobAttachPostProcessor: connection: end");
	}

	/*public static void main(String[] args) throws Exception {
		BlobAttachPostProcessor blobAttachPostProcessor = new BlobAttachPostProcessor();
		blobAttachPostProcessor.getRecords("1,9,10");
	}*/

	
}