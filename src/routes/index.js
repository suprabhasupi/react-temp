import React from 'react'
import { Route, Switch, withRouter } from 'react-router-dom';
//Code splitting
const WaitingComponent = Component => {
  return props => (
    <React.Suspense fallback={<div>Loading...</div>}>
      <Component {...props} />
    </React.Suspense>
  );
}

const Homepage = React.lazy(() => import('../pages/home'));

const Router = () => {
  return (
    <Switch>
      <Route exact={true} path="/" component={WaitingComponent(Homepage)} />
    </Switch>
  )
}

export default withRouter(Router);