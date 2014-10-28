package com.onwebbe.travelPlan.databugs;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;

public class QiongYouInternationalCityInfo {
	private WebDriver driver = null;
	public JSONArray readJSONData(String continent) throws Exception{
		BufferedReader reader = new BufferedReader(new FileReader("C:\\Code\\MyProjects\\dojoMobileWebSample\\WebContent\\localdata\\"+continent+"Data.json"));
		String jsonStr = reader.readLine();
		JSONArray array = JSONArray.fromObject(jsonStr);
		return array;
	}
	public static void main(String[] args) throws Exception{
		QiongYouInternationalCityInfo info = new QiongYouInternationalCityInfo();
		JSONArray newArray = new JSONArray();
		String continentName = "South America";
		try{
			
			//info.initSeleium();
			JSONArray array = info.readJSONData(continentName);
			int index = 0;
			for(int i=0;i<array.size();i++){
				JSONObject obj = (JSONObject)array.get(i);
				String objText = obj.toString();
				String countryE = obj.getString("targetNameE");
				String countryMainURL = obj.getString("targetInfoURL");
				//String htmlContent = info.getHTMLContent(countryMainURL);
				String htmlContent = info.getHTMLContentHTTPClient(countryMainURL);
				Document htmlDocument = Jsoup.parse(htmlContent);
				Elements eles = htmlDocument.select("#allcitylist ul li");
				System.out.println("--------------------Country:"+countryE+":"+i+":start-----------------------");
				if(eles.size()==0){
					newArray.add(obj);
				}
				for(int j=0;j<eles.size();j++){
					Element ele = eles.get(j);
					String href = ele.select("a").get(0).attr("href");
					String cityText = ele.text();
					int ind = cityText.indexOf(" ");
					String targetNameC = cityText.substring(0,ind);
					String targetNameE = cityText.substring(ind+1);
					String targetNameP = targetNameE;
					JSONObject newObj = JSONObject.fromObject(objText);
					newObj.put("countryE", countryE);
					newObj.put("id", targetNameE+"_"+index);
					newObj.put("introduction", "");
					newObj.put("targetInfoURL", href);
					newObj.put("countryMainURL", countryMainURL);
					newObj.put("targetName", targetNameE);
					newObj.put("targetNameC", targetNameC);
					newObj.put("targetNameP", targetNameP);
					
					System.out.println(href+":"+cityText);
					
					String cityProfileURL = href+"profile/";
					String cityHtmlContent = info.getHTMLContentHTTPClient(cityProfileURL);
					//String cityHtmlContent = info.getHTMLContent(cityProfileURL);
					Document cityHtmlDocument = Jsoup.parse(cityHtmlContent);
					Elements cityHTMLIntro = cityHtmlDocument.select(".pla_main2 div");
					String introduction = "";
					if(cityHTMLIntro.size()>=2){
						Elements introEle = cityHTMLIntro.get(1).select(".pla_txtquote");
						if(introEle.size()>=1){
							introduction = introEle.get(0).text();
						}
					}
					
					newObj.put("introduction", introduction);
					index = index+1;
					System.out.println(newObj);
					newArray.add(newObj);
					Thread.sleep(10000);
					System.out.println("--------------------Country:"+countryE+":"+i+":end-----------------------");
					info.saveFile("C:\\Code\\MyProjects\\dojoMobileWebSample\\WebContent\\localdata\\"+continentName+"\\"+targetNameE+"_"+index+".html", cityHtmlContent);
				}
			}
			
		}catch(Exception e){
			e.printStackTrace();
		}finally{
			//info.closeSeleium();
			System.out.println(newArray);
		}
		
		/*info.initSeleium();
		System.out.println(info.getHTMLContent("http://www.pconline.com.cn"));
		info.closeSeleium();*/
	}
	
	public void initSeleium(){
		 // 用Firefox driver创建一个新的的实例
        //注意:其他的代码依赖于界面
        //不执行
		System.setProperty ( "webdriver.ie.driver" , "C:\\WorkProgram\\selenium\\IEDriverServer.exe" );
        //System.setProperty ( "webdriver.firefox.bin" , "C:\\WorkProgram\\Mozilla Firefox\\firefox.exe" );
        driver = new FirefoxDriver();// 这里我们可以使用firefox来运行测试用例
        //WebDriver driver = new ChromeDriver(); //这是chrome浏览器的驱动
		//driver = new InternetExplorerDriver(); //这是IE浏览器的驱动
        //driver = new HtmlUnitDriver(); //这是一个无界面测试模式，不用打开浏览器，通过后台输入来判断测试用例是否通过
	}
	public void closeSeleium(){
		 driver.quit();
	}
	
	public String getHTMLContent(String url){
        // 现在用这个来访问谷歌
        driver.get(url);
        // 也可以用下面的方式访问谷歌
        // driver.navigate().to("http://www.google.com");
        String source = driver.getPageSource();
       
        return source;
	}
	public String getHTMLContentHTTPClient(String url){
		CloseableHttpClient httpclient = null;
		StringBuffer buff = new StringBuffer();
		try{
			httpclient = HttpClients.createDefault();
			HttpGet httpGet = new HttpGet(url);
			CloseableHttpResponse response1 = httpclient.execute(httpGet);
			InputStream stream = response1.getEntity().getContent();
			BufferedReader reader = new BufferedReader(new InputStreamReader(stream));
			
			for(String ln = reader.readLine();ln!=null;ln = reader.readLine()){
				buff.append(ln+"\n");
			}
		}catch(Exception e){
			e.printStackTrace();
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
	
	public void saveFile(String fn, String html){
		FileWriter writer = null;
		try{
			writer = new FileWriter(fn);
			writer.write(html);
			writer.close();
		}catch(Exception e){
			e.printStackTrace();
		}finally{
			if(writer!=null){
				try {
					writer.close();
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
		}
		
	}
}
