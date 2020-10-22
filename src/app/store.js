import { configureStore } from '@reduxjs/toolkit'
import { reducer as formReducer } from 'redux-form'
import exchageReducer from './exchange'

export default configureStore({
  reducer: {
    form: formReducer,
    exchange: exchageReducer,
  },
})
