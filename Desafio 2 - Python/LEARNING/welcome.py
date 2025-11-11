from bs4 import BeautifulSoup

contenido = """
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Página de prueba</title>
</head>
<body>
<div id="main" class="full-width">
    <h1>El título de la página</h1>
    <p>Este es el primer párrafo</p>
    ...
</div>
</body>
</html>
"""

soup = BeautifulSoup(contenido, 'lxml')
print(soup.prettify())
print(soup.title)