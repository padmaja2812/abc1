package com.kony.processors;

import java.io.InputStream;
import java.sql.Blob;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.apache.log4j.Logger;

import com.konylabs.middleware.common.Base64Coder;
import com.konylabs.middleware.common.JavaService2;
import com.konylabs.middleware.controller.DataControllerRequest;
import com.konylabs.middleware.controller.DataControllerResponse;
import com.konylabs.middleware.dataobject.Dataset;
import com.konylabs.middleware.dataobject.Param;
import com.konylabs.middleware.dataobject.Record;
import com.konylabs.middleware.dataobject.Result;
import com.mysql.jdbc.PreparedStatement;

public class UploadTableJavaService implements JavaService2{

	Connection con;
	ResultSet rs_get;
	private static final Logger LOG = Logger.getLogger(JavaService2.class);
	private static final boolean DEBUG = LOG.isDebugEnabled();

	@Override
	public Object invoke(String methodId, Object[] objectArray,
			DataControllerRequest request, DataControllerResponse response) throws ClassNotFoundException, SQLException {
		Result result = new Result();
		Map inputMap = (Map) objectArray[1];
		System.out.println("input map length = "+inputMap.size());
		System.out.println("input map length = "+inputMap.toString());
		LOG.debug("------begin invoke------");
		System.out.println("inside java service invoke method");
		
		try{
			connection();
			
			if(methodId.equals("get")){
				System.out.println("In get");
				Statement stmt = con.createStatement();
				int upload_id = Integer.parseInt((String)inputMap.get("upload_id"));
				System.out.println("upload_id = "+(String)inputMap.get("upload_id"));
				rs_get = stmt.executeQuery("select * from upload where upload_id="+upload_id+";");
				System.out.println("select * from upload where upload_id="+upload_id+";");
				rs_get.next();
				System.out.println("UploadTableJavaService : rs = "+rs_get.getMetaData());
				LOG.debug("UploadTableJavaService : rs = "+rs_get.getMetaData());
				if(rs_get.wasNull())
					throw new SQLException("result is empty");
				upload_id = rs_get.getInt("upload_id");
				String file_url = rs_get.getString("file_url");
				String file_type = rs_get.getString("file_type");
				boolean is_disabled = rs_get.getBoolean("is_disabled");
				Timestamp upload_time = rs_get.getTimestamp("added_time");
				int file_size = rs_get.getInt("file_size");
				boolean is_anonymous_read = rs_get.getBoolean("is_anonymous_read");
				boolean is_admin_only = rs_get.getBoolean("is_admin_only");
				Blob blob_data = rs_get.getBlob("blob_obj");
				String file_name = rs_get.getString("file_name");
				
				byte[] blob_date_bytes = blob_data.getBytes(1, (int)blob_data.length());
				String blob_string = new String(blob_date_bytes);
				
				LOG.debug("upload_id = "+upload_id);

				Dataset dataset = new Dataset();
				Record record = new Record();
				record.setParam(new Param("upload_id",Integer.toString(upload_id) , "number"));
				record.setParam(new Param("file_url", file_url, "string"));
				record.setParam(new Param("file_type", file_type, "string"));
				record.setParam(new Param("is_disabled", Boolean.toString(is_disabled) , "boolean"));
				record.setParam(new Param("upload_time", upload_time.toString(), "date"));
				record.setParam(new Param("file_size", Integer.toString(file_size), "number"));
				record.setParam(new Param("is_anonymous_read", Boolean.toString(is_anonymous_read), "boolean"));
				record.setParam(new Param("is_admin_only", Boolean.toString(is_admin_only), "boolean"));
				record.setParam(new Param("blob_data", blob_string, "string"));
				record.setParam(new Param("file_name", file_name, "string"));
				
				dataset.setId("records");
				dataset.setRecord(record);
				result.setDataSet(dataset);
				result.getParamList().add(new Param("opstatus", "0", "int"));
				result.getParamList().add(new Param("httpStatusCode", "200", "int"));
			}
			
			else if(methodId.equals("update")){
				System.out.println("In update");
				int upload_id = Integer.parseInt((String)inputMap.get("upload_id"));
				System.out.println("upload_id = "+(String)inputMap.get("upload_id"));
			
				String file_url = (String) inputMap.get("file_url");
				String file_type = (String) inputMap.get("file_type");
				Timestamp upload_time = (Timestamp) inputMap.get("added_time");
				int file_size = Integer.parseInt((String)inputMap.get("file_size"));
				boolean is_anonymous_read = Boolean.getBoolean((String)inputMap.get("is_anonymous_read"));
				boolean is_admin_only = Boolean.getBoolean((String)inputMap.get("is_admin_only"));
				String blob_data_b64 = (String)inputMap.get("blob_obj");
				String file_name = (String) inputMap.get("file_name");
				
				byte[] blob_data_byt = Base64Coder.decode(blob_data_b64);
				Blob blob = con.createBlob();
				blob.setBytes(1, blob_data_byt);
				
				String stmt = "UPDATE upload SET file_url=?, file_type=?, upload_time=?, file_size=?, is_anonymous_read=?,"
						+ "is_admin_only=?, blob_data=?, file_name=? where upload_id=?";
				
				PreparedStatement updateStatement = (PreparedStatement) con.prepareStatement(stmt);
				updateStatement.setInt(8, upload_id);
				updateStatement.setString(1, file_url);
				updateStatement.setString(2, file_type);
				updateStatement.setTimestamp(3, upload_time);
				updateStatement.setInt(4, file_size);
				updateStatement.setBoolean(5, is_anonymous_read);
				updateStatement.setBoolean(6, is_admin_only);
				updateStatement.setBlob(7, blob);
				updateStatement.setString(8, file_name);
				
				int update_result = updateStatement.executeUpdate();
				System.out.println("result of update = "+update_result);
				
				Dataset dataset = new Dataset();
				Record record = new Record();
				record.setParam(new Param("record_update_status",Integer.toString(update_result) , "String"));
				dataset.setId("records");
				dataset.setRecord(record);
				result.setDataSet(dataset);
				result.getParamList().add(new Param("opstatus", "0", "int"));
				result.getParamList().add(new Param("httpStatusCode", "200", "int"));
				
			}
			
			else if(methodId.equals("create")){
				System.out.println("In create");
				String file_url = (String) inputMap.get("file_url");
				String file_type = (String) inputMap.get("file_type");
				int file_size = Integer.parseInt((String)inputMap.get("file_size"));
				boolean is_disabled = Boolean.parseBoolean((String)inputMap.get("is_disabled"));
				boolean is_anonymous_read = Boolean.parseBoolean((String)inputMap.get("is_anonymous_read"));
				boolean is_admin_only = Boolean.parseBoolean((String)inputMap.get("is_admin_only"));
				String blob_data_b64 = (String)inputMap.get("blob_obj");
				String file_name = (String) inputMap.get("file_name");
				
				System.out.println(inputMap.get("is_anonymous_read")+":"+inputMap.get("is_admin_only"));
				System.out.println(is_anonymous_read + ":"+is_admin_only);
				
				byte[] blob_data_byt = blob_data_b64.getBytes();
				Blob blob = con.createBlob();
				blob.setBytes(1, blob_data_byt);
				
				String stmt = "INSERT into upload (file_url, file_type, is_disabled, file_size, "
						+ "is_anonymous_read,is_admin_only, blob_obj, file_name)"
						+ " values(?,?,?,?,?,?,?,?)";
				
				PreparedStatement insertStatement = (PreparedStatement) con.prepareStatement(stmt,Statement.RETURN_GENERATED_KEYS);
				insertStatement.setString(1, file_url);
				insertStatement.setString(2, file_type);
				insertStatement.setBoolean(3, is_disabled);
				insertStatement.setInt(4, file_size);
				insertStatement.setBoolean(5, is_anonymous_read);
				insertStatement.setBoolean(6, is_admin_only);
				insertStatement.setBlob(7, blob);
				insertStatement.setString(8, file_name);
				
				int insert_result = insertStatement.executeUpdate();
				
				ResultSet rs = insertStatement.getGeneratedKeys();
				int inserted_upload_id = -1;
				if(rs.next())
					inserted_upload_id = rs.getInt(1);
				System.out.println("result of insert = "+insert_result);
				
				Dataset dataset = new Dataset();
				Record record = new Record();
				record.setParam(new Param("record_inserted_status",Integer.toString(insert_result) , "String"));
				if(inserted_upload_id!=-1)
					record.setParam(new Param("upload_id",Integer.toString(inserted_upload_id) , "String"));
				dataset.setId("records");
				dataset.setRecord(record);
				result.setDataSet(dataset);
				result.getParamList().add(new Param("opstatus", "0", "int"));
				result.getParamList().add(new Param("httpStatusCode", "200", "int"));
			}
			
			else if(methodId.equals("multi_get")){
				System.out.println("In multi get");
				Statement stmt = con.createStatement();
				String upload_ids_string = (String)inputMap.get("upload_ids");
				System.out.println("upload_ids = "+upload_ids_string);
				String[] upload_id_temp = upload_ids_string.split(",");
				int[] upload_ids = new int[upload_id_temp.length];
				for (int i = 0; i < upload_id_temp.length; i++) {
					upload_ids[i] = Integer.parseInt(upload_id_temp[i]);
				}
				
				rs_get = stmt.executeQuery("select * from upload where upload_id in ("+upload_ids_string+")"
						+ " ORDER BY FIELD(upload_id,"+upload_ids_string+");");
				System.out.println("select * from upload where upload_id in ("+upload_ids_string+")"
						+ " ORDER BY FIELD(upload_id,"+upload_ids_string+");");
				
				Dataset dataset = new Dataset();
				dataset.setId("records");
				while(rs_get.next()){
					
					int upload_id = rs_get.getInt("upload_id");
					String file_url = rs_get.getString("file_url");
					//String file_type = rs_get.getString("file_type");
					//boolean is_disabled = rs_get.getBoolean("is_disabled");
					//Timestamp upload_time = rs_get.getTimestamp("added_time");
					//int file_size = rs_get.getInt("file_size");
					//boolean is_anonymous_read = rs_get.getBoolean("is_anonymous_read");
					//boolean is_admin_only = rs_get.getBoolean("is_admin_only");
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
					//record.setParam(new Param("file_type", file_type, "string"));
					//record.setParam(new Param("is_disabled", Boolean.toString(is_disabled) , "boolean"));
					//record.setParam(new Param("upload_time", upload_time.toString(), "date"));
					//record.setParam(new Param("file_size", Integer.toString(file_size), "number"));
					//record.setParam(new Param("is_anonymous_read", Boolean.toString(is_anonymous_read), "boolean"));
					//record.setParam(new Param("is_admin_only", Boolean.toString(is_admin_only), "boolean"));
					record.setParam(new Param("blob_data", blob_string, "string"));
					record.setParam(new Param("file_name", file_name, "string"));
					
					dataset.setRecord(record);
					LOG.debug("upload_id = "+upload_id);
					System.out.println("UploadTableJavaService : rs = "+rs_get.getString("upload_id"));
					LOG.debug("UploadTableJavaService : rs = "+rs_get.getMetaData());
				}
				
				
				result.setDataSet(dataset);
				result.getParamList().add(new Param("opstatus", "0", "int"));
				result.getParamList().add(new Param("httpStatusCode", "200", "int"));
			}
			
			else if(methodId.equals("get_all")){
				System.out.println("In multi get");
				Statement stmt = con.createStatement();
				
				rs_get = stmt.executeQuery("select * from upload;");
				System.out.println("select * from upload;");
				
				Dataset dataset = new Dataset();
				dataset.setId("records");
				while(rs_get.next()){
					
					int upload_id = rs_get.getInt("upload_id");
					String file_url = rs_get.getString("file_url");
					String file_type = rs_get.getString("file_type");
					boolean is_disabled = rs_get.getBoolean("is_disabled");
					Timestamp upload_time = rs_get.getTimestamp("added_time");
					int file_size = rs_get.getInt("file_size");
					boolean is_anonymous_read = rs_get.getBoolean("is_anonymous_read");
					boolean is_admin_only = rs_get.getBoolean("is_admin_only");
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
					record.setParam(new Param("file_type", file_type, "string"));
					record.setParam(new Param("is_disabled", Boolean.toString(is_disabled) , "boolean"));
					record.setParam(new Param("upload_time", upload_time.toString(), "date"));
					record.setParam(new Param("file_size", Integer.toString(file_size), "number"));
					record.setParam(new Param("is_anonymous_read", Boolean.toString(is_anonymous_read), "boolean"));
					record.setParam(new Param("is_admin_only", Boolean.toString(is_admin_only), "boolean"));
					record.setParam(new Param("blob_data", blob_string, "string"));
					record.setParam(new Param("file_name", file_name, "string"));
					
					dataset.setRecord(record);
					LOG.debug("upload_id = "+upload_id);
					System.out.println("UploadTableJavaService : rs = "+rs_get.getString("upload_id"));
					LOG.debug("UploadTableJavaService : rs = "+rs_get.getMetaData());
				}
				
				result.setDataSet(dataset);
				result.getParamList().add(new Param("opstatus", "0", "int"));
				result.getParamList().add(new Param("httpStatusCode", "200", "int"));
			}
		}
		
		finally {
			if(!(con==null) && !con.isClosed())
					con.close();
			if(!(rs_get==null) && !rs_get.isClosed())
				rs_get.close();
		}
		System.out.println("result = "+result.toString());
		return result;
	}
	


void connection() throws ClassNotFoundException, SQLException{
	System.out.println("connection: start");
	Class.forName("com.mysql.jdbc.Driver");
	//con = DriverManager.getConnection("jdbc:mysql://10.11.12.137:3306/konyevents","acedev","acedev123");
	con = DriverManager.getConnection("jdbc:mysql://eventsdbdrive.c7ecpxua8lql.us-west-2.rds.amazonaws.com:3306/konyevents","eventsdbuser","pass4eventsdbuser");
	System.out.println("connection status: "+(!(con.isClosed())));
	System.out.println("connection: end");
}


/*public static void main(String[] args) throws Exception {
	UploadTableJavaService uploadTableJavaService = new UploadTableJavaService();
	Object[] objArr= new Object[3];
	Map map = new HashMap<String, String>();
	map.put("upload_id", "17");
//	map.put("upload_ids", "9,13,11");
//	map.put("file_url", "google.com");
//	map.put("file_type", "png");
//	map.put("is_disabled","false");
//	map.put("added_time", "2015-08-22 15:02:51");
//	map.put("file_size", "308");
//	map.put("is_anonymous_read", "true");
//	map.put("is_admin_only", "true");
//	map.put("blob_obj", "fdafdsasfdsfsdjlfkhdsakjfjashlkkfdasdfss");
//	map.put("file_name", "fname8");
	objArr[1] = map;
	uploadTableJavaService.invoke("get", objArr, null, null);
}
*/

}
