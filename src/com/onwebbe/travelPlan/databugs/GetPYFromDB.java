package com.onwebbe.travelPlan.databugs;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;

public class GetPYFromDB {
	private Connection c = null;
	public void getConnection(){
		try {
			Class.forName("org.hsqldb.jdbcDriver");
			c = DriverManager.getConnection("jdbc:hsqldb:hsql://127.0.0.1/", "SA", "");
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	public String getPY(String hz){
		String py = "";
		try{
			String selectQ = "select py from PY.pinyin where hz='"+hz+"'";
			if(c!=null){
				ResultSet rs = c.createStatement().executeQuery(selectQ);
				if(rs.next()){
					py = rs.getString("py");
				}
			}
		}catch(Exception e){
			
		}
		return py;
	}
	
	public void closeConnection(){
		if(c!=null){
			try {
				c.close();
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}
}
