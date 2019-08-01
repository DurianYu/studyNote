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


# 获取账户id
def getAccount(user_login):
    # 查询标签
    cursor.execute(""" SELECT user_login, id FROM `cmf_users` WHERE user_login = '{}' """.format(user_login))
    result = dict(cursor.fetchall())
    if result:
        return result[user_login]
    else:
        return False



# 获取打开文件用的 编码格式
def getEncode(json_file):
    with open(json_file, 'r+', encoding='utf-8', errors='ignore') as f:
        json_data = json.loads(f.read())
        # 读取信息
        if json_data.get('_抖音数据'):
            return 'utf-8'
        else:
            return 'gbk'

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
    conn = MySQLdb.connect(host="121.40.52.138", port=23306, db="zhibo", passwd="Ff3*h7E5e8Tr", user="zhibo", charset='utf8' )
    # 游标 - 操作数据库
    cursor = conn.cursor()

    # 循环目录
    # 列出博主名字的文件夹
    for v1 in os.listdir(BASIC_PATH):
        # 进入博主文件夹
        count = True
        id = ''
        for v2 in os.listdir(os.path.join(BASIC_PATH, v1)):
            # 打开视频文件夹下的.JSON文件
            json_file = os.path.join(BASIC_PATH, v1, v2, '数据.json')
            if not os.path.exists(json_file) or not os.path.getsize(json_file):
                print('没有.json文件， 跳过')
                continue
            # 识别编码方式
            encode_type = getEncode(json_file)
            with open(json_file, 'r+', encoding=encode_type, errors='ignore') as f:
                json_data = json.loads(f.read())
                if (count):
                    print('信息文件: ', v1 + v2)
                    # print('json', json_data)
                    # 读取信息
                    user_login = json_data['_播主信息']['_抖音号']
                    user_pass = '###ea1e6729b1bcd5575033baf0e8cd127b'
                    user_nicename = json_data['_播主信息']['_用户名']
                    avatar = 'default'
                    sex = '1'
                    signature = ''
                    user_status = '1'
                    create_time = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())
                    user_type = '2'
                    avatar_thumb = 'default'

                    # 查询数据库，是否存在账号
                    is_login_id = getAccount(user_login)
                    print('is_login_id: ', is_login_id)

                    try:
                        if is_login_id:
                            id = is_login_id
                        else:
                            # 插入数据库
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
                        print('new json_data', id)
                        # 移动指针 到开始处
                        f.seek(0)
                        # 清空文件 - 指针必须指向开始处
                        f.truncate()
                        f.write(json.dumps(json_data, indent = 4, ensure_ascii = False))
                        count = False
                    except:
                        # Rollback in case there is any error
                        conn.rollback()
                else:
                    # 每个文件夹下的.json更新
                    json_data.setdefault('_数据库信息', {})
                    json_data['_数据库信息']['_id'] = f'{id}'
                    print('填充剩余数据')
                    # 移动指针 到开始处
                    f.seek(0)
                    # 清空文件 - 指针必须指向开始处
                    f.truncate()
                    f.write(json.dumps(json_data, indent = 4, ensure_ascii = False))
    conn.close()
    print('结束')
