const fs = require('fs');
const os = require('os');
const process = require('process');
const pidusage = require('pidusage');
const { performance } = require('perf_hooks');

// Função Quick Sort
function quickSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }

    const pivot = arr[arr.length - 1];  // Pivô é o último elemento
    const left = [];//cria uma lista p os elementos da esquerda
    const right = [];//cria uma lista p os elementos da esquerda

    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] < pivot) {
            left.push(arr[i]);//empurra os elementos menores q o pivo pra esquerda
        } else {
            right.push(arr[i]);//empurra os elementos maiores q o pivo pra direita
        }
    }

    // Chama a recursão para as duas partes e junta
    return [...quickSort(left), pivot, ...quickSort(right)];
}

// Função para ler o arquivo arq.txt
function lerArquivo(nomeArquivo) {
    fs.readFile(nomeArquivo, 'utf8', (err, data) => {
        if (err) {
            console.error("Erro ao ler o arquivo:", err);
            return;
        }

        // Converte o conteúdo do arquivo em uma lista de números
        const numeros = data.split(/\s+/).map(Number); // Separa por espaços ou quebras de linha e converte para número
        console.log("Lista original:", numeros);

        // Ordena os números usando o Quick Sort
        const numerosOrdenados = quickSort(numeros);
        console.log("Lista ordenada:", numerosOrdenados);

        // Escreve a lista ordenada no arquivo 'arq-saida.txt'
        fs.writeFile('arq-saida.txt', numerosOrdenados.join('\n'), (err) => {
            if (err) {
                console.error("Erro ao escrever no arquivo:", err);
            } else {
                console.log("Lista ordenada salva no arquivo 'arq-saida.txt'.");
            }
        });
    });
}

// Função para obter informações do sistema
function obterInfoSistema() {
    const memoriaTotal = os.totalmem() / (1024 * 1024);  // Memória total em MB
    const memoriaLivre = os.freemem() / (1024 * 1024);   // Memória livre em MB
    const cpu = os.cpus().map(cpu => cpu.model).join(", "); // Modelos de CPU

    return {
        nodeVersion: process.version,
        cpuModel: cpu,
        memoriaTotal: memoriaTotal,
        memoriaLivre: memoriaLivre
    };
}

// Função principal
function main() {
    const nomeArquivo = 'arq.txt';

    // Coleta de informações do sistema
    const sistemaInfo = obterInfoSistema();

    // Exibe as informações do sistema
    console.log(`Versão do Node.js: ${sistemaInfo.nodeVersion}`);
    console.log(`Modelo da CPU: ${sistemaInfo.cpuModel}`);
    console.log(`Memória total: ${sistemaInfo.memoriaTotal.toFixed(2)} MB`);
    console.log(`Memória livre: ${sistemaInfo.memoriaLivre.toFixed(2)} MB`);

    // Medir o tempo de execução
    const start = performance.now();

    // Lendo e ordenando os números
    lerArquivo(nomeArquivo);

    const end = performance.now();
    const tempoExecucao = end - start;

    // Monitorando a memória do processo
    pidusage(process.pid, (err, stats) => {
        if (err) {
            console.error("Erro ao monitorar o uso de memória:", err);
            return;
        }

        console.log(`Tempo de execução: ${tempoExecucao.toFixed(2)} ms`);
        console.log(`Memória utilizada pelo processo: ${(stats.memory / 1024).toFixed(2)} KB`);
    });
}

main();
