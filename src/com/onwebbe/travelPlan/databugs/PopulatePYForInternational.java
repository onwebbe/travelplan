package com.onwebbe.travelPlan.databugs;

import java.io.BufferedReader;
import java.io.FileReader;

import net.sf.json.JSONArray;
import net.sf.json.JSONException;
import net.sf.json.JSONObject;


public class PopulatePYForInternational {
	private GetPYFromDB PYDB = null;
	public PopulatePYForInternational(){
		PYDB = new GetPYFromDB();
		PYDB.getConnection();
		try {
			JSONArray array = readJSONData("Africa");
			translatePYforObj(array);
			PYDB.closeConnection();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}
	public JSONArray readJSONData(String continent) throws Exception{
		BufferedReader reader = new BufferedReader(new FileReader("C:\\Code\\MyProjects\\dojoMobileWebSample\\WebContent\\localdata\\"+continent+"Data.json"));
		String jsonStr = reader.readLine();
		JSONArray array = JSONArray.fromObject(jsonStr);
		return array;
	}
	public String translate(String str){
		String ts = "";
		for(int j=0;j<str.length();j++){
			char targetChar = str.charAt(j);
			String s = String.valueOf(targetChar);
			String pypy = PYDB.getPY(s);
			if(pypy.length()>0){
				String firstPY = String.valueOf(pypy.charAt(0));
				firstPY = firstPY.toUpperCase();
				pypy = firstPY+pypy.substring(1, pypy.length());
				ts = ts +pypy;
			}
			
			
		}
		return ts;
	}
	public void translatePYforObj(JSONArray array) throws JSONException{
		String str = "";
		for(int i=0;i<array.size();i++){
			JSONObject obj = (JSONObject)array.get(i);
			String country = obj.getString("country");
			String countryE = obj.getString("targetNameE");
			String continent = obj.getString("continent");
			String sss = translate(country);
			String conP = translate(continent);
			obj.element("countryP", sss);
			obj.element("targetName", country);
			obj.element("targetNameP", sss);
			obj.element("countryE", countryE);
			obj.element("continentP", conP);
		}
		System.out.println(array.toString());
	}
	public static void main(String[] args){
		PopulatePYForInternational b = new PopulatePYForInternational();
		
	}
}
