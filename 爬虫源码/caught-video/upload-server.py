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
            mp4_file = os.path.join(BASIC_PATH, v1, v2, '抖音.mp4')
            if not os.path.exists(json_file) or not os.path.getsize(json_file) or os.path.getsize(mp4_file) < 512000:
                print('没有.json文件 或 mp4文件太小， 跳过')
                continue
            encode_type = getEncode(json_file)
            with open(json_file, 'r+', encoding=encode_type, errors='ignore') as f:
                json_data = json.loads(f.read())
                if json_data['_数据库信息'].get('_cmf_users_video_id'):
                    print('已有数据，跳过')
                    continue

                # 读取信息
                status = '1'
                isdel = '0'
                title = json_data['_抖音数据']['_描述']
                thumb = json_data['_数据库信息']['_封面2_url']
                href = json_data['_数据库信息']['_抖音mp4_url']
                # 时间戳
                addtime = int(time.time())
                # 播主 - uid
                uid = json_data['_数据库信息']['_id']
                thumb_s = json_data['_数据库信息']['_封面2_url']
                show_val = None
                # 视频 - 标签
                tag_id = tags.get(local_tag)
                if not tag_id:
                    print('视频二级标签错误，请检查路径')
                    exit(0)
                # 播主 - 头像
                avatar = json_data['_数据库信息']['_头像_url']
                avatar_thumb = json_data['_数据库信息']['_头像_url']

                # 存储数据库
                try:
                    # 执行sql语句
                    # 插入 - 视频数据
                    cursor.execute("""INSERT INTO `cmf_users_video`
                    (`status`, `isdel`, `title`, `thumb`, `href`, `addtime`, `uid`, `thumb_s`, `show_val`)
                    VALUES
                    ('{}','{}','{}','{}','{}','{}','{}','{}','{}')""".format(status, isdel, title, thumb, href, addtime, uid, thumb_s, show_val))
                    # 此方法要在commit之前使用， 否则值为 0
                    id = conn.insert_id()
                    print('video_id: ', id)
                    # 插入 - 视频标签
                    cursor.execute("""INSERT INTO `cmf_video_class_details`
                    (`sd_id`, `video_id`)
                    VALUES('{}','{}')""".format(tag_id, id))
                    # 更新 - 播主头像
                    cursor.execute("""UPDATE `cmf_users` SET avatar='{}', avatar_thumb='{}' WHERE id = '{}'""".format(avatar, avatar_thumb, uid))
                    # 提交到数据库执行
                    conn.commit()
                    print('提交成功')
                    # 获取主键
                    # 此方法要在commit之后使用， 否则值为 空
                    # id = cursor.lastrowid
                    print('last_id: ', id)
                    json_data['_数据库信息']['_cmf_users_video_id'] = f'{id}'
                    print('new json_data', id)
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
