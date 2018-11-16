import React, { Component } from 'react';

import { getwheelAnimes, getYoutubeVideo, generateRandomInteger, getAnimes } from '../api/apiHandler';
import cardImage from '../images/cardblue.png';
import animeBlankImg from '../images/anime.jpg';

const MINIMUM_OF_LOADED_ANIMES = 15;

const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default class FrontCard extends Component {

  state = {
    animationState: 'running',
    frontImg: animeBlankImg,
    wheelAnimes: [],
    loadedAnimes: []
  }

  componentDidMount() {
    this.prepareWheelAnimes()
  }

  prepareWheelAnimes() {
    const animes = [];
    const possibleAnimes = this.props.loadedAnimes;
    while (animes.length !== 6) {
      const pos = generateRandomInteger(0, possibleAnimes.length - 1);
      const picked = possibleAnimes[pos];
      possibleAnimes.splice(pos, 1);
      animes.push(picked);
    }
    this.setState({wheelAnimes: animes, loadedAnimes: possibleAnimes});
  }

  async refillAnimes() {
    const refillPos = generateRandomInteger(0, this.state.loadedAnimes.length - 1);
    this.state.wheelAnimes.push(this.state.loadedAnimes[refillPos]);
    this.state.loadedAnimes.splice(refillPos, 1);
    if (this.state.loadedAnimes.length <= MINIMUM_OF_LOADED_ANIMES) {
      const newAnimes = await getAnimes();
      this.setState({loadedAnimes: newAnimes});
    }
  }

  async prepareAnimeYoutubeVideo(anime) {
    const videoId = await getYoutubeVideo(anime.title);
    if (videoId === 'error') return this.props.errorActivator();
    await sleep(500);
    this.setState({animationState: 'finished'});
    this.props.videoActivator(videoId);
  }

  getImgAngle(img) {
    const matrix = window.getComputedStyle(img, null).getPropertyValue('transform');
    if(matrix === 'none') return;
    const values = matrix.split('(')[1].split(')')[0].split(',');
    const a = values[0];
    const b = values[1];
    let angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));
    if (angle < 0) angle = 360 + angle; 
    return angle;
  }

  endSpinningAnimation(img, anime) {
    const endSpin = () => {
      img.classList.toggle('spinning');
      const div = document.getElementsByClassName('main-front');
      div[0].classList.toggle('flipper');
      div[0].classList.toggle('is-flipped');
      this.prepareAnimeYoutubeVideo(anime);
      img.removeEventListener('animationiteration', endSpin);
    };
    img.addEventListener('animationiteration', endSpin);
  }

  restartSpin() {
    const div = document.getElementsByClassName('main-front');
    div[0].classList.toggle('is-flipped');
    this.setState({animationState: 'stopping'});

    const endFlip = () => {
      div[0].classList.toggle('flipper');
      div[0].removeEventListener('transitionend', endFlip);
      const img = document.getElementsByClassName('cardBack');
      img[0].classList.toggle('spinning');
      this.setState({animationState: 'running', frontImg: animeBlankImg});
    };
    div[0].addEventListener('transitionend', endFlip);
  }

  imageClick(e) {
    if (this.state.animationState === 'stopping' || this.state.wheelAnimes.length !== 6) return;
    if (this.state.animationState === 'finished') return this.restartSpin();
    const img = e.target;
    const angle = this.getImgAngle(img);
    const choiced = Math.floor(angle / 60);
    const anime = this.state.wheelAnimes[choiced];
    this.state.wheelAnimes.splice(choiced, 1);
    console.log('choiced number ' + choiced);
    this.setState({animationState: 'stopping', frontImg: anime.image_url});
    this.refillAnimes();
    this.endSpinningAnimation(img, anime);
  } 

  render() {
    return(
      <main className='main-front'>
        <img className='card cardBack spinning' src={cardImage} onClick={(e) => this.imageClick(e)} alt='Card'/>
        <img className='card cardFront' src={this.state.frontImg} onClick={(e) => this.imageClick(e)} alt='Card'/>
      </main>
    );
  }
}
