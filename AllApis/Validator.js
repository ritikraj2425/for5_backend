class Validator{
    static validateInput(inputs){
        for(let key in inputs){
            if(!inputs[key]){
                return {
                    isInputValid : false,
                    msg : `${key} field cannot be empty`
                }
            }
        }
        return {
            isInputValid : true
        }
    }
}
module.exports = Validator;