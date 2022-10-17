import sys
import json
import os
import requests

#coding=UTF-8
loginSession = requests.Session()


# 签到
def shake():
    r = loginSession.post('https://w1.v2free.net/user/checkin')
    res = r.json()
    print('shakeInfo: ', res)

# 登陆
def login():
    url = 'https://w1.v2free.net/auth/login'
    r = loginSession.post(url, {
        "email": "524107965@qq.com",
        "passwd": "ytx337910",
        "code":  ""})
    res = r.json()
    if res['ret'] == 1:
        print('---------- 登陆成功', res)
        shake();
    else:
        print('---------- 登陆失败', res)
    return res


# 启动
if __name__ == '__main__':
    login()
