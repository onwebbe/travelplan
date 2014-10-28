package com.onwebbe.travelPlan.databugs;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

public class CTRIPInnerChinaCityCountryPageParser {
	public static void main(String[] args) throws Exception{
		CTRIPInnerChinaCityCountryPageParser spot = new CTRIPInnerChinaCityCountryPageParser();
		spot.parsePage("");
	}
	public void parsePage(String html) throws Exception{
		Document htmlDoc = Jsoup.parse(new File("C:\\Code\\MyProjects\\dojoMobileWebSample\\design\\datasite\\ctrip\\spot.htm"), "UTF-8");
		Elements cityHeadlines = htmlDoc.select("#infoTextLittle p");
		StringBuffer cityDescriptionBuf = new StringBuffer();
		for(int i=0;i<cityHeadlines.size();i++){
			Element cityHeadline = cityHeadlines.get(i);
			String tempText = cityHeadline.text();
			tempText = tempText.trim();
			cityDescriptionBuf.append(tempText+(tempText.length()>0?"\n":""));
		}
		System.out.println(cityDescriptionBuf);
		
		
		
		//getEnglishName
		BufferedReader reader = new BufferedReader(new FileReader("C:\\Code\\MyProjects\\dojoMobileWebSample\\design\\datasite\\ctrip\\spot.htm"));
		StringBuffer buf = new StringBuffer();
		for(String ln = reader.readLine();ln!=null;ln = reader.readLine()){
			buf.append(ln+"\n");
		}
		html = buf.toString();
		int englishstart = html.indexOf("EName");
		int englishend = html.indexOf("\n", englishstart+1);
		System.out.println(englishstart);
		String engline = html.substring(englishstart, englishend);
		System.out.println(engline);
		String[] englines = engline.split("'");
		String eng = englines[1];
		System.out.println("English:"+eng);
	}
	public String parseCityIntro(String fullHTML){
		Document htmlDoc = Jsoup.parse(fullHTML);
		Elements  cityHeadlines = htmlDoc.select("#infoTextAll p");
		StringBuffer cityDescriptionBuf = new StringBuffer();
		if(cityHeadlines.size()==0){
			cityHeadlines = htmlDoc.select("#infoTextLittle p");
		}
		
		for(int i=0;i<cityHeadlines.size();i++){
			Element cityHeadline = cityHeadlines.get(i);
			String tempText = cityHeadline.text();
			tempText = tempText.trim();
			cityDescriptionBuf.append(tempText+(tempText.length()>0?"\n":""));
		}
		return cityDescriptionBuf.toString();
	}
	public String parseCityEnglishName(String fullHTML){
		String eng = "";
		try{
			int englishstart = fullHTML.indexOf("EName");
			int englishend = fullHTML.indexOf("\n", englishstart+1);
			String engline = fullHTML.substring(englishstart, englishend);
			String[] englines = engline.split("'");
			eng = englines[1];
		}catch(Exception e){
			
		}
		return eng;
	}
	public String parseCityPingYin(CitiInfo info){
		String py = "";
		try{
			String url = info.getTargetInfoURL();
			int lastInd = url.lastIndexOf("/")+1;
			String tempPY = url.substring(lastInd);
			for(int i=0;i<tempPY.length();i++){
				char tpy = tempPY.charAt(i);
				if(Character.isDigit(tpy)){
					break;
				}
				py = py+tpy;
			}
			System.out.println(py);
		}catch(Exception e){
			
		}
		return py;
	}
}
