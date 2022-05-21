export let errorsArr = [];

export function clearErrorsArr() {
  errorsArr = [];
  console.log('errorsArr ===', errorsArr);
}

function addError(message, field) {
  errorsArr.push({
    message,
    field,
  });
}

function checkRequired(value, field) {
  if (value === '') {
    addError('this field is required', field);
    return true;
  }
  return false;
}

function checkMinLength(value, minLength, field) {
  if (value.length <= minLength) {
    addError(`length must be greater than ${minLength}`, field);
  }
}

// rules ['required', 'minLength-4']
export function checkInput(valueToCheck, field, rulesArr) {
  for (const rule of rulesArr) {
    if (rule === 'required') {
      if (checkRequired(valueToCheck, field)) {
        return;
      }
    }
    if (rule === 'positive') {
      if (valueToCheck < 0) {
        addError('must be positive', field);
        return;
      }
    }

    if (rule.split('-')[0] === 'minLength') {
      const min = rule.split('-')[1];
      checkMinLength(valueToCheck, min, field);
    }

    if (rule.split('-')[0] === 'maxLength') {
      const max = rule.split('-')[1];
      if (valueToCheck.length >= max) {
        addError(`Too long. Length must be less than ${max}`, field);
      }
    }
  }
}
