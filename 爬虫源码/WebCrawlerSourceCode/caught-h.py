# 导入 网页请求模块、网页解析模块、文件系统模块、随机数模块
# 命令行解析
import argparse
import requests
from bs4 import BeautifulSoup
import os
import random
import imghdr

# 创建类，面向对象编程
class EntryData(object):
    """docstring for EntryData."""
    title = ''
    url = ''
    def __init__(self, title, url):
        self.title = title
        self.url = url

# 程序抓取内容的第一个网页入口地址
entry_url = "http://3g.wemarried.cn/"
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

parser = argparse.ArgumentParser()
parser.add_argument('-s', '--save', help='保存地址')
args= parser.parse_args()

if not args.save:
    print ('命令行缺少参数')
    exit(0)

save_path = args.save
index = 1
while 1:
    # 使用lxml进行网页的解析,遇到不对称标签会直接忽略,.text以字符串形式输出
    soup_entry_html = BeautifulSoup(getHtml(entry_url).text, "lxml")
    print ('opened HTML')
    # 获取图片地址
    img_addr = soup_entry_html.select('img')[0]['src']
    img_name = img_addr.split('/')[-1]
    if not os.path.exists(save_path):
        os.makedirs(save_path)
    # 以二进制打开文件，并写入图片数据
    print (img_addr)
    with open(os.path.join(save_path, f"{img_name}{index}" + '.gif'), 'wb') as f:
        f.write(getHtml(img_addr).content)
    index += 1;
