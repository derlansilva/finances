class FinancesController {
    constructor(){
        this._formEl = document.querySelector('.form-icome')
        this._formDelete = document.querySelector('.form-expense')

        this._input = document.querySelector('.card-icome')
        this._cardExpense = document.querySelector('.card-expense')
        this._totalFinance = document.querySelector('.total')

        this._balance = 0
        this._exitFinance = 0
        this._total = 0

        this.onSubmit()

        this.setFinance()
    }

    setFinance(){
        this._input.innerHTML = `+ R$ ${this._balance} , 00`

        this._cardExpense.innerHTML = `- R$ ${this._exitFinance} , 00`

        this._totalFinance.innerHTML = ` R$ ${this._total} , 00`
    }

    addFinance(value){
        this._balance += value

        this._total += value

        this._formEl.reset()
        
        this.setFinance()

        
    }

    exitFinance(value){
        this._exitFinance += value

        this._total -= value

        this.setFinance()

    }

    exitValues(formDelete){
        let exit = {};

        [...formDelete.elements].forEach((fields  , index)=> {

            if(fields.name === 'value'){

                exit[fields.name] = fields.value
                this.exitFinance(parseInt(exit.value))

            }else if(fields.name === 'details'){

                exit[fields.name] = fields.value

            }
        })


        this.setFinance()
        
        return new Finance(
            exit.value,
            exit.details
        )

    }

    getValues(formEl){

        let finance = {};

        [...formEl.elements].forEach((fields , index) => {

            if(fields.name === 'value'){

                finance[fields.name] = fields.value
                this.addFinance(parseInt(finance.value))


            }else if(fields.name == 'details'){

                    finance[fields.name] = fields.value
        
            }

        })
    
        return new Finance(
            finance.value,
            finance.details
        )

    }

    onSubmit(){

        this.setFinance()

        
            this._formEl.addEventListener('submit' , e  => {
                e.preventDefault()

                
                    let value = document.querySelector('.input-icome').value
                    let details = document.querySelector('.input-details').value
                    
                    if(isNaN(value)){
                        alert("precisa por o valor")
                    }else if(!details){
                        alert("coloque tambem os detalhes")
                    }else{
                            
                            let btn = this._formEl.querySelector('[type=submit]')
                
                            let values = this.getValues(this._formEl)

                    }


            })

            this._formDelete.addEventListener('submit' , e => {
                e.preventDefault()

                let value = document.querySelector('.input-expense').value
                let details = document.querySelector('.details-expense').value

                if(isNaN(value)){
                    alert("precisa por o valor")
                }else if(!details){
                    alert("coloque tambem os detalhes")
                }else{

                    if(this._total < value){
                        alert('Você não pode retirar esse valor pois e superior ao que tem ')
                    }else{

                    let btn = this._formDelete.querySelector('[type=submit]')
        
                    let values = this.exitValues(this._formDelete)

                    }

                }

                this.setFinance()

            })
            
    }


}