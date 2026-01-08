//aqui cria a classe treino
class Treino {
    #regras //atributo privado, quando colocado o # antes do nome do atributo ele se torna privado
    constructor(){// método construtor que é chamado quando a classe é instanciada, instaciar é criar um objeto a partir de uma classe
        this.#regras = [//array de objetos, são as regras de tempo e valor
            {minutos: 30, valor: 1.00},
            {minutos: 60, valor: 1.75},
            {minutos: 120, valor: 3.00},
        ]
      
    }
    
    calcularTempo(min){ //aqui é o método calcularTempo que recebe o parâmetro min que é o tempo em minutos
        if(min < 30 || isNaN (min)){ //aqui verifica se o tempo é menor que 30 ou se não é um número
            return { erro: true, mensagem: "O tempo minimo de estacionamento é de 30 minutos." };
         }
         else if(min > 120){// aqui verifica se o tempo é maior que 120
             return { erro: true, mensagem: "O tempo máximo de estacionamento é de 120 minutos." };
         }

        const regraEncontrada = this.#regras.find(regra => regra.minutos === min); //aqui procura a regra que corresponde ao tempo em minutos passado como parâmetro
        
        if (regraEncontrada) {// se encontrar a regra correspondente
            return { erro: false, valor: regraEncontrada.valor };
        } else {
            return { erro: true, mensagem: "Tempo inválido. Escolha 30, 60 ou 120 minutos." };// se não encontrar a regra correspondente
        }
}
}

const TreinoEstacionamento = new Treino(); //aqui instancia a classe treino criando um objeto chamado TreinoEstacionamento

function calcular(){ //função calcular que é chamada quando o botão calcular é clicado
    const tempo = parseFloat(document.getElementById("tempo").value); //aqui pega o valor do input tempo e converte para float
    const pagamento = parseFloat(document.getElementById("pagamento").value); //aqui pega o valor do input pagamento e converte para float
    const tarifaResultado = TreinoEstacionamento.calcularTempo(tempo); //aqui chama o método calcularTempo da classe TreinoEstacionamento passando o tempo como parâmetro e armazena o resultado na variável tarifaResultado
    const totalPagarElement = document.getElementById('valor'); //aqui pega o elemento HTML com o id valor
    const trocoReceberElement = document.getElementById('troco'); //aqui pega o elemento HTML com o id troco
    if (tarifaResultado.erro) { //aqui verifica se houve um erro no cálculo do tempo
        totalPagarElement.textContent = `ERRO: ${tarifaResultado.mensagem}`; //se houve um erro, exibe a mensagem de erro no elemento totalPagarElement
        trocoReceberElement.textContent = '';
        return; //encerra a função
    }
    const valorTarifa = tarifaResultado.valor; //aqui pega o valor da tarifa do resultado do cálculo do tempo
    if (pagamento < valorTarifa || isNaN(pagamento)) { //aqui verifica se o pagamento é menor que o valor da tarifa ou se não é um número
        totalPagarElement.textContent = `Total a pagar: R$ ${valorTarifa.toFixed(2)}`; //se o pagamento for insuficiente, exibe o valor total a pagar no elemento totalPagarElement
        trocoReceberElement.textContent = `ERRO: Pagamento de R$ ${pagamento.toFixed(2)} insuficiente.`; //exibe a mensagem de erro no elemento trocoReceberElement
        return; //encerra a função
    }
    const troco = pagamento - valorTarifa; //aqui calcula o troco subtraindo o valor da tarifa do pagamento
    totalPagarElement.textContent = `Total a pagar: R$ ${valorTarifa.toFixed(2)}`; //exibe o valor total a pagar no elemento totalPagarElement
    trocoReceberElement.textContent = `Troco a receber: R$ ${troco.toFixed(2)}`; //exibe o valor do troco no elemento trocoReceberElement   
}

   
