import matplotlib.pyplot as plt
import numpy as np

# Dados
labels = ['Python', 'JavaScript']
# Bubble Sort
bubble_sort_tempo_media = [21754.63, 1137.62]
bubble_sort_tempo_mediana = [21764.50, 1135.00]
bubble_sort_memoria_media = [15920.80, 6403.91]
bubble_sort_memoria_mediana = [15952.00, 6412.31]
# Quick Sort
quick_sort_tempo_media = [35.50, 18.80]  # Dados de exemplo para o Quick Sort
quick_sort_tempo_mediana = [35.30, 18.50]  # Dados de exemplo para o Quick Sort
quick_sort_memoria_media = [14500.50, 8200.75]  # Dados de exemplo para o Quick Sort
quick_sort_memoria_mediana = [15000.00, 8180.00]  # Dados de exemplo para o Quick Sort

# Função para plotar gráficos em pizza
def plot_pizza_chart(title, data, labels, colors):
    fig, ax = plt.subplots()
    ax.pie(data, labels=labels, autopct='%1.1f%%', startangle=90, colors=colors, wedgeprops={'edgecolor': 'black'})
    ax.set_title(title)
    plt.tight_layout()
    plt.show()

# Plotando os gráficos em pizza
# Comparando o tempo médio de Bubble Sort vs Quick Sort
plot_pizza_chart(
    "Média do Tempo (ms) - Bubble Sort vs Quick Sort",
    [np.mean(bubble_sort_tempo_media), np.mean(quick_sort_tempo_media)],
    ['Bubble Sort', 'Quick Sort'],
    ['#ff9999','#66b3ff']
)

# Comparando a mediana do Tempo de Bubble Sort vs Quick Sort
plot_pizza_chart(
    "Mediana do Tempo (ms) - Bubble Sort vs Quick Sort",
    [np.median(bubble_sort_tempo_mediana), np.median(quick_sort_tempo_mediana)],
    ['Bubble Sort', 'Quick Sort'],
    ['#ff6666','#6699ff']
)

# Comparando a memória média de Bubble Sort vs Quick Sort
plot_pizza_chart(
    "Média da Memória (KB) - Bubble Sort vs Quick Sort",
    [np.mean(bubble_sort_memoria_media), np.mean(quick_sort_memoria_media)],
    ['Bubble Sort', 'Quick Sort'],
    ['#99ff99','#ffcc99']
)

# Comparando a mediana da Memória de Bubble Sort vs Quick Sort
plot_pizza_chart(
    "Mediana da Memória (KB) - Bubble Sort vs Quick Sort",
    [np.median(bubble_sort_memoria_mediana), np.median(quick_sort_memoria_mediana)],
    ['Bubble Sort', 'Quick Sort'],
    ['#66ff66','#ff9966']
)
