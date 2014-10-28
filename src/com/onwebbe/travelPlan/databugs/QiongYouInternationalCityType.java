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
import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;

public class QiongYouInternationalCityType {
	public static void main(String[] args) throws Exception{
		QiongYouInternationalCityType info = new QiongYouInternationalCityType();
		String continentName = "test123";
		info.process(continentName);
	}
	private WebDriver driver = null;
	public JSONArray readJSONData(String continent) throws Exception{
		BufferedReader reader = new BufferedReader(new FileReader("C:\\Code\\MyProjects\\dojoMobileWebSample\\WebContent\\localdata\\internationalTravelTarget"+continent+".json"));
		String jsonStr = reader.readLine();
		JSONArray array = JSONArray.fromObject(jsonStr);
		return array;
	}
	public void process(String continentName){
		
		try{
			
			initSeleium();
			JSONArray array = readJSONData(continentName);
			int index = 0;
			for(int i=0;i<array.size();i++){
				JSONObject obj = (JSONObject)array.get(i);
				String url = obj.getString("targetInfoURL");
				String name = obj.getString("targetName");
				System.out.println(name+":"+url);
				url = url+"sight/";
				driver.get(url);
				try{
					clickElement(driver.findElement(By.cssSelector("[data-id='allpoiContent']")));
					Thread.sleep(500);
					clickElement(driver.findElement(By.cssSelector("#sift")).findElement(By.className("select")));
					Thread.sleep(500);
					clickElement(driver.findElement(By.cssSelector("[name='tag_all'][value='204']")));
					Thread.sleep(500);
					clickElement(driver.findElement(By.cssSelector("#poiSiftConfirm")));
					Thread.sleep(2000);
					try{
						driver.findElement(By.cssSelector("#poilistdiv")).findElement(By.tagName("li")).findElement(By.tagName("p"));
						System.out.println("Found Beach");
						obj.element("targetTypes", "beach");
					}catch(Exception e){
						System.out.println("No Beach Found");
						obj.element("targetTypes", "");
					}
				}catch(Exception e){
					System.out.println("No Sight");
				}
				Thread.sleep(10000);
			}
			//System.out.println(array);
			saveFile("c:\\temp\\jsoncountrydata.json",array.toString());
		}catch(Exception e){
			e.printStackTrace();
		}finally{
			closeSeleium();
		}
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
	public void clickElement(WebElement ele){
		ele.sendKeys(Keys.CONTROL);
		ele.click();
	}
}
