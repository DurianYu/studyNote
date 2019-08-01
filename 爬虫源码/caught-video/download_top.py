import argparse
import json
import os
import re, time

import emoji as emoji
import requests
from bs4 import BeautifulSoup

BASIC_PATH = '/Users/mason/Downloads/jsp'
FILE_NAME = '视频搜索：自我认知.txt'

def real_download(data, index):
    print(f'下载{data}')

    # clear_zb = emoji.demojize(data.get('_飞瓜数据').get('_播主'))
    # clear_bt = emoji.demojize(data.get('_飞瓜数据').get('_标题'))

    clear_zb = data.get('_播主信息').get('_抖音号')
    clear_bt = data.get('_飞瓜数据').get('_热词')
    clear_bt = '-'.join(clear_bt)

    clear_zb = re.sub("[A-Za-z0-9\!\%\[\]\,\。]", "", clear_zb)
    clear_bt = re.sub("[A-Za-z0-9\!\%\[\]\,\。]", "", clear_bt)

    bp = os.path.join(BASIC_PATH, FILE_NAME.replace('.txt', ''), clear_zb, f'{index}-' + clear_bt)
    print('bp', bp)
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

        r = requests.get(data.get('_播主信息').get('_头像'))
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

def get_user_info(data):
    # print(f'解析数据{data}')

    soup = BeautifulSoup(data, 'html.parser')
    owner_info = soup.select('.owner-info .info')[0];
    u_name = owner_info.select('.nickname')[0].text.strip().replace('\n', ',').split(',')[0]


    print('u_name', u_name)
    # print('test', soup.select('.owner-data .row')[2].select('div')[0].span.text.strip())

    # 采集一次
    _用户名 = u_name
    _头像 = soup.select('.owner-info .avatar img')[0]['src']
    _抖音号 = owner_info.select('ul li span')[0].text.strip()
    _地区 = owner_info.select('ul li span')[1].text.strip()
    _粉丝数 = soup.select('.owner-data .fans > span')[0].text.strip()
    _作品数 = soup.select('.owner-data .videos-count > span')[0].text.strip()
    _飞瓜指数 = soup.select('.owner-data .xiagua-index > span')[0].text.strip()
    _总点赞量 = soup.select('.owner-data .row')[2].select('div')[0].span.text.strip()
    _平均点赞量 = soup.select('.owner-data .row')[2].select('div')[1].span.text.strip()
    _总评论 = soup.select('.owner-data .row')[3].select('div')[0].span.text.strip()


    datas = {
        '_用户名': _用户名,
        '_头像': _头像,
        '_抖音号': _抖音号,
        '_地区': _地区,
        '_粉丝数': _粉丝数,
        '_作品数': _作品数,
        '_飞瓜指数': _飞瓜指数,
        '_总点赞量': _总点赞量,
        '_平均点赞量': _平均点赞量,
        '_总评论': _总评论,
    }
    return datas


def parse_data(data):
    # print(f'解析数据{data}')

    soup = BeautifulSoup(data, 'html.parser')

    owner_info = soup.select('.owner-info .info')[0];
    u_name = owner_info.select('.nickname')[0].text.strip().replace('\n', ',').split(',')[0]

    trs = soup.select('#js-blogger-history-awemes tr');

    datas = []
    for tr in trs:
        tds = tr.find_all('td')
        print('asd', tds[2].select('a')[2].get('href'))

        _标题 = tds[0].select('.item-title a')[0].text.strip()
        if not len(tds[0].select('.item-tag ul')):
            _热词 = ''
        else:
            _热词 = tds[0].select('.item-tag ul')[0].text.strip().replace('\n', ',').split(',')
        _发布时间 = tds[0].select('.item-times')[0].text.strip().split('：')[1]
        _封面地址_飞瓜 = tds[0].select('img')[0].get('src')

        _点赞 = tds[1].text.strip().split(' ')[0]
        _评论数 = tds[1].text.strip().split(' ')[1]
        _转发数 = tds[1].text.strip().split(' ')[2]

        _抖音地址 = tds[2].select('a')[2].get('href')


        data = {
            '_播主': u_name,
            '_标题': _标题,
            '_热词': _热词,
            '_发布时间': _发布时间,
            '_封面地址_飞瓜': _封面地址_飞瓜,
            '_点赞': _点赞,
            '_评论数': _评论数,
            '_转发数': _转发数,
            '_抖音地址': _抖音地址,
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

    BASIC_PATH = args.outdir
    FILE_NAME = args.filename

    print(f'保存目录{BASIC_PATH}, 数据文件{FILE_NAME}')

    with open(FILE_NAME, 'r', encoding='utf-8') as _f:
        f = _f.read()

    user_info = get_user_info(f)
    fg_datas = parse_data(f)

    download_datas = []
    for data in fg_datas:
        # 进入详情页面
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
            '_抖音数据': dy_data,
            '_播主信息': user_info
        }
        download_datas.append(tmp)

    index = 1
    for item in download_datas:
        time.sleep(1)
        real_download(item, index)
        index += 1
