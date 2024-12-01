import time
import platform
import psutil
import os

# Função de ordenação Bubble Sort
def bubble_sort(arr):
    for i in range(len(arr)):
        for j in range(len(arr) - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    return arr

# Lê o arquivo arq.txt e converte o conteúdo em uma lista de números
def ler_arquivo(nome_arquivo):
    with open(nome_arquivo, 'r', encoding='utf-8-sig') as f:
        return list(map(int, f.read().split()))


# Função para obter informações do sistema
def obter_info_sistema():
    # Informações sobre a linguagem e versão
    linguagem = platform.python_implementation()
    versao = platform.python_version()

    # Informações sobre a CPU e Memória
    cpu = psutil.cpu_percent(interval=1)  # Percentual de uso da CPU
    memoria = psutil.virtual_memory()  # Informações de memória
    memoria_total = memoria.total / (1024 * 1024)  # Memória total em MB
    memoria_usada = memoria.used / (1024 * 1024)  # Memória usada em MB

    return linguagem, versao, cpu, memoria_total, memoria_usada

# Função para escrever o arquivo de saída
def escrever_arquivo(nome_arquivo, numeros_ordenados):
    with open(nome_arquivo, 'w') as f:
        for num in numeros_ordenados:
            f.write(f"{num}\n")

# Testando o programa
def main():
    nome_arquivo = 'arq.txt'
    
    # Coleta de informações do sistema
    linguagem, versao, cpu, memoria_total, memoria_usada = obter_info_sistema()

    # Printando as informações do sistema
    print(f"Linguagem: {linguagem}")
    print(f"Versão: {versao}")
    print(f"Uso da CPU: {cpu}%")
    print(f"Memória total: {memoria_total:.2f} MB")
    print(f"Memória usada: {memoria_usada:.2f} MB")
    
    # Lendo os números do arquivo
    numeros = ler_arquivo(nome_arquivo)
    print(f"Lista original: {numeros}")

    # Medindo o tempo de execução
    start_time = time.time()
    
    # Ordenando os números
    numeros_ordenados = bubble_sort(numeros)
    
    end_time = time.time()
    
    # Calculando tempo de execução e memória usada
    tempo_execucao = (end_time - start_time) * 1000  # Tempo em milissegundos
    ram_usada = psutil.Process(os.getpid()).memory_info().rss / 1024  # RAM em KB

    # Printando o tempo e a RAM utilizada
    print(f"Tempo de execução: {tempo_execucao:.2f} ms")
    print(f"RAM utilizada: {ram_usada:.2f} KB")

    # Escrevendo o arquivo de saída
    escrever_arquivo('arq-saida.txt', numeros_ordenados)
    print("Lista ordenada salva no arquivo 'arq-saida.txt'.")

if __name__ == "__main__":
    main()
