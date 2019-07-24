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

# 上传视频相关信息至服务器 (即：模拟后台添加视频功能)
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
    # 查询标签
    cursor.execute(""" SELECT s_class, s_id FROM `cmf_video_class` """)
    # 视频标签
    # 查询出来的是元组格式，直接转成 字典格式
    tags = dict(cursor.fetchall())
    # 获取即将上传的视频标签
    local_tag = BASIC_PATH.split('\\')[-1]

    # 循环目录
    # 列出博主名字的文件夹
    for v1 in os.listdir(BASIC_PATH):
        # 进入博主文件夹
        for v2 in os.listdir(os.path.join(BASIC_PATH, v1)):
            # 打开视频文件夹下的.JSON文件
            json_file = os.path.join(BASIC_PATH, v1, v2, '数据.json')
            with open(json_file, 'r+', encoding='utf-8', errors='ignore') as f:
                json_data = json.loads(f.read())
                if json_data['_数据库信息'].get('_cmf_users_video_id'):
                    print('已有数据，跳过')
                    continue
                # 读取信息
                status = '1'
                isdel = '0'
                title = json_data['_抖音数据']['_描述']
                thumb = json_data['_数据库信息']['_封面1_url']
                href = json_data['_数据库信息']['_抖音mp4_url']
                # 时间戳
                addtime = int(time.time())
                uid = json_data['_数据库信息']['_id']
                thumb_s = json_data['_数据库信息']['_封面2_url']
                show_val = None
                tag_id = tags.get('云计算')
                # 存储数据库
                try:
                    # 执行sql语句
                    cursor.execute("""INSERT INTO `cmf_users_video`
                    (`status`, `isdel`, `title`, `thumb`, `href`, `addtime`, `uid`, `thumb_s`, `show_val`)
                    VALUES
                    ('{}','{}','{}','{}','{}','{}','{}','{}','{}')""".format(status, isdel, title, thumb, href, addtime, uid, thumb_s, show_val))
                    cursor.execute("""INSERT INTO `cmf_video_class_details`
                    (`sd_id`, `video_id`)
                    VALUES('{}','{}',)""".format(uid, tag_id))
                    # 此方法要在commit之前使用， 否则值为 0
                    # id = conn.insert_id()
                    # 提交到数据库执行
                    conn.commit()
                    print('提交成功')
                    # 获取主键
                    # 此方法要在commit之后使用， 否则值为 空
                    id = cursor.lastrowid
                    print('last_id: ', id)
                    json_data['_数据库信息']['_cmf_users_video_id'] = f'{id}'
                    print('new json_data', json_data)
                    # 移动指针 到开始处
                    f.seek(0)
                    # 清空文件 - 指针必须指向开始处
                    f.truncate()
                    f.write(json.dumps(json_data, indent = 4, ensure_ascii = False))
                except:
                    # Rollback in case there is any error
                    conn.rollback()
    conn.close()
    print('结束')
