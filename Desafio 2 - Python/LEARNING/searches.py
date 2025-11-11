import requests
from bs4 import BeautifulSoup

r = requests.get('https://books.toscrape.com/')
soup = BeautifulSoup(r.text, 'lxml')

# ---------------------------------------------------------------------------- #

###
### BUSCAR TODO
###
titles = soup.find_all('h1')
print(titles)

enlaces = soup.find_all('a')
for enlace in enlaces:
        print(enlace)

###
### BUSCANDO POR ETIQUETAS ESPECÍFICAS
###
categories = soup.select('li a')
print(soup.ul.li.a)
print(categories)

###
### BUSCANDO POR ATRIBUTOS (id)
###
footer = soup.find_all(id='footer')
print(footer)

###
### BUSCAR POR 1 CLASE CSS
###
links_divs = soup.find_all('div', class_="links")
print(links_divs)

###
### BUSCAR POR MAS DE 1 CLASE CSS
###
footer_links = soup.select('div.footer-links.links')
print(footer_links)


#############################
## Limitando las búsquedas ##
#############################
## Limit: n resultados
## recursive: buscar en hijos directos o todos los descendientes