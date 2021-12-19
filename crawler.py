import pandas as pd
import requests
from bs4 import BeautifulSoup

#########################
## StudentId and score ##
#########################
address = 'https://oiasystem.ntu.edu.tw/OutgoingExchange/html/asp/110/score/'
teams = ['1-a3cd23f6a0bb513bf6aa8582dbfa2b01.html', '2-8b77c48f201fbb4027b6c326baa11c29.html']
df = pd.DataFrame(columns=['student', 'score'])
for t in teams:
    response = requests.get(address+t)
    soup = BeautifulSoup(response.text, "html.parser")
    sel = soup.select("td")
    for i in range(0, len(sel)):
        if (len(sel[i].text)==4):
            df = df.append({'student': sel[i].text, 'score': sel[i+1].text}, ignore_index=True)
display(df)

#################
## School list ##
#################
address = 'https://oia.ntu.edu.tw/outgoing/school.list'
school = pd.DataFrame(columns=['school', 'semeCnt', 'headCnt'])
response = requests.get(address)
soup = BeautifulSoup(response.text, "html.parser")
sel = soup.select("span")
for i in range(0, len(sel)):
    if (str(sel[i].text)[:5]=='since'):
        school = school.append({'school': sel[i-1].text[1:-1]}, ignore_index=True)
display(school)