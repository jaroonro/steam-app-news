
export async function drawGraph(appId,setPoints) {
    const data = await getData(appId);
    var newpoints = [];
    if(data){
    const news = data.appnews.newsitems;
    for(let i=0; i<news.length-1; i++){
        let timedif = news[i].date-news[i+1].date;
        let daydif = Math.round(timedif / (24 * 60 * 60));
        const date = new Date(news[i].date*1000-24*60*60*1000);
        const year = date.getFullYear();
        const month = date.getMonth() + 1; // Months are zero-based, so add 1
        const day = date.getDate();

        newpoints.push({x: news.length-i-1, y:daydif ,date:month+"/"+day+"/"+year,title:news[i].title});
        console.log(newpoints);
        
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
    console.log("working");
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
