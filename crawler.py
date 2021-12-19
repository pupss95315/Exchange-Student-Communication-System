import pandas as pd
import requests
from bs4 import BeautifulSoup
import re

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
# display(df)

#################
## School list ##
#################
address = 'https://oia.ntu.edu.tw/outgoing/school.list'
school = pd.DataFrame(columns=['semeQuota', 'headQuota'])
response = requests.get(address)
soup = BeautifulSoup(response.text, "html.parser")
## quota
sel = soup.select("td")
for i in range(0, len(sel)):
    # print(i, sel[i].text)
    if (str(sel[i].text)[:5]=='\n申請資料'):
        # print(sel[i-1].text)
        temp = re.findall(r'\d+', sel[i-2].text)
        semeTemp = temp[0] if len(temp) else -1
        temp = re.findall(r'\d+', sel[i-1].text)
        headTemp = temp[0] if len(temp) else -1
        school = school.append({'semeQuota': semeTemp, 'headQuota': headTemp}, ignore_index=True)
# display(school)
sel = soup.select("span")
schools = []
for i in range(0, len(sel)):
    if (str(sel[i].text)[:5]=='since'):
        schools.append(sel[i-1].text[1:-1])
school['school'] = schools
school = school[['school', 'semeQuota', 'headQuota']]
# display(school)