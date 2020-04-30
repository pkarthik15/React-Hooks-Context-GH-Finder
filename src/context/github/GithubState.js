import React, { useReducer } from 'react'
import axios from 'axios'
import GithubContext from './githubContext'
import githubReducer from './githubReducer'

import {
    SEARCH_USERS,
    GET_USER,
    GET_REPOS,
    SET_LOADING,
    CLEAR_USERS,
} from '../types'

const GithubState = props => {

    const initialState = {
        users: [],
        user: {},
        repos: [],
        loading: false
    }

    const [state, dispatch] = useReducer(githubReducer, initialState);

    // useEffect(()=>{

    //     getUsers()
    //     // eslint-disable-next-line

    // }, []);

    // const getUsers = async () => {
    //     try {
    //         setLoading();
    //         const response = await axios.get(`https://api.github.com/users?client_id=${process.env.GITHUB_FINDER_GH_CLIENT_ID}&client_secret=${process.env.GITHUB_FINDER_GH_CLIENT_SECRET}`);      
    //         dispatch({
    //             type: SEARCH_USERS,
    //             payload: response.data
    //         });
    //     }
    //     catch(error){
    //         console.log(error);
    //     } 
    // }

    //Actions

    //SET LOADING
    const setLoading = () => dispatch({type:SET_LOADING});

    //CLEAR USERS
    const clearUsers = () => dispatch({type:CLEAR_USERS});


    //SEARCH USERS
    const searchUsers = async (text) => {
        try {        
            setLoading();
            const response = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.GITHUB_FINDER_GH_CLIENT_ID}&client_secret=${process.env.GITHUB_FINDER_GH_CLIENT_SECRET}`);
            dispatch({
                type: SEARCH_USERS,
                payload: response.data.items
            });            
        }
        catch(error){
          console.log(error);
        }    
    };

    //GET USER
    const getUser = async (login) => {
        try{
            setLoading();
            const response = await axios.get(`https://api.github.com/users/${login}?client_id=${process.env.GITHUB_FINDER_GH_CLIENT_ID}&client_secret=${process.env.GITHUB_FINDER_GH_CLIENT_SECRET}`);      
            dispatch({
                type: GET_USER,
                payload: response.data
            });
        }
        catch(error){
          console.log(error);
        }    
    }

    //GET USER REPOS
    const getUserRepos = async (login) => {
        try{
          setLoading(true);
          const response = await axios.get(`https://api.github.com/users/${login}/repos?per_page=5&sort=created:asc&client_id=${process.env.GITHUB_FINDER_GH_CLIENT_ID}&client_secret=${process.env.GITHUB_FINDER_GH_CLIENT_SECRET}`);      
          dispatch({
            type: GET_REPOS,
            payload: response.data
        });
        }
        catch(error){
          console.log(error)
        }    
    }

    return <GithubContext.Provider value = {{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos
    }}>
        {props.children}
    </GithubContext.Provider>

}

export default GithubState;

