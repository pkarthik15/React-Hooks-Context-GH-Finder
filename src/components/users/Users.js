import React from 'react'
import Useritem from './Useritem'
import Spinner from '../layout/Spinner'
import PropTypes from 'prop-types'


const Users = ({loading, users}) => {    

    if(loading){

        return <Spinner/>

    } else {

        return (        
            <div style={userStyle}>
                {
                    users.map(user => (
                        <Useritem key={user.id} user={user}></Useritem>
                    ))
                }
            </div>
        )  
    }
}

Users.propTypes = {
    users : PropTypes.array.isRequired,
    loading : PropTypes.bool.isRequired,
}

const userStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridGap: '1rem'
}

export default Users
