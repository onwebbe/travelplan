package com.onwebbe.travelPlan.databugs;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

import net.sf.json.JSONArray;

import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;


public class CTRIPInnerChinaSpotBug {
	private ArrayList citiList = new ArrayList();
	public void prepareList() throws Exception{
		BufferedReader br = new BufferedReader(new FileReader("C:\\Code\\MyProjects\\dojoMobileWebSample\\design\\datasite\\ctrip\\chineseplaces.txt"));
		for(String ln = br.readLine();ln!=null;ln=br.readLine()){
			int firstInd = ln.indexOf('$');
			String provienceName = ln.substring(0,firstInd);
			String others = ln.substring(firstInd+1, ln.length());
			int secondInd = others.indexOf('$');
			String cityName = others.substring(0, secondInd);
			String cityURL = others.substring(secondInd+1, others.length());
			CitiInfo city = new CitiInfo();
			city.setProvince(provienceName);
			cityName = cityName.substring(0,cityName.length()-4);
			city.setTargetNameC(cityName);
			city.setTargetInfoURL(cityURL);
			city.getAdviceLength();
			//System.out.println(provienceName);
			//System.out.println(cityName);
			//System.out.println(cityURL);
			citiList.add(city);
		}
		System.out.println(generateJSONString(citiList));
	}
	public String getPageContentByHttpClient(CitiInfo info){
		CloseableHttpClient httpclient = null;
		String url = info.getTargetInfoURL();
		url = url.replace("place", "sight");
		url = url.replace(".html", "/s0-p1.html");
		StringBuffer buff = new StringBuffer();
		try{
			System.out.println("START retrive data from "+info.getTargetNameC());
			System.out.println("START retrive data from "+url);
			httpclient = HttpClients.createDefault();
			HttpGet httpGet = new HttpGet(url);
			CloseableHttpResponse response1 = httpclient.execute(httpGet);
			InputStream stream = response1.getEntity().getContent();
			BufferedReader reader = new BufferedReader(new InputStreamReader(stream));
			
			for(String ln = reader.readLine();ln!=null;ln = reader.readLine()){
				buff.append(ln+"\n");
			}
		}catch(Exception e){
			
		}finally{
			if(httpclient!=null){
				try {
					httpclient.close();
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
		}
		return buff.toString();
		
	}
	public String generateJSONString(List obj){
		JSONArray jsonArray = JSONArray.fromObject( obj );  
		return jsonArray.toString();
	}
	public static void main(String[] args){
		CTRIPInnerChinaSpotBug bug = new CTRIPInnerChinaSpotBug();
		CTRIPInnerChinaCityCountryPageParser parser = new CTRIPInnerChinaCityCountryPageParser();
		try {
			bug.prepareList();
			for(int i=0;i<bug.getCitiList().size();i++){
				CitiInfo info = (CitiInfo)bug.getCitiList().get(i);
				String data = bug.getPageContentByHttpClient(info);
				String intro = parser.parseCityIntro(data);
				info.setIntroduction(intro);
				String targetNameP = parser.parseCityPingYin(info);
				info.setTargetNameP(targetNameP);
				String targetNameE = parser.parseCityEnglishName(data);
				info.setTargetNameE(targetNameP);
				System.out.println(intro);
				System.out.println(targetNameP);
				System.out.println(targetNameE);
				
				bug.sameToFile("C:\\Code\\MyProjects\\dojoMobileWebSample\\design\\datasite\\ctrip\\downloadeddata\\"+targetNameP+"-"+i+".txt", data);
				Thread.sleep(5000);
			}
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally{
			System.out.println(bug.generateJSONString(bug.getCitiList()));
		}
	}
	public ArrayList getCitiList() {
		return citiList;
	}
	public void setCitiList(ArrayList citiList) {
		this.citiList = citiList;
	}
	public void sameToFile(String fn, String content){
		FileWriter writer;
		try {
			writer = new FileWriter(fn);
			writer.write(content);
			writer.close();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}
}
