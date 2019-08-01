import argparse
import json
import os
import re
import random, time


import emoji as emoji
import requests
from bs4 import BeautifulSoup

BASIC_PATH = '/Users/mason/Downloads/jsp'
FILE_NAME = '视频搜索：自我认知.txt'

login_session = requests.Session()

def getAvatar(tds, mode):
    _avatar = 'fill'
    if mode == 1:
        # 进入播放分析 获取头像
        entry_url = f'https://dy.feigua.cn/Aweme/GetAwemeDetail'
        print('entry_url: ', entry_url)
        data = {
        'id': tds[5].select('a')[0]['data-id'],
        'awemeid': tds[5].select('a')[0]['data-awemeid']
        }
        print('data: ', data)
        res = login_session.post(entry_url, data=data, timeout=10)
        print('res: ', res)
        bs_res = BeautifulSoup(res.text, 'lxml')
        try:
            _avatar = bs_res.select('.comment-area .js-open-music-pop img')[0]['src']
        except Exception as e:
            print('爬取太过频繁， 请减少爬取操作， 或休息一会再操作')
    if mode == 2:
        # 组装头像页面url
        entry_url = tds[2].find('a')['href'].replace('amp;', '')[1:]
        # 进入播主页面 获取头像
        entry_url = f'https://dy.feigua.cn/{entry_url}'
        print('entry_url: ', entry_url)
        res = login_session.get(entry_url, timeout=10)
        print('res: ', res)
        bs_res = BeautifulSoup(res.text, 'lxml')
        try:
            _avatar = bs_res.select('.avatar img')[0]['src']
        except Exception as e:
            print('爬取太过频繁， 请减少爬取操作， 或休息一会再操作')
            raise
    return _avatar

def login():
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36 OPR/62.0.3331.99',
        'Referer': 'https://dy.feigua.cn/',
        'Host': 'dy.feigua.cn',
        'Content-Type': 'application/json;charset=utf-8'
    }
    data = {
        "tel": '18202877162',
        "pwd": 'a490311780'
    }
    url = 'https://dy.feigua.cn/Login/Login'
    aa = login_session.post(url, data=data)
    print('login: ', aa.text)

def real_download(data, index):
    print(f'下载{data}')

    clear_zb = emoji.demojize(data.get('_飞瓜数据').get('_播主'))
    # clear_bt = emoji.demojize(data.get('_飞瓜数据').get('_标题'))

    clear_bt = data.get('_飞瓜数据').get('_热词')
    clear_bt = '-'.join(clear_bt)

    clear_zb = re.sub("[A-Za-z0-9\!\%\[\]\,\。]", "", clear_zb)
    clear_bt = re.sub("[A-Za-z0-9\!\%\[\]\,\。]", "", clear_bt)

    bp = os.path.join(BASIC_PATH, FILE_NAME.replace('.txt', ''), f'{index}-' + clear_bt)

    if os.path.exists(bp) is False:
        os.makedirs(bp)

    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36 OPR/62.0.3331.99'
    }

    try:
        r = requests.get(data.get('_飞瓜数据').get('_封面地址_飞瓜'))
        with open(os.path.join(bp, '封面1.jpg'), 'wb') as f:
            f.write(r.content)

        r = requests.get(data.get('_抖音数据').get('_封面'))
        with open(os.path.join(bp, '封面2.jpg'), 'wb') as f:
            f.write(r.content)

        r = requests.get(data.get('_抖音数据').get('_mp4'), headers=headers)
        with open(os.path.join(bp, '抖音.mp4'), 'wb') as f:
            f.write(r.content)

        r = requests.get(data.get('_抖音数据').get('_mp3'))
        with open(os.path.join(bp, '抖音.mp3'), 'wb') as f:
            f.write(r.content)

        r = requests.get(data.get('_飞瓜数据').get('_头像'))
        with open(os.path.join(bp, '头像.jpg'), 'wb') as f:
            f.write(r.content)

        with open(os.path.join(bp, '数据.json'), 'w', encoding='utf-8') as f:
            f.write(json.dumps(data, indent=4, ensure_ascii=False))
    except Exception as e:
        print(e)

    return None


