class FinancesController {

    constructor(){
        this._formEl = document.querySelector('.form-icome')
        this._formDelete = document.querySelector('.form-expense')
        this._input = document.querySelector('.card-icome')
        this._cardExpense = document.querySelector('.card-expense')
        this._totalFinance = document.querySelector('.total')

        this._added = 0
        this._exit = 0
        this._total = 0

        this._added2 = 0
        this._exit2 = 0
        this._total2 = 0

        this.onSubmit()
        this.setFinance()
        this.showFinances()
    }

    setFinance(){

        this._added2 =  parseInt(this._added)
        this._exit2 = parseInt(this._exit)
        this._total2 = parseInt(this._total)

        if(localStorage.getItem('finances')){

            let finance = JSON.parse(localStorage.getItem('finances'))

            finance.map(item => {

                this._total += parseInt( item.value)
                this._added += parseInt( item.added )
                this._exit  += parseInt( item.exit)

            })


        }

        console.log('Total ' , this._total2)

        this._input.innerHTML = `+ R$ ${this._added2} , 00`

        this._cardExpense.innerHTML = `- R$ ${this._exit2} , 00`

        this._totalFinance.innerHTML = ` R$ ${this._total2 } , 00`

    }

    addFinance(value){
        this._added += value

        this._total += value

        this._formEl.reset()
        
        this.setFinance()

        window.location.reload()

    }

    exitFinance(value){
        this._exit += value

        this._total2 -= value

        this.setFinance()

        window.location.reload()

    }

    showFinances(){

        let tbody = document.querySelector('.tbody-finance')
        let finance = JSON.parse(localStorage.getItem('finances'))


        finance.map(item => {
            let tr = document.createElement('tr')

            tr.innerHTML = '<td class="description">'+ item.description+
            `</td> <td class="${item.clase}">`+ item.value +
            '</td> <td class="date">' + item.date+
            '</td>'

            tbody.appendChild(tr)
        })


    }


    getFinances(details , value , classe , added ,  exit){

        let finances = {
            description: details,
            value : value,
            date : this.currentDate.toLocaleDateString('pt-BR') ,
            clase : classe,
            added : added,
            exit : exit
            
        };

        if(localStorage.getItem('finances') === null ){

            let total = []

            total.push(finances)

            localStorage.setItem('finances' , JSON.stringify(total))

        }else{
            let total = JSON.parse(localStorage.getItem('finances'))

            total.push(finances)

            localStorage.setItem('finances'  ,  JSON.stringify(total))
        }

        
        window.location.reload()


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

                            let exit = 0
                            let added = value

                            let classe = 'icome'

                            this.getFinances(details , value , classe  , added ,  exit )
                
       

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

                        let exit = value
                        let added = 0

                        let classe = 'expense'

                        this.getFinances(details , value , classe ,  added ,  exit)
           
                    }

                }

                this.setFinance()

            })
            
    }

    get currentDate(){
        return new Date()
    }


}