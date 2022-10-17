from email import header
import sys
import json
import os
import requests
from bs4 import BeautifulSoup
from pip._vendor.distlib.compat import raw_input

storageFilePath = './storage.json'

# 获取账号密码


def getAccout():
    info = {}
    if not os.path.exists(storageFilePath):
        userName = raw_input('请输入账号：')
        passWord = raw_input('请输入密码：')
        info = {
            'user': userName,
            'pass': passWord
        }
        try:
            with open(storageFilePath, 'w', encoding='utf-8') as f:
                f.write(json.dumps(info, indent=4, ensure_ascii=False))
        except Exception as e:
            print(e)
    else:
        try:
            with open(storageFilePath, 'r+', encoding='utf-8') as f:
                info = json.loads(f.read())
        except Exception as e:
            print(e)
    print('get accout info: ', info)
    return info

# 登陆


def login(payload):
    url = 'http://sign.yldct.com/staff/login'
    r = requests.post(url, payload)
    res = r.json()
    if res['code'] == 0:
        print('---------- 登陆成功', res)
    else:
        print('---------- 登陆失败', res)
    return res

# 存储账号密码


def storage(data):
    try:
        with open(os.path.join('./', 'store.json'), 'w', encoding='utf-8') as f:
            f.write(json.dumps(data, indent=4, ensure_ascii=False))
    except Exception as e:
        print(e)

# 提交


def commit(tokenInfo):
    url = 'http://sign.yldct.com/staff/Sign'
    data = {
        "options": [
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            1,
            0
        ],
        "cc": {},
        "zw": {},
        "remark": "无"
    }
    header = {
        'Cookie': 'PHPSESSID=' + tokenInfo['token']
    }

    r = requests.post(url, headers=header, json=data)
    res = r.json()
    if res['code'] == 0:
        print('----------填报成功', res)
    else:
        print('----------填报失败', res)
    return r.text


# 启动
if __name__ == '__main__':
    userInfo = getAccout()
    tokenInfo = login(userInfo)
    commit(tokenInfo)
