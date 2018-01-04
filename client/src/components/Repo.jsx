import React from 'react';

const Repo = (props) => (
  <div className="repo">
    <div>Repo: 
      {props.repo.name}
    </div>
    <div>Username: 
      {props.repo.username}
    </div>
    <div>Description: 
      {props.repo.description}
    </div>
    <div>URL: 
      <a href={props.repo.url}>
        {props.repo.url}
      </a>
    </div>
    <div>Star Count: 
      {props.repo.stargazers_count}
    </div>
  </div>
)

export default Repo;