import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: []
    }
    // this.getRepo = this.getRepo.bind(this);
    this.getRequest = this.getRequest.bind(this);
  }

  search (term) {
    console.log(`${term} was searched`);
    // TODO
    this.postRequest(term, this.getRequest);
  }

  
  getRepo(data) {
    this.setState({
      repos: data
    })
  }
  
  
  getRequest() {
    $.ajax({
      url:'http://localhost:1128/repos',
      method: 'GET',
      'contentType': 'application/json',
      error: function(err) {
        console.error(err);
      },
      success: (data) => {
        console.log('Get successful');
        console.log(data);
        this.getRepo(data);
      }
    })
  }
  
  postRequest(username, callback) {
    $.ajax({
      url: 'http://localhost:1128/repos',
      method: 'POST',
      'contentType': 'application/json',
      data: JSON.stringify({username: username}),
      error: function(error) {
        console.error(error);
      },
      success: function(data) {
        if (callback) {
          callback(data)
        }
        console.log('Post successful');
      }
    })
  }
  
  componentWillMount() {
    this.getRequest();
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));