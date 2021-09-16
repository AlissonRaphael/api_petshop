export class Validator {
  constructor(
    public errors: any[] = []
  ){}

  addError(message){
    this.errors.push(message)
  }

  isRequired(value, message) {
    if(!value || value.length <= 0){
      this.errors.push(message)
    }
  }

  hasMinLen(value, min, message) {
    if(!value || value.length < min) {
      this.errors.push(message)
    }
  }

  hasMaxLen(value, max, message) {
    if(!value || value.length > max) {
      this.errors.push(message)
    }
  }

  isFixedLen(value, len, message) {
    if(value.length !== len){
      this.errors.push(message)
    }
  }

  isEmail(value, message){
    const reg = new RegExp(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)
    if(!reg.test(value)){
      this.errors.push(message)
    }
  }

  clear(){
    this.errors = []
  }

  isValid() {
    return this.errors.length === 0
  }
}