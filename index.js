const BASE_URL = "https://www.googleapis.com/youtube/v3";
const API_KEY = "AIzaSyBEfRIPXjRjOxp9DO9_EMJtEO_0ZPhzCaA";

const container = document.getElementById("videos-container");


async function getVideo(q){
     const url = `${BASE_URL}/search?key=${API_KEY}&q=${q}&type=video&maxResults=20`;
     const response = await fetch(url);
     const data = await response.json();

     const videos = data.items;
     getVideoData(videos);
}



async function getVideoDetails(videoId){
    const url = `${BASE_URL}/videos?key=${API_KEY}&part=snippet,contentDetails,statistics&id=${videoId}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.items[0];
    
}

async function getVideoData(videos){
    let videoData = []; 
    for(let i = 0;i<videos.length;i++){
        const video = videos[i];
        const videoId = video.id.videoId;
        videoData.push(await getVideoDetails(videoId));
    }
    console.log(videoData)
    renderVideos(videoData);
}


function renderVideos(videos){
    container.innerHTML = ``;
    for(let i = 0;i<videos.length;i++){
        let video = videos[i];
        let updatediews = 'K';
        if(video.statistics.viewCount >= 1000000){
            updatediews = 'M'
            video.statistics.viewCount = Math.floor(video.statistics.viewCount/1000000);
        }else{
            video.statistics.viewCount = Math.floor(video.statistics.viewCount/1000);
        }
        container.innerHTML += `<div class="video-info" onclick="openVideoDetails('${video.id}')">
        <div class="video-image">
            <img src="${video.snippet.thumbnails.high.url}" alt="video thumbnail" id="thumbnail">
        </div>
        <div class="video-description">
            <div class="channel-avatar">
                <img src="assets/images/p${i%7}.png" alt="channel avatar">
            </div>
              
            <div class="channel-description">
                <p>${video.snippet.localized.title}</p>
                <p class="channel-name">
                    ${video.snippet.channelTitle}
                </p>
                <p class="video-views">
                    ${video.statistics.viewCount+updatediews+" views" + ". 1 Week ago"}
                </p>
            </div>
        </div>
    </div>`
    }
}


function openVideoDetails(videoId){
    localStorage.setItem("videoId",videoId);
    window.open(`https://www.youtube.com/watch?v=${videoId}`);
}


async function displaySearchResult(){
    container.innerHTML = '<h3>Loading Search results...</h3>';
    let query = document.getElementById("search").value;
    getVideo(query);

    
}







getVideo("");