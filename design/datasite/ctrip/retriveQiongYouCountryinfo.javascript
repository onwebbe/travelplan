window.location="http://place.qyer.com/"
var fullArray = new Array();
var continents = $(".pla_indcountrylist");
var x = 0;
for(i=0;i<continents.length;i++){
    var continent = continents[i];
    var continentText = $(continent).find("h2 em a").text();
    var countriesout = $(continent).find("div:not(:eq(1))");
    for(j=0;j<countriesout.length;j++){
        var tempcountries = countriesout[j];
        var countries = $(tempcountries).find("li a");
        for(k=0;k<countries.length;k++){
            var country = countries[k];
            var href = country.getAttribute("href");
            var countryFullText = country.text;
            var countryEnglishText = $($(country).find("span.en")[0]).text();
            var countryC = countryFullText.substring(0,countryFullText.length-countryEnglishText.length-1);
            var data = {"adviceLength":"3","continent":continentText,"country":countryC,"id":countryEnglishText+x,"introduction":"","province":"","targetInfoURL":href,"targetNameC":countryC,"targetNameE":countryEnglishText,"targetNameP":"","targetTypes":""}
            fullArray.push(data);
            x++;
        }
    }
}

console.log(JSON.stringify(fullArray));