import argparse
import json
import os
import re
import time
import sys


import emoji as emoji
import requests
from bs4 import BeautifulSoup
import MySQLdb

# 制造 马甲
BASIC_PATH = '/Users/mason/Downloads/jsp'

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('-i', '--inputdir', help='播主文件夹的 父级文件夹')
    args = parser.parse_args()

    if args.inputdir is None:
        print('缺少参数')
        exit(0)

    BASIC_PATH = args.inputdir
    # FILE_NAME = args.filename

    print(f'文件目录{BASIC_PATH}')

    # 连接数据库
    conn = MySQLdb.connect("121.40.52.138", "yb_zhibo_dev", "ptwtTkfdWMU0ixIb", "yb_zhibo_dev", charset='utf8' )
    # 游标 - 操作数据库
    cursor = conn.cursor()

    # 循环目录
    # 列出博主名字的文件夹
    for v1 in os.listdir(BASIC_PATH):
        # 进入博主文件夹
        count = 1
        id = ''
        for v2 in os.listdir(os.path.join(BASIC_PATH, v1)):
            # 打开视频文件夹下的.JSON文件
            json_file = os.path.join(BASIC_PATH, v1, v2, '数据.json')
            with open(json_file, 'r+', encoding='utf-8', errors='ignore') as f:
                json_data = json.loads(f.read())
                if (count == 1):
                    # 读取信息
                    user_login = json_data['_播主信息']['_抖音号']
                    user_pass = '###ea1e6729b1bcd5575033baf0e8cd127b'
                    user_nicename = json_data['_播主信息']['_用户名']
                    avatar = json_data['_播主信息']['_头像']
                    sex = '1'
                    signature = ''
                    user_status = '1'
                    create_time = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())
                    user_type = '2'
                    avatar_thumb = json_data['_播主信息']['_头像']
                    # 存储数据库
                    try:
                        # 执行sql语句
                        cursor.execute("""INSERT INTO `cmf_users`
                        (`user_login`, `user_pass`, `user_nicename`, `avatar`, `sex`, `signature`, `user_status`, `create_time`, `user_type`, `avatar_thumb`)
                        VALUES
                        ('{}','{}','{}','{}','{}','{}','{}','{}','{}','{}')""".format(user_login, user_pass, user_nicename, avatar, sex, signature, user_status, create_time, user_type, avatar_thumb))
                        # 提交到数据库执行
                        # 此方法要在commit之前使用， 否则值为 0
                        # id = conn.insert_id()
                        conn.commit()
                        print('提交成功')
                        # 获取主键
                        # 此方法要在commit之后使用， 否则值为 空
                        id = cursor.lastrowid
                        print('last_id: ', id)
                        json_data.setdefault('_数据库信息', {})
                        json_data['_数据库信息']['_id'] = f'{id}'
                        print('new json_data', json_data)
                        # 移动指针 到开始处
                        f.seek(0)
                        # 清空文件 - 指针必须指向开始处
                        f.truncate()
                        f.write(json.dumps(json_data, indent = 4, ensure_ascii = False))
                    except:
                        # Rollback in case there is any error
                        conn.rollback()
                else:
                    # 每个文件夹下的.json更新
                    json_data.setdefault('_数据库信息', {})
                    json_data['_数据库信息']['_id'] = f'{id}'
                    print('new json_data', json_data)
                    # 移动指针 到开始处
                    f.seek(0)
                    # 清空文件 - 指针必须指向开始处
                    f.truncate()
                    f.write(json.dumps(json_data, indent = 4, ensure_ascii = False))
                count += 1
    conn.close()
    print('结束')
