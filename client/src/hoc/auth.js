import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../_actions/user_action';

export default function (SpecificComponent, option, adminRoute = null) {

  function AuthenticationCheck(props) {
    console.log(props)
    const dispatch = useDispatch();

    useEffect(() => {

      dispatch(auth())
        .then(response => {
          console.log(response)

          if (!response.payload.isAuth) {
            if (option) {
              props.history.push('/loign');
            }
          } else {
            if (adminRoute && !response.payload.isAdmin) {
              props.history.push('/');
            } else {
              if (option === false)
                props.history.push('/');
            }
          }
        })

    }, [])

    return (
      <SpecificComponent {...props} />
    )
  }

  return AuthenticationCheck
}