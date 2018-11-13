const request = require('request-promise');
const searchYoutube = require('youtube-api-v3-search');

const generateRandomInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const sendAPIRequest = async (apiPath) => {
  try {
    const response = await request(apiPath, { json: true });
    return response;
  } catch (err) { 
    console.log(err);
    return 'error';
  }
};

export const getAnimes = async () => {
  const animePage = generateRandomInteger(1, 10);
  const apiPath = 'https://api.jikan.moe/v3/top/anime/' + animePage + '/tv';
  const response = await sendAPIRequest(apiPath);
  if (response === 'error') return response;
  const animes = [];
  while (animes.length !== 6) {
    const pos = generateRandomInteger(0, 49);
    const alreadyPicked = animes.filter(a => a.pos === pos);
    if (alreadyPicked.length === 0) animes.push({pos: pos, title: response.top[pos].title, img: response.top[pos].image_url});
  }
  return animes;
};

export const getYoutubeVideo = async (animeTitle) => {
  const options = {
    part: 'id',
    q: animeTitle + ' anime op',
    type: 'video'
  };
  try {
    const res = await searchYoutube('AIzaSyBCubdrUmUlYrkueAyYwnm6KtURKcoLCz8', options);
    if (res === 'error') return res;
    return res.items[0].id.videoId;
  } catch (error) {
    console.log('Youtube API Error');
    return 'error';
  }
};