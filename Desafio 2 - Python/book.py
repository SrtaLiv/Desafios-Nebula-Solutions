import requests
from bs4 import BeautifulSoup

r = requests.get('https://books.toscrape.com/')
soup = BeautifulSoup(r.text, 'lxml')

titles = soup.find_all('h1')
print(titles)

enlaces = soup.find_all('a')
for enlace in enlaces:
        print(enlace)

html_content = """
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Books Scraping Results</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        h1 { color: #333; }
        .section { margin: 20px 0; }
        .link { margin: 5px 0; padding: 5px; background: #f0f0f0; }
        a { color: #0066cc; text-decoration: none; }
    </style>
</head>
<body>
    <h1>Resultados del Scraping</h1>
    
    <div class="section">
        <h2>Títulos Encontrados</h2>
"""

for title in titles:
    html_content += f"        <p>{title.get_text()}</p>\n"

html_content += """
    </div>
    
    <div class="section">
        <h2>Enlaces Encontrados</h2>
"""

for enlace in enlaces:
    href = enlace.get('href', '#')
    texto = enlace.get_text().strip() or '[Sin texto]'
    html_content += f'        <div class="link"><a href="{href}">{texto}</a></div>\n'

html_content += """
    </div>
</body>
</html>
"""

with open('enlaces.html', 'w', encoding='utf-8') as f:
      f.write(html_content)

print("Archivo HTML creado con éxito.")