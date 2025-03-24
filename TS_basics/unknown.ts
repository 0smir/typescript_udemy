function process(val: unknown) { // unknown forces to check all possible variants of errors. It's better to use unknown if you don't know which type of values you will get 
  // if we use any type, we don't need to make this long code check. But we can pass an error (exmp: value not contain log)
  if (typeof val === 'object' &&
    !!val &&
    'log' in val &&
    typeof val.log === 'function') {
    val.log()
  }
}