import React, { Component } from 'react';
// import ModalVideo from 'react-modal-video';
import ModalVideo from './ModalVideo';

import FrontPage from './FrontPage';

class App extends Component {  
  state = {
    isOpen: false,
    videoId: 'UiukN_2AVEU'
  }

  openVideo = (id) => {
    this.setState({isOpen: true, videoId: id});
  }

  render() {
    return (
        <div>
          <ModalVideo channel='youtube' isOpen={this.state.isOpen} videoId={this.state.videoId} onClose={() => this.setState({isOpen: false})} />
          <FrontPage videoActivator={this.openVideo}/> 
        </div>
    );
  }
}

export default App;