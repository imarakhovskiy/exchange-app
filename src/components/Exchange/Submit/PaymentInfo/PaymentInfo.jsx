import React, { memo, useMemo } from 'react'
import cn from 'classnames'
import { PaymentInfoRow } from './PaymentInfoRow'
import styles from './styles.module.sass'

export const PaymentInfo = memo(
  ({
    className,
    exchangeFormInvoiceField,
    exchangeFormWithdrawField,
    exchangeFormInvoiceAmountField,
    exchangeFormWithdrawAmountField,
  }) => {
    const paymentInfoList = useMemo(
      () => [
        {
          label: 'Sell',
          amount: exchangeFormInvoiceAmountField,
          currency: exchangeFormInvoiceField && exchangeFormInvoiceField.label,
        },
        {
          label: 'Buy',
          amount: exchangeFormWithdrawAmountField,
          currency: exchangeFormWithdrawField && exchangeFormWithdrawField.label,
        },
      ],
      [
        exchangeFormInvoiceField,
        exchangeFormWithdrawField,
        exchangeFormInvoiceAmountField,
        exchangeFormWithdrawAmountField,
      ],
    )

    const renderPaymentInfoList = useMemo(
      () =>
        paymentInfoList.map((el) => (
          <PaymentInfoRow className={styles.paymentInfoListItem} key={el.label} {...el} />
        )),
      [paymentInfoList],
    )
    return (
      <ul className={cn(styles.paymentInfoList, className)}>{renderPaymentInfoList}</ul>
    )
  },
)