def parse_text(text):
    print(f'获取抖音连接{text}')

    soup = BeautifulSoup(text, 'html.parser')

    _封面 = soup.find('img', attrs={'class': 'img-thumbnail'})
    _封面 = _封面.get('src')

    mp4_e = soup.find('a', attrs={'download': '720.mp4'})
    _mp4 = mp4_e.get('href')
    mp3_e = soup.find('a', attrs={'download': 'bj.MP3'})
    _mp3 = mp3_e.get('href')

    ps = soup.findAll('p')

    _作者ID = ps[1].find('span').text
    # 过滤关键词
    _描述 = re.sub('[@#]抖音小助手', '', ps[2].find('span').text)
    _评论量 = ps[3].find('span').text
    _点赞量 = ps[4].find('span').text
    _分享量 = ps[5].find('span').text

    data = {
        '_封面': _封面,
        '_mp4': _mp4,
        '_mp3': _mp3,
        '_作者ID': _作者ID,
        '_描述': _描述,
        '_评论量': _评论量,
        '_点赞量': _点赞量,
        '_分享量': _分享量
    }
    return data


# 解析视频地址
def parse_mp4_url(url):
    payload = {
        'link': url
    }
    url= 'http://dnqia.cn/ajax/analyze.php'
    r = 'fill'
    try:
        r = requests.post(url, payload, timeout=10)
    except Exception as e:
        print(e)
        return None

    res = json.loads(r.text)
    print('res: ', res)
    if res and res['retCode'] == 200:
        return res['data']['video']
    else:
        return None


def parse_uri(url):
    payload = {
        'url': url
    }

    url = 'https://api.douyin.qlike.cn/parse.php?app=douyin'
    try:
        r = requests.post(url, payload, timeout=10)
    except Exception as e:
        print(e)
        return None
    return r.text


def parse_data(data):
    # print(f'解析数据{data}')

    soup = BeautifulSoup(data, 'html.parser')
    trs = soup.find_all('tr', attrs={'class': 'js-slider-aweme'})

    datas = []
    for tr in trs:
        tds = tr.find_all('td')
        _热度 = tds[0].text.strip()

        _封面地址_飞瓜 = tds[1].find('img').get('src')

        _标题 = tds[1].find_all('a')[1].text.strip()

        _热词arr = tds[1].find_all('a', attrs={'class': 'js-hotKeyWord'})
        _热词 = []
        for tmp in _热词arr:
            _热词.append(tmp.text)

        _时长 = tds[1].find('div', attrs={'class': 'item-times'})
        _时长 = _时长.text.strip().split('\n')[0].replace('视频时长：', '').replace('秒', '')

        _播主 = tds[2].find('a').text
        _日期 = tds[2].find('div', attrs={'class': 'item-sub-title'}).text

        _点赞数 = tds[3].text
        _评论数 = tds[4].text

        _抖音地址 = tds[5].find('a', attrs={'class': 'source-play'}).get('href')

        time.sleep(1)
        # 获取头像
        _头像 = getAvatar(tds, 1)
        if _头像 == 'fill':
            _头像 = getAvatar(tds, 2)
        print('头像: ', _头像)


        data = {
            '_热度': _热度,
            '_封面地址_飞瓜': _封面地址_飞瓜,
            '_标题': _标题,
            '_热词': _热词,
            '_时长': _时长,
            '_播主': _播主,
            '_日期': _日期,
            '_点赞数': _点赞数,
            '_评论数': _评论数,
            '_抖音地址': _抖音地址,
            '_头像': _头像
        }

        datas.append(data)

    return datas


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('-o', '--outdir', help='保存目录')
    parser.add_argument('-f', '--filename', help='数据文件')

    args = parser.parse_args()

    if args.outdir is None or args.filename is None:
        print('缺少参数')
        exit(0)

    # 登陆 获取session
    login()

    BASIC_PATH = args.outdir
    FILE_NAME = args.filename

    print(f'保存目录{BASIC_PATH}, 数据文件{FILE_NAME}')

    with open(FILE_NAME, 'r', encoding='utf-8') as _f:
        f = _f.read()

    fg_datas = parse_data(f)

    download_datas = []
    for data in fg_datas:
        _抖音地址 = data.get('_抖音地址')
        r = parse_uri(_抖音地址)
        if r is None:
            continue
        dy_data = parse_text(r)

        # 重新 抓取新的去水印的视频地址
        _mp4_url = parse_mp4_url(data['_抖音地址'])
        if _mp4_url is None:
            continue
        dy_data['_mp4'] = _mp4_url
        print('dy_data: ', dy_data)

        tmp = {
            '_飞瓜数据': data,
            '_抖音数据': dy_data
        }
        download_datas.append(tmp)

    index = 1
    for item in download_datas:
        time.sleep(1)
        real_download(item, index)
        index += 1
