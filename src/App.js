import React, { Component } from 'react';
import './App.css';

let defaultStyle = {
  color: "black"
}

let fakeServerData = {
  user: {
    name: "Nick",
    playlists: [
      {
        name: "My Favorites",
        songs: [{name: "S1", duration: 1234}, {name: "S2", duration: 543}, {name: "S3", duration: 1234}, {name: "S4", duration: 1234}],
      },
      {
        name: "More Songs",
        songs: [{name: "More 1", duration: 2234}, {name: "More 2", duration: 345}, {name: "More 3", duration: 1234}, {name: "More 4", duration: 1234}],
      },
      {
        name: "Third Times the Charm",
        songs: [{name: "One Third", duration: 52345}, {name: "Two Thirds", duration: 4322}, {name: "Three Thirds", duration: 1234}, {name: "Fourth", duration: 1234}],
      },
      {
        name: "THE FINAL PLAYLIST",
        songs: [{name: "FINALE", duration: 5324}, {name: "FIN", duration: 5435}, {name: "END", duration: 743657}, {name: "PERIOD", duration: 1234}]
      },
    ]
  }
}

class PlaylistCounter extends Component {
  render(){
    return (
      <div style={{...defaultStyle, width: "40%", display: "inline-block"}}>
        <h2>{this.props.playlists && this.props.playlists.length} playlists</h2>
      </div>
    )
  }
}

class HoursCounter extends Component {
  render(){
    let allSongs = this.props.playlists.reduce((songs, eachPlaylist) => {
      return songs.concat(eachPlaylist.songs)
    } ,[]);
    let totalDuration = allSongs.reduce((sum, eachSong) => {
      return sum + eachSong.duration;
    }, 0);
    return (
      <div style={{...defaultStyle, width: "40%", display: "inline-block"}}>
        <h2>{Math.floor(totalDuration / 60)} hours</h2>
      </div>
    )
  }
}

class Filter extends Component {
  render(){
    return (
      <div style={defaultStyle}>
        <img />
        <input type="text" />
      </div>
    )
  }
}

class Playlist extends Component {
  render() {
    return (
      <div style={{...defaultStyle, display: "inline-block", width: "25%"}}>
        <img />
        <h3>{this.props.playlist.name}</h3>
        <ul>
         {this.props.playlist.songs.map(song => {
           return <li>{song.name}</li>
         })}
        </ul>
      </div>
    )
  }
}

class App extends Component {
  constructor(){
    super()
    this.state = {serverData: {}}
  }
  componentDidMount(){
    this.setState({serverData: fakeServerData})
  }
  render() {
    return (
      <div className="App">
        {this.state.serverData.user ?
          <div>
            <h1 style={{...defaultStyle, 'font-size': '54px'}}>
              {this.state.serverData.user.name}'s Playlist
            </h1>
            <PlaylistCounter playlists={this.state.serverData.user.name}/>
            <HoursCounter playlists={this.state.serverData.user.playlists}/>
            <Filter />
            {this.state.serverData.user.playlists.map(playlist => {
              return <Playlist playlist={playlist}/>
            })
            }
          </div> : <h1 style={{defaultStyle}}>"Loading..."</h1>
        }
      </div>
    );
  }
}

export default App;
