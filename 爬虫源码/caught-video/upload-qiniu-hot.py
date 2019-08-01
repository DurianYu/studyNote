# -*- coding: utf-8 -*-
# flake8: noqa
import argparse
import json
import os
import re
import time
import sys
import uuid


import emoji as emoji
import requests
from bs4 import BeautifulSoup
from qiniu import Auth, put_file, etag
import qiniu.config

# 先上传视频、图片等到七牛 - 写入新地址到 .json文件

BASIC_PATH = '/Users/mason/Downloads/jsp'

#需要填写你的 Access Key 和 Secret Key
access_key = 'XJADNjrL0yZXtEB2eAj37zwk0of3oBJ8D3Iu0Vkg'
secret_key = 'PwSekd_1RxHa_0apOOQ0XKaJm3GYfmJKUB2WAPf8'
#构建鉴权对象
q = Auth(access_key, secret_key)
#要上传的空间
bucket_name = 'zhibo'
domain = 'http://zhibo-qiniu-tmp.youninyouqu.com'

def getEncode(json_file):
    with open(json_file, 'r+', encoding='utf-8', errors='ignore') as f:
        json_data = json.loads(f.read())
        # 读取信息
        if json_data.get('_抖音数据'):
            return 'utf-8'
        else:
            return 'gbk'

# 组装文件信息
def getFileInfo(file_path):
    return [{'name': '_封面1_url', 'suffix': 'jpg', 'file': os.path.join(file_path, '封面1.jpg')},
    {'name': '_封面2_url', 'suffix': 'jpg', 'file': os.path.join(file_path, '封面2.jpg')},
    {'name': '_抖音mp3_url', 'suffix': 'mp3', 'file': os.path.join(file_path, '抖音.mp3')},
    {'name': '_抖音mp4_url', 'suffix': 'mp4', 'file': os.path.join(file_path, '抖音.mp4')},
    {'name': '_头像_url', 'suffix': 'jpg', 'file': os.path.join(file_path, '头像.jpg')}]

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('-i', '--inputdir', help='播主文件夹的 父级文件夹')
    args = parser.parse_args()

    if args.inputdir is None:
        print('缺少参数')
        exit(0)

    BASIC_PATH = args.inputdir

    print(f'保存目录{BASIC_PATH}')

    # 循环目录
    # 列出博主名字的文件夹
    for v1 in os.listdir(BASIC_PATH):
        # 进入博主文件夹
        for v2 in os.listdir(os.path.join(BASIC_PATH, v1)):
            print(v1, v2)
            json_file = os.path.join(BASIC_PATH, v1, v2, '数据.json')
            if not os.path.exists(json_file) or not os.path.getsize(json_file):
                print('没有.json文件， 跳过')
                continue
            _files = getFileInfo(os.path.join(BASIC_PATH, v1, v2))
            encode_type = getEncode(json_file)

            # 先打开.json文件
            with open(os.path.join(BASIC_PATH, v1, v2, '数据.json'), 'r+', encoding=encode_type, errors='ignore') as f:
                json_data = json.loads(f.read())
                if not json_data.get('_数据库信息'):
                    print('用户id重复, 跳过')
                    continue
                if json_data['_数据库信息'].get('_抖音mp4_url'):
                    print('已有数据，跳过')
                    continue
                for _file in _files:
                    # 随机生成 文件名
                    file_name = f'{uuid.uuid1()}'.split('-')[0]
                    _date = time.strftime("%Y%m%d", time.localtime())
                    # key = 'my-python-logo.png'
                    key = "{}/{}.{}".format(_date, file_name, _file['suffix'])
                    print('key: ', key)
                    #生成上传 Token，可以指定过期时间等
                    token = q.upload_token(bucket_name, key, 3600)
                    #要上传文件的本地路径
                    localfile = _file['file']
                    ret, info = put_file(token, key, localfile)
                    print('info', info)
                    assert ret['key'] == key
                    assert ret['hash'] == etag(localfile)
                    json_data['_数据库信息'][_file['name']] = f'{domain}/{key}'

                    # 写入信息到.json文件
                    print('new json_data: ', key)
                    f.seek(0)
                    f.truncate()
                    f.write(json.dumps(json_data, indent = 4, ensure_ascii = False))
