import React from 'react';
import { connect } from "react-redux";
import * as userActions from "ducks/users/ActionTypes";
import { Button } from '@material-ui/core';

const UserList = ({ users, fetchUsers, fetchUser }) => {

  return(
      <>
      <Button color="primary" variant="contained" onClick={()=>{fetchUsers()}}>Fetch User List</Button>
      {
        users.map((user) => <div>{JSON.stringify(user)}</div>)
      }
      <Button color="primary" variant="contained" onClick={()=>{fetchUser()}}>Fetch User</Button>
      </>
    ) 
}

const mapStateToProps = (state) => ({ 
    users: state.users.list,
})

const mapDispatchToProps = (dispatch) => ({
    // dispatching plain actions
    fetchUsers: () => dispatch({ type: userActions.GET_USERS}),
    fetchUser: () => dispatch({ type: userActions.GET_USER}),
})

export default connect(mapStateToProps, mapDispatchToProps) (UserList);