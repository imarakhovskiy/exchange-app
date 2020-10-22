import { formValueSelector } from 'redux-form'
import { createSelector } from 'reselect'

export const invoiceSelector = (state) => state.exchange.payMethods.invoice
export const withdrawSelector = (state) => state.exchange.payMethods.withdraw
export const payMethodsLoadingSelector = (state) => state.exchange.payMethods.isFetching

export const recalculatedAmountSelector = (state) => state.exchange.recalculated.amount
export const recalculatedSideSelector = (state) => state.exchange.recalculated.side
export const exchangeFormRecalculatingSelector = (state) =>
  state.exchange.recalculated.isFetching

export const paymentSuccessSelector = (state) => state.exchange.payment.success

const exchangeFormSelector = formValueSelector('exchange')
export const exchangeFormFieldSelector = (state) => (field) =>
  exchangeFormSelector(state, field)

export const exchangeFormLoading = createSelector(
  [exchangeFormRecalculatingSelector, payMethodsLoadingSelector],
  (isExchangeFormRecalculatingSelector, isPayMethodsLoadingSelector) =>
    isExchangeFormRecalculatingSelector || isPayMethodsLoadingSelector,
)
