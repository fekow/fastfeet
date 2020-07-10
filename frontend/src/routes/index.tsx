import React, { ReactElement, useState } from 'react';
import { Switch } from 'react-router-dom';

import Route from './route';
import SignIn from 'pages/SignIn';
import CourierRegister from 'pages/Couriers/Register';
import CourierUpdate from 'pages/Couriers/Update';
import ListCouriers from 'pages/Couriers';
import OrderRegister from 'pages/Orders/Register';
import OrderUpdate from 'pages/Orders/Update';
import ListOrders from 'pages/Orders';
import RecipientRegister from 'pages/Recipients/Register';
import RecipientUpdate from 'pages/Recipients/Update';
import ListRecipients from 'pages/Recipients';
import ListProblems from 'pages/Problems';

import RecipientContext from 'pages/Recipients/RecipientContext';
import OrderContext from 'pages/Orders/OrderContext';
import CourierContext from 'pages/Couriers/CourierContext';

import { OrderPrevious, RecipientPrevious, CourierPrevious } from 'types';

const Routes = (): ReactElement => {
  const [recipientPrevious, setRecipientPrevious] = useState<RecipientPrevious>(
    {
      name: '',
      address_name: '',
      address_number: '',
      street_add_on: '',
      state: '',
      city: '',
      postal_code: '',
    }
  );
  const [orderPrevious, setOrderPrevious] = useState<OrderPrevious>({
    courier_id: 0,
    recipient_id: 0,
    product: '',
  });
  const [courierPrevious, setCourierPrevious] = useState<CourierPrevious>({
    name: '',
    email: '',
  });
  function setOrderContext(oldRecipient: OrderPrevious) {
    setOrderPrevious(oldRecipient);
  }
  function resetOrderContext() {
    setOrderPrevious({
      courier_id: 0,
      recipient_id: 0,
      product: '',
    });
  }
  function setRecipientState(oldRecipient: RecipientPrevious) {
    setRecipientPrevious(oldRecipient);
  }
  function setCourierState(oldCourier: CourierPrevious) {
    setCourierPrevious(oldCourier);
  }
  function resetCourierState() {
    setCourierPrevious({
      name: '',
      email: '',
    });
  }
  function resetRecipient() {
    setRecipientPrevious({
      name: '',
      address_name: '',
      address_number: '',
      street_add_on: '',
      state: '',
      city: '',
      postal_code: '',
    });
  }
  return (
    <RecipientContext.Provider
      value={{
        setRecipientState: setRecipientState,
        resetRecipient: resetRecipient,
        recipientPrevious,
      }}
    >
      <OrderContext.Provider
        value={{
          setOrderContext: setOrderContext,
          resetOrderContext: resetOrderContext,
          orderPrevious,
        }}
      >
        <CourierContext.Provider
          value={{
            setCourierState: setCourierState,
            resetCourierState: resetCourierState,
            courierPrevious,
          }}
        >
          <Switch>
            <Route path="/" exact component={SignIn} />

            <Route path="/orders" exact component={ListOrders} isPrivate />
            <Route path="/order/update/:id" component={OrderUpdate} isPrivate />

            <Route
              path="/recipients"
              exact
              component={ListRecipients}
              isPrivate
            />
            <Route
              path="/recipient/update/:id"
              component={RecipientUpdate}
              isPrivate
            />
            <Route path="/couriers" exact component={ListCouriers} isPrivate />
            <Route
              path="/courier/update/:id"
              component={CourierUpdate}
              isPrivate
            />
            <Route
              path="/couriers/register"
              component={CourierRegister}
              isPrivate
            />
            <Route
              path="/orders/register"
              component={OrderRegister}
              isPrivate
            />
            <Route
              path="/recipients/register"
              component={RecipientRegister}
              isPrivate
            />
            <Route path="/problems" component={ListProblems} isPrivate />
          </Switch>
        </CourierContext.Provider>
      </OrderContext.Provider>
    </RecipientContext.Provider>
  );
};
export default Routes;
