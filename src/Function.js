
export async function drawGraph(appId,setPoints) {
    const data = await getData(appId);
    var newpoints = [];
    console.log(data,"data");
    if(data){
    const news = data.appnews.newsitems;
        if(news.length!==0){
            for(let i=0; i<news.length-1; i++){
                let timedif = news[i].date-news[i+1].date;
                let daydif = Math.round(timedif / (24 * 60 * 60));
                const date = new Date(news[i].date*1000-24*60*60*1000);
                const year = date.getFullYear();
                const month = date.getMonth() + 1; // Months are zero-based, so add 1
                const day = date.getDate();
                const url = news[i].url;

                newpoints.push({x: news.length-i-1, y:daydif, date:month+"/"+day+"/"+year, title:news[i].title, url:url});
                console.log(newpoints);
                
                }
            if(news.length<31){
                const date = new Date(news[news.length-1].date*1000-24*60*60*1000);
                const year = date.getFullYear();
                const month = date.getMonth() + 1; // Months are zero-based, so add 1
                const day = date.getDate();
                const url = news[news.length-1].url;
                newpoints.push({x: 0, y:0, date:month+"/"+day+"/"+year, title:news[news.length-1].title, url:url});
            }
        }else{
            newpoints.push({x:-1, y:-1, date: "XXX", title:"NO NEWS"})
        }
    }else{
        newpoints.push({x:-1, y:-1, date: "XXX", title:"NO DATA FOUND"})
    }
    setPoints(newpoints);

    // Now you have an array of titles, you can use it as needed
  }
  
async function getData(appId) {
    const apiUrl = `https://steam-news-api.vercel.app/api/news?appId=${appId}`;

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
        throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function getOptions(text){
    const apiUrl = `https://steam-news-api.vercel.app/api/Search?text=${text}`;
    // const apiUrl = `https://steamcommunity.com/actions/SearchApps/{text}/`;
    var  data2 =[];
    try {
        console.log("working");
        const response = await fetch(apiUrl);
    
        if (!response.ok) {
        throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }
    
        data2 = await response.json();
    } catch (error) {
        console.error(error);
    }
    console.log(data2[0]);
    const options=[];
    for(let i=0;i<Math.min(data2.length,10);i++){
        options.push({label:data2[i].name, appId:data2[i].appid})
    }
    return options;
}