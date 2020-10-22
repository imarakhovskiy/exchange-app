import { createAction } from '@reduxjs/toolkit'

const actionsCreator = (action_name) => {
  const actionsNames = [action_name, `${action_name}_SUCCESS`, `${action_name}_ERROR`]
  return actionsNames.reduce((accum, item) => {
    accum.push(createAction(item))
    return accum
  }, [])
}

export default actionsCreator
