const visor = document.getElementById('resultado');
const calculadora = document.querySelector('#calculadora');
const operadorVisor = document.querySelector('#operador');
let teclaAnterior = '';
let primeiroValor = 0;
let segundoValor = 0;
let operador = '';

const calcular = (n1, operator, n2) => {
    const pNum = parseFloat(n1);
    const sNum = parseFloat(n2);

    if (operator === '+') {
        return pNum + sNum;
    };
    if (operator === '-') {
        return pNum - sNum;
    };
    if (operator === '*') {
        return pNum * sNum
    };
    if (operator === '/') {
        return pNum / sNum
    };
};

document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', (e) => {
        const valor = e.target.value;
        const tipo = e.target.className;

        switch (tipo) {
            case 'numero':
                if (visor.innerText === '0' || teclaAnterior == 'calcular') {
                    visor.innerText = valor;
                } else {
                    visor.innerText += valor; 
                };
                teclaAnterior = 'numero';
                operadorVisor.innerText = '';
                break;
            case 'operador':
                if (teclaAnterior != 'operador') {
                    primeiroValor = visor.innerText;
                    operador = valor;
                    teclaAnterior = 'operador';
                    visor.innerText = '';
                    operadorVisor.innerText = valor;
                } else {
                    operadorVisor.innerText = valor;
                    operador = valor;
                } 
                break;
            case 'igual':
                segundoValor = visor.innerText;
                visor.innerText = calcular(primeiroValor, operador, segundoValor);
                teclaAnterior = 'calcular';
                break;
            case 'decimal':
                if (!visor.innerText.includes('.') && teclaAnterior != 'calcular') {
                    visor.innerText += '.';
                };
                if (teclaAnterior == 'calcular') {;
                    visor.innerText = '.';
                };
                teclaAnterior = 'decimal';
                operadorVisor.innerHTML = '';
                break;
            case 'del':
                visor.innerText = visor.innerHTML.substring(0, visor.innerHTML.length - 1);
                break;
            case 'c':
                visor.innerHTML = '0';
                primeiroValor = '';
                break;
            default:
                visor.innerText = 'Erro';
        };
    });
});
