import React, { Component } from 'react';

import { getAnimes, getYoutubeVideo } from '../api/apiHandler';
import cardImage from '../images/cardblue.png';
import anime from '../images/anime.jpg';

export default class FrontCard extends Component {

  state = {
    animationState: 'running',
    frontImg: anime
  }

  componentDidMount() {
    this.prepareAnimes();
  }

  async prepareAnimes() {
    const animes = await getAnimes();
    if (animes === 'error') return this.props.errorActivator();
    console.log(animes);
    this.setState({animes: animes});
    const el = document.getElementsByClassName('cardBack');
    el[0].style.cursor='pointer';
  }

  async prepareAnimeYoutubeVideo(anime) {
    const videoId = await getYoutubeVideo(anime.title);
    if (videoId === 'error') return this.props.errorActivator();
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
      this.setState({animationState: 'running', frontImg: anime});
    };
    div[0].addEventListener('transitionend', endFlip);
  }

  imageClick(e) {
    if (this.state.animationState === 'stopping' || this.state.animes === undefined) return;
    if (this.state.animationState === 'finished') return this.restartSpin();
    const img = e.target;
    const angle = this.getImgAngle(img);
    const choiced = Math.floor(angle / 60);
    const anime = this.state.animes[choiced];
    console.log('choiced number ' + choiced);
    this.setState({animationState: 'stopping', frontImg: anime.img});
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
