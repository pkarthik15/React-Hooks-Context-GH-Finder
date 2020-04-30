import React, { useState, useContext } from 'react'
import GithubContext from '../../context/github/githubContext'
import AlertContext from '../../context/alert/AlertContext'


const Search = () => {
    
    const {searchUsers, clearUsers, users} = useContext(GithubContext);

    const {setAlert} = useContext(AlertContext);

    const [text, setText] = useState('')
    
    const onSubmit = (e) => {
        e.preventDefault();
        if(text === ''){
            setAlert('Please enter something', 'light');
        } else {
            searchUsers(text);
            setText('');
        }
    }

    return (
        <div>
            <form className="form" onSubmit={onSubmit}>
                <input type="text" name="text" placeholder="Search Users..." value={text} onChange={ (e) => setText(e.target.value) } />
                <input type="submit" value="Search" className="btn btn-dark btn-block"></input>
            </form>
            {
                users.length> 0 &&  <button className="btn btn-light btn-block" onClick={clearUsers}>Clear</button>
            }               
        </div>
    )   
}

export default Search
