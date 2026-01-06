class parquimetro {
    #regras
    constructor(){
       this.#regras = [
            {tempo: 30, valor: 1.00},
            {tempo: 60, valor: 1.75},
            {tempo: 120, valor: 3.00},
       ]
    }

    calcularTempo(minutos){
       
        if(minutos < 30 || isNaN (minutos)){
           return { erro: true, mensagem: "O tempo minimo de estacionamento é de 30 minutos." };
        }
        else if(minutos > 120){
            return { erro: true, mensagem: "O tempo máximo de estacionamento é de 120 minutos." };
        }
        
        const regraEncontrada = this.#regras.find(regra => regra.tempo === minutos);
        
        if (regraEncontrada) {
            return { erro: false, valor: regraEncontrada.valor };
        } else {
            return { erro: true, mensagem: "Tempo inválido. Escolha 30, 60 ou 120 minutos." };
        }
    }
}


const Parquimetro = new parquimetro(); 
 

function calcular(){
   
    const tempo = parseFloat(document.getElementById("tempo").value);
    const pagamento = parseFloat(document.getElementById("pagamento").value); 
    

    const tarifaResultado = Parquimetro.calcularTempo(tempo); 
    
    
    const totalPagarElement = document.getElementById('valor');
    const trocoReceberElement = document.getElementById('troco');


    if (tarifaResultado.erro) {
        totalPagarElement.textContent = `ERRO: ${tarifaResultado.mensagem}`;
        trocoReceberElement.textContent = '';
        return; 
    }
    

    const valorTarifa = tarifaResultado.valor; 

    if (pagamento < valorTarifa || isNaN(pagamento)) {
        totalPagarElement.textContent = `Total a pagar: R$ ${valorTarifa.toFixed(2)}`;
        trocoReceberElement.textContent = `ERRO: Pagamento de R$ ${pagamento.toFixed(2)} insuficiente.`;
        return; 
    }


    const troco = pagamento - valorTarifa;

    totalPagarElement.textContent = `Total a pagar: R$ ${valorTarifa.toFixed(2)} (Tempo: ${tempo} min)`;
    trocoReceberElement.textContent = `Troco a receber: R$ ${troco.toFixed(2)}`;
}

//teste