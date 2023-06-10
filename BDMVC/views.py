from django.shortcuts import render
from myapp.models import Data
import random

def index(request):
    # Wygenerujmy przykładowe dane
    data = []
    for _ in range(10):
        data.append(random.randint(1, 100))

    # Zapiszmy dane w bazie danych
    for value in data:
        Data.objects.create(value=value)

    # Pobierzmy wszystkie dane z bazy
    values = Data.objects.values_list('value', flat=True)

    # Przygotujmy dane do wykresu
    chart_data = {
        'labels': list(range(1, len(values) + 1)),
        'data': list(values),
    }

    return render(request, 'index.html', {'chart_data': chart_data})
