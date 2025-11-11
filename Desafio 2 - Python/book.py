import requests
from bs4 import BeautifulSoup

r = requests.get('https://books.toscrape.com/')
soup = BeautifulSoup(r.text, 'lxml')

titles = soup.find_all('h1')
print(titles)

enlaces = soup.find_all('a')
for enlace in enlaces:
        print(enlace)
