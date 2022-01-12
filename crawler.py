import pandas as pd
import requests
from bs4 import BeautifulSoup
import re
import pymongo
import os
from pathlib import Path

#########################
## StudentId and score ##
#########################
address = 'https://oiasystem.ntu.edu.tw/OutgoingExchange/html/asp/111/score/'
teams = ['1-8cf17766bc8ee769011f8b6ebffdb203.html', '2-81778d1d1ca4227735947279807825e1.html', '4-60b478caf1dca807564a1b382cb82464.html', '3-4f27d45899fd4eb29285ef9a53f89d9c.html', '7-f32fc07745b8409d840646c9636911cd.html'\
      '8-1e40221f7a19a9165a03706cec238196.html', '6-15a0fb4aabe2820e3f5fab42dba93885.html']
group = ['GENERAL', 'JAPANESE', 'GERMAN', 'FRENCH', 'KOREAN', 'SPANISH', 'CHINESE']
title = ['E', 'J', 'G', 'F', 'K', 'S', 'C']
users = []

for i, t in enumerate(teams):
  response = requests.get(address+t)
  soup = BeautifulSoup(response.text, "html.parser")
  sel = soup.select("td")
  users.append({'user_id':title[i]+"000" , 'GPA': float(0.0), 'group': group[i], 'apply_list': ['','','']})
  for j in range(0, len(sel)):
    if (len(sel[j].text)==4):
        users.append({'user_id': sel[j].text, 'GPA': float(sel[j+1].text), 'group': group[i], 'apply_list': ['','','']})

#################
## School list ##
#################
g_dict = {
    "一般組" : ["加拿大", "巴西", "美國", "香港", "澳門", "以色列", "馬來西亞","蒙古", "新加坡", "泰國", \
               "俄羅斯", "土耳其", "捷克", "丹麥", "芬蘭", "匈牙利", "冰島", "義大利", "拉脫維亞", "立陶宛", "荷蘭" \
               "挪威", "波蘭", "葡萄牙", "斯洛維尼亞", "瑞典", "英國", "澳大利亞", "紐西蘭", "南非"],
    "日語組" : ["日本"],
    "德語組" : ["德國", "奧地利", "瑞士", "盧森堡"],
    "法語組" : ["加拿大", "比利時", "盧森堡"],
    "韓語組" : ["南韓"],
    "西語組" : ["西班牙", "智利", "墨西哥"],
    "中語組" : ["大陸地區"]
}

general = ["愛德華王子島大學", "女王大學", "滑鐵盧大學", "西門菲沙大學", "渥太華大學", "多倫多大學", "維多利亞大學", "加拿大英屬哥倫比亞大學（卑詩大學）", "蒙特雷科技大學", "托馬斯莫爾應用科技大學", "國際教養大學"]
french = ["洛桑大學"]
japan = ["岡山大學", "關西大學", "御茶水女子大學", "明治大學", "創價大學"]


address = 'https://oia.ntu.edu.tw/outgoing/school.list'
school = pd.DataFrame(columns=['semeQuota', 'headQuota'])
response = requests.get(address)
soup = BeautifulSoup(response.text, "html.parser")

# crawler for quota
sel = soup.select("td")
for i in range(0, len(sel)):  
    if(sel[i].text[0] != "\n"):
        country = sel[i].text
        if country in g_dict["一般組"] :
            group = "GENERAL"
        elif country in g_dict["日語組"] :
            group = "JAPANESE"
        elif country in g_dict["德語組"] :
            group = "GERMAN"
        elif country in g_dict["法語組"] :
            group = "FRENCH"
        elif country in g_dict["韓語組"] :
            group = "KOREAN"
        elif country in g_dict["西語組"] :
            group = "SPANISH"
        elif country in g_dict["中語組"] :
            group = "CHINESE"
    if(str(sel[i].text)[:5]=='\n申請資料'):
        temp = re.findall(r'\d+', sel[i-2].text)
        semeTemp = temp[0] if len(temp) else -1
        temp = re.findall(r'\d+', sel[i-1].text)
        headTemp = temp[0] if len(temp) else -1
        school = school.append({'semeQuota': semeTemp, 'headQuota': headTemp, 'group' : group}, ignore_index=True)

# crawler for school
sel = soup.select("span")
schools = []
for i in range(0, len(sel)):
    if (str(sel[i].text)[:5]=='since'):
        schools.append(sel[i-1].text[1:-1])
school['school'] = schools
school = school[['school', 'semeQuota', 'headQuota', 'group']]
new_school = school
for i in range(len(list(school['school']))) :
    if school['school'][i] in general :
        school.at[i,'group'] = "GENERAL"
    elif sel[i-1].text[1:-1] == "洛桑大學" :
        school.at[i,'group'] = "FRENCH"
    elif school['group'][i] == "JAPANESE" and school['school'][i] not in japan and school['school'][i] != "國際教養大學":
        new_school = new_school.append({'school':school['school'][i], 'semeQuota': school['semeQuota'][i], 'headQuota': school['headQuota'][i], 'group' : "CHINESE"}, ignore_index=True)

s_dict = []
for i in range(len(list(new_school["school"]))) :
    s_dict.append({"school_name" : list(new_school["school"])[i], "seme_quota" : list(new_school["semeQuota"])[i], "head_quota" : list(new_school["headQuota"])[i], 'group' : list(new_school["group"])[i]})

##############################
## Write data into Database ##
##############################

# connect to mongo
MONGO_URI = ''
client = pymongo.MongoClient(MONGO_URI)
db = client['']

# insert data
db.users.insert_many(users)
db.schools.insert_many(s_dict)

