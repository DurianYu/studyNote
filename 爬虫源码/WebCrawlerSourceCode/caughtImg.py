# 导入 网页请求模块、网页解析模块、文件系统模块、随机数模块
import requests
from bs4 import BeautifulSoup
import os
import random

# 创建类，面向对象编程
class EntryData(object):
    """docstring for EntryData."""
    title = ''
    url = ''
    def __init__(self, title, url):
        self.title = title
        self.url = url

# 程序抓取内容的第一个网页入口地址
entry_url = "http://www.27270.com/ent/meinvtupian/"
# 请求网页资源函数
def getHtml(url):
    # 浏览器省份
    header_arr = ["Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.153 Safari/537.36",
    "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:30.0) Gecko/20100101 Firefox/30.0",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_2) AppleWebKit/537.75.14 (KHTML, like Gecko) Version/7.0.3 Safari/537.75.14",
    "Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Win64; x64; Trident/6.0)"]
    # 填充请求头，随机伪装成不同浏览器访问网站
    headers = {'User-Agent':header_arr[random.randint(0,4)],
    'Host': 'blog.csdn.net/',
    'Referer': 'http://blog.csdn.net/',
    }
    # 请求链接
    html = requests.get(url, headers)
    # 对于除utf-8编码以外的网页进行重置，防止乱码
    if not html.encoding == 'UTF-8':
        html.encoding = 'GBK'
    # 返回请求后的资源
    return html
# 使用lxml进行网页的解析,遇到不对称标签会直接忽略,.text以字符串形式输出
soup_entry_html = BeautifulSoup(getHtml(entry_url).text, "lxml")
# 获取所有图片分类的的a标签元素
entry_all_a = soup_entry_html.find(id='NewTagListBox')('a')
# 实例化类，方便分类存储数据
type_info = EntryData('title','url')
tag_info = EntryData('title','url')
# 循环所有图片分类的a标签元素
for a in entry_all_a:
    # 随机取0到图片分类a标签长度的值，避免每次从头抓取
    # try:
    #     a = entry_all_a[random.randint(0,len(entry_all_a))]
    # except IndexError as e:
    #     print('发生异常，跳过此次查找')
    #     continue
    # 存储标题和链接。同时去除标题前后空格
    type_info.title = a.get_text().strip()
    type_info.url = a['href']
    # 设置根目录文件夹
    root_path = 'D:/Man\'sDream/';
    # 查看路径是否存在该文件夹，没有就创建该文件夹
    if not os.path.exists(root_path + type_info.title):
        os.makedirs(root_path + type_info.title)
    # 切换目录到创建的文件夹下面
    os.chdir(root_path + type_info.title)
    print('当前路径1:', os.getcwd())
    # 打开类型的页面
    soup_type_html = BeautifulSoup(getHtml(type_info.url).text, 'lxml')
    # 获取页面总数
    max_index = soup_type_html.find(class_='TagPage')('a')[-1]['href'].split('.')[0].split('_')[1]
    # 限制爬取的人物数量
    limit_tag_cnt = 0
    # 遍历页面数
    for index_num in range(1, int(max_index) + 1):
        # 打开页面
        index_html = BeautifulSoup(getHtml(type_info.url[0:-5] + '_' + str(index_num) + '.html').text, 'lxml')
        # 获取人物总数量
        tag_list = index_html.select('#Tag_list li > a')
        # 限制爬取的人物数量
        if limit_tag_cnt == 10:
            break
        for tag_html in tag_list:
            # 限制爬取的人物数量
            if limit_tag_cnt == 10:
                break
            limit_tag_cnt += 1
            # 保存人物的标题和地址
            tag_info.title = tag_html['title'].strip()
            tag_info.url = tag_html['href']
            # 以人物标题作为文件夹名
            dir_person_name = tag_info.title[0:-6]
            if not os.path.exists(root_path + type_info.title + '/' + dir_person_name):
                os.makedirs(root_path + type_info.title + '/' + dir_person_name)
            os.chdir(root_path + type_info.title + '/' + dir_person_name)
            print('当前路径2:' + os.getcwd())
            soup_tag_html = BeautifulSoup(getHtml(tag_info.url).text, "lxml")
            # 异常处理,有的网页缺少内容，防止程序结束
            try:
                max_img_index = soup_tag_html.select('#pageinfo')[0]['pageinfo']
            except IndexError as e:
                print('发生异常，跳过此次查找')
                continue
            limit_img_cnt = 0
            for img_index in range(1, int(max_img_index) + 1):
                if limit_img_cnt == 10:
                    break
                limit_img_cnt += 1
                # 打开图片所在的真正网页
                soup_img_html = BeautifulSoup(getHtml(tag_info.url[0:-5] + '_' + str(img_index) + '.html').text, 'lxml')
                try:
                    img_src = soup_img_html.select('#picBody > p > a')[0].find('img')['src']
                except IndexError:
                    print('发生异常，跳过此次查找')
                    continue
                # 获取图片的后缀名
                suffix = img_src.split('.')[-1]
                # 拼接保存图片的名字
                save_name = dir_person_name + str(img_index) + '.' + suffix
                print('save_name', save_name)
                # 如果有该图片，则跳过
                if os.path.isfile(os.getcwd() + '/' + save_name):
                    continue
                # 以二进制打开文件，并写入图片数据
                with open(save_name, 'wb') as f:
                    f.write(getHtml(img_src).content)
