import { createReducer } from '@reduxjs/toolkit'
import {
  GET_PAY_METHODS,
  PAY_METHODS_CALCULATE,
  SEND_PAYMENT,
  RECALCULATE_TO_INIT,
  PAYMENT_TO_INIT,
} from './constants'

const INITIAL_STATE = {
  payMethods: {
    isFetching: false,
    invoice: [],
    withdraw: [],
    error: null,
  },
  recalculated: {
    isFetching: false,
    amount: '',
    side: 'withdraw',
    error: null,
  },
  payment: {
    isFetching: false,
    success: false,
    error: null,
  },
}

const HANDLERS = {
  [GET_PAY_METHODS]: (state) => ({
    ...state,
    payMethods: { ...state.payMethods, isFetching: true },
  }),
  [`${GET_PAY_METHODS}_SUCCESS`]: (state, { payload }) => ({
    ...state,
    payMethods: { ...state.payMethods, isFetching: false, ...payload },
  }),
  [`${GET_PAY_METHODS}_ERROR`]: (state, { payload }) => ({
    ...state,
    payMethods: { ...state.payMethods, isFetching: false, error: payload },
  }),
  [PAY_METHODS_CALCULATE]: (state) => ({
    ...state,
    recalculated: { ...state.recalculated, isFetching: true },
  }),
  [`${PAY_METHODS_CALCULATE}_SUCCESS`]: (state, { payload }) => ({
    ...state,
    recalculated: { ...state.recalculated, isFetching: false, ...payload },
  }),
  [`${PAY_METHODS_CALCULATE}_ERROR`]: (state, { payload }) => ({
    ...state,
    recalculated: { ...state.recalculated, isFetching: false, ...payload, amount: '' },
  }),
  [RECALCULATE_TO_INIT]: (state) => ({
    ...state,
    recalculated: { ...INITIAL_STATE.recalculated },
  }),
  [SEND_PAYMENT]: (state) => ({
    ...state,
    payment: { ...state.payment, isFetching: true },
  }),
  [`${SEND_PAYMENT}_SUCCESS`]: (state) => ({
    ...state,
    payment: { ...state.payment, isFetching: false, success: true },
  }),
  [`${SEND_PAYMENT}_ERROR`]: (state, { payload }) => ({
    ...state,
    payment: { ...state.payment, isFetching: false, error: payload },
  }),
  [PAYMENT_TO_INIT]: (state) => ({
    ...state,
    payment: { ...INITIAL_STATE.payment },
  }),
}

export default createReducer(INITIAL_STATE, HANDLERS)
