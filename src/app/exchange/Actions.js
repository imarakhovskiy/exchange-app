import { createAction } from '@reduxjs/toolkit'
import API, { PAY_METHODS, PAY_METHODS_CALC, BIDS } from 'api'
import actionsCreator from 'helpers/redux/actionsCreator'
import objToQueryString from 'helpers/objToQueryString'
import {
  GET_PAY_METHODS,
  PAY_METHODS_CALCULATE,
  SEND_PAYMENT,
  RECALCULATE_TO_INIT,
  PAYMENT_TO_INIT,
} from './constants'

export const [
    payMethodsCalculate,
    payMethodsCalculateSuccess,
    payMethodsCalculateError,
  ] = actionsCreator(PAY_METHODS_CALCULATE),
  [getPayMethods, getPayMethodsSuccess, getPayMethodsError] = actionsCreator(
    GET_PAY_METHODS,
  ),
  [sendPayment, sendPaymentSuccess, sendPaymentError] = actionsCreator(SEND_PAYMENT)

export const recalculateToInit = createAction(RECALCULATE_TO_INIT)
export const paymentToInit = createAction(PAYMENT_TO_INIT)

export const fetchPayMethods = (dispatch) => () => {
  dispatch(getPayMethods())
  return API.get(PAY_METHODS)
    .then(({ data }) => {
      dispatch(getPayMethodsSuccess(data))
    })
    .catch((err) => dispatch(getPayMethodsError(err)))
}

export const requestPayMethodsCalculate = (dispatch) => ({ base, ...payload }) => {
  const inversedBase = base === 'invoice' ? 'withdraw' : 'invoice'
  dispatch(payMethodsCalculate())
  return API.get(`${PAY_METHODS_CALC}?${objToQueryString({ ...payload, base })}`)
    .then(({ data: { amount } }) => {
      const payload = { amount, side: inversedBase }
      dispatch(payMethodsCalculateSuccess(payload))
    })
    .catch((error) => dispatch(payMethodsCalculateError({ error, side: inversedBase })))
}

export const postPayment = (dispatch) => (payment) => {
  dispatch(sendPayment())
  return API.post(BIDS, { body: JSON.stringify(payment) })
    .then(() => {
      dispatch(sendPaymentSuccess())
    })
    .catch((error) => dispatch(sendPaymentError(error)))
}
