package com.onwebbe.travelPlan.databugs;

import java.io.BufferedReader;
import java.io.FileReader;

import net.sf.json.JSONArray;
import net.sf.json.JSONException;
import net.sf.json.JSONObject;


public class PopulatePYForInternationalCountry {
	private GetPYFromDB PYDB = null;
	public PopulatePYForInternationalCountry(){
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
		BufferedReader reader = new BufferedReader(new FileReader("C:\\Code\\MyProjects\\dojoMobileWebSample\\WebContent\\localdata\\internationalTravelTarget"+continent+".json"));
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
			String countryE = obj.getString("targetNameE");
			String targetName = obj.getString("targetNameC");
			String targetNameE = obj.getString("targetNameP");
			
			String targetNameP = translate(targetName);
			
			
			String continent = obj.getString("continent");
			String continentP = translate(continent);
			
			
			String country = obj.getString("country");
			String contryP = translate(country);
			obj.element("countryP", contryP);
			obj.element("targetNameE", targetNameE);
			obj.element("targetName", targetName);
			obj.element("targetNameP", targetNameP);
			obj.element("continentP", continentP);
			
		}
		System.out.println(array.toString());
	}
	public static void main(String[] args){
		PopulatePYForInternationalCountry b = new PopulatePYForInternationalCountry();
		
	}
}
