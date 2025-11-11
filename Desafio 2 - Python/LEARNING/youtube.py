import requests
from bs4 import BeautifulSoup

resp = requests.get('https://www.youtube.com/')

print(resp.status_code)
# print(resp.headers, resp.text[:100])  # Print first 100 characters of the response body

# search_data = {
#     'search_query': 'programacion'
#     }

# resp = requests.post('https://www.youtube.com/results', data=search_data)
# print(resp.status_code)
# print(resp.headers, resp.text[:100])  # Print first 100 characters of the response

# # print('--- USANDO BEAUTIFULSOUP ---')

# # Filtro this week, por views, type: video
# # https://www.youtube.com/results?search_query=%23programming&sp=CAMSAggD

# r = requests.get('https://www.youtube.com/results?search_query=programacion')
# soup = BeautifulSoup(r.text, 'lxml')


# # full xpath del titulo de youtube
# # Quiero buscar la etiqueta yt-formatted-string con clase style-scope ytd-video-renderer

# xpath = '/html/body/ytd-app/div[1]/ytd-page-manager/ytd-search/div[1]/ytd-two-column-search-results-renderer/div/ytd-section-list-renderer/div[2]/ytd-item-section-renderer[1]/div[3]/ytd-video-renderer/div[1]/div/div[1]/div/h3/a/yt-formatted-string'

# title = soup.find('yt-formatted-string', class_='style-scope ytd-video-renderer')
# print(soup.title)

