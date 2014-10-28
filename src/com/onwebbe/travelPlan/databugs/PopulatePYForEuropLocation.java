package com.onwebbe.travelPlan.databugs;

import java.io.BufferedReader;
import java.io.FileReader;
import java.util.HashMap;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;


public class PopulatePYForEuropLocation {
	private GetPYFromDB PYDB = null;
	private HashMap countryMap = new HashMap();
	private HashMap locationEMap = new HashMap();
	public PopulatePYForEuropLocation(){
		PYDB = new GetPYFromDB();
		locationEMap.put("东欧", "Eastern Europe");
		locationEMap.put("中欧", "Central Europe");
		locationEMap.put("南欧", "Southern Europe");
		locationEMap.put("北欧", "Northern Europe");
		locationEMap.put("西欧", "Western Europe");
		PYDB.getConnection();
		
	}
	public void closeConnection(){
		PYDB.closeConnection();
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
	public void getHTMLEURLocationData() throws Exception{
		StringBuffer bf = new StringBuffer();
		BufferedReader br = new BufferedReader(new FileReader("C:\\Code\\MyProjects\\dojoMobileWebSample\\WebContent\\localdata\\eurprovience.html"));
		for(String ln = br.readLine();ln!=null;ln=br.readLine()){
			bf.append(ln);
		}
		Document htmlDoc = Jsoup.parse(bf.toString());
		Elements countries = htmlDoc.select("table tr");
		for(int i=0;i<countries.size();i++){
			Element countryGroup = countries.get(i);
			String countryName = countryGroup.select("td:eq(1) a").size()>0?countryGroup.select("td:eq(1) a").get(0).text():"";
			String countryLocation = countryGroup.select("td:eq(3)").size()>0?countryGroup.select("td:eq(3)").get(0).text():"";
			if(!"".equalsIgnoreCase(countryName)){
				countryMap.put(countryName, countryLocation);
			}
			//System.out.println(countryName+":"+countryLocation);
		}
		countryMap.put("波黑", "东欧");
		countryMap.put("格陵兰", "北欧");
		countryMap.put("捷克", "中欧");
		countryMap.put("马其顿", "中欧");
		countryMap.put("西兰公国", "中欧");
	}
	
	public String getLocation(String countryName){
		String location = "";
		location = String.valueOf(countryMap.get(countryName));
		return location;
	}
	public String getLocationE(String location){
		String locationE = "";
		locationE = String.valueOf(locationEMap.get(location));
		return locationE;
	}
	
	public JSONArray readJSONData(String continent) throws Exception{
		BufferedReader reader = new BufferedReader(new FileReader("C:\\Code\\MyProjects\\dojoMobileWebSample\\WebContent\\localdata\\internationalTravelTargettest123.json"));
		String jsonStr = reader.readLine();
		JSONArray array = JSONArray.fromObject(jsonStr);
		return array;
	}
	public void process() throws Exception{
		getHTMLEURLocationData();
		JSONArray array = readJSONData("");
		for(int i = 0;i<array.size();i++){
			JSONObject obj = (JSONObject)array.get(i);
			String countryC = obj.getString("country");
			String location = this.getLocation(countryC);
			String locationP = translate(location);
			String locationE = getLocationE(location);
			if("".equalsIgnoreCase(location)||location==null||"null".equalsIgnoreCase(location)){
				System.out.println(countryC);
			}
			obj.element("GLocation", location);
			obj.element("GLocationP", locationP);
			obj.element("GLocationE", locationE);
		}
		System.out.println(array);
		this.closeConnection();
	}
	public static void main(String[] args) throws Exception{
		PopulatePYForEuropLocation b = new PopulatePYForEuropLocation();
		b.process();
	}
}
