const fs = require('fs');
const os = require('os');

// Função Bubble Sort
function bubbleSort(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                //Troca os elementos se estiverem na ordem errada
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    return arr;
}

// Função para ler o arquivo arq.txt
function lerArquivo(nomeArquivo) {
    // Imprimir as informações da linguagem e versão
    console.log("Linguagem utilizada: Node.js");
    console.log("Versão do Node.js:", process.version);
    console.log("Informações do Sistema:");
    console.log("Sistema Operacional:", os.type());
    console.log("Arquitetura:", os.arch());
    console.log("Memória total do sistema:", (os.totalmem() / 1024 / 1024).toFixed(2) + " MB");
    console.log("Núcleos de CPU:", os.cpus().length);

    // Lê o arquivo e ordena os números
    const start = process.hrtime(); // Começar a medição de tempo
    fs.readFile(nomeArquivo, 'utf8', (err, data) => {
        if (err) {
            console.error("Erro ao ler o arquivo:", err);
            return;
        }

        // Converte o conteúdo do arquivo em uma lista de números
        const numeros = data.split(/\s+/).map(Number); // Separa por espaços ou quebras de linha e converte para número
        console.log("Lista original:", numeros);

        // Ordena os números usando o Bubble Sort
        const numerosOrdenados = bubbleSort(numeros);
        console.log("Lista ordenada:", numerosOrdenados);

        // Salva o arquivo de saída
        fs.writeFile('arq-saida.txt', numerosOrdenados.join(' '), (err) => {
            if (err) {
                console.error("Erro ao escrever o arquivo:", err);
            } else {
                console.log("Arquivo 'arq-saida.txt' gerado com os números ordenados.");
            }
        });

        // Medir tempo e uso de memória
        const end = process.hrtime(start); // Tempo decorrido
        const tempoExecucao = (end[0] * 1000 + end[1] / 1000000).toFixed(2); // Convertendo para milissegundos
        const memoriaUsada = (process.memoryUsage().rss / 1024).toFixed(2); // Memória em KB

        console.log("Tempo de execução:", tempoExecucao, "ms");
        console.log("Memória utilizada:", memoriaUsada, "KB");
    });
}

// Chama a função para ler o arquivo e ordenar
lerArquivo('arq.txt');
