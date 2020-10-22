export default (value) => {
  if (isNaN(value) || +value <= 0) return 'Amount shoud be positive number!'
}
