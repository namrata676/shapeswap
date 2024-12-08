import React from 'react';
import { Route } from 'react-router-dom';

const AppRoute = ({
  component: Component,
  layout: Layout,
  ...rest
}) => {
  
   // eslint-disable-next-line no-param-reassign
  Layout = (Layout === undefined) ? props => (<>{props.children}</>) : Layout;

  return (
    <Route
      {...rest}
      render={props => (
        <Layout>
          <Component {...props} />
        </Layout>
      )} />
  );
}

export default AppRoute;