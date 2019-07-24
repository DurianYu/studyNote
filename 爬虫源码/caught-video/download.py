import requests
from bs4 import BeautifulSoup


def parse_text(text):
    soup = BeautifulSoup(text, 'html.parser')

    thumbnail_e = soup.find('img', attrs={'class': 'img-thumbnail'})
    thumbnail = thumbnail_e.get('src')

    mp4_e = soup.find('a', attrs={'download': '720.mp4'})
    mp4 = mp4_e.get('href')
    mp3_e = soup.find('a', attrs={'download': 'bj.MP3'})
    mp3 = mp3_e.get('href')

    print(thumbnail)
    print(mp4)
    print(mp3)

    ps = soup.findAll('p')

    author_id = ps[1].find('span').text
    summary = ps[2].find('span').text
    comment_n = ps[3].find('span').text
    praise_n = ps[4].find('span').text
    share_n = ps[5].find('span').text

    for index, item in enumerate(ps):
        t = item.find('span')
        if t is not None:
            print(index, item.find('span').text)


def parse_uri(url):
    payload = {
        'url': url
    }

    url = 'https://api.douyin.qlike.cn/parse.php?app=douyin'
    r = requests.post(url, payload)
    print(r.text)


def parse_data(data):
    soup = BeautifulSoup(data, 'html.parser')
    trs = soup.find_all('tr', attrs={'class': 'js-slider-aweme'})
    for tr in trs:


        # 热度
        # rd = tr.find('span', attrs={'class': 'risk-index'}).text

        # 封面
        # fm = tr.find('img').get('src')

        # 标题
        # bt = tr.find_all('a', attrs={'class': 'js-open-aweme-pop'})
        # bt = bt[1].text.strip()

        # 热词
        rc = tr.find_all('a', attrs={'class': 'js-hotKeyWord'})
        rc_arr = []
        for tmp in rc:
            rc_arr.append(tmp.text)

        # 播主
        bz = tr.find_all('a')
        bz = bz[13].text

        # 日期
        rq = tr.find('div', attrs={'class': 'item-sub-title'}).text



    return None;


if __name__ == '__main__':
    with open('data01.txt', 'r') as _f:
        f = _f.read()

    parse_data(f)

    # print(f)

#     text = '''
#     <center><p><img src="http://p3-dy.byteimg.com/large/27c120008f02f9f5ad0c2.jpeg" width="20%" class="img-thumbnail"></p>
# <a target="_blank" download="720.mp4" role="button" rel="noreferrer" class="btn btn-success btn-sm" href="http://v3-dy-y.ixigua.com/9f1098acbbd88f7031cfea3c4ff566d7/5d296284/video/m/2205a6b5f2c9be3481c88f3bf876230a02d1162a93fe00009ab68ec0c3e7/?rc=M3R4O2txbW9lbjMzZ2kzM0ApQHRAbzQ5NTw0NzYzNDo6NDY6PDNAKXUpQGczdSlAZjN2KUBmcHcxZnNoaGRmOzRAaWY1ZnJjbC8xXy0tNS0wc3MtbyNvIzQ0NjMyLS4tLTAxLi4tLi9pOmIucCM6YS1xIzpgLW8jYmZoXitqdDojLy5e">点击下载720P无水印视频</a>|<a target="_blank" download="bj.MP3" role="button" rel="noreferrer" class="btn btn-success btn-sm" href="http://p9-dy.byteimg.com/obj/ies-music/1636657497274376.mp3">点击下载背景音乐</a></center>
# <p>作者用户ID：	<span class="label label-primary">21916458498</span></p>
# <p>作品描述：	    <span class="label label-primary">震惊世界，这么多年㊙️竟然被揭穿，我的身份证能认出我嘛，太厉害了，…#85年</span></p>
# <p>评论量：		<span class="label label-primary">29011</span></p>
# <p>点赞量：		<span class="label label-primary">1584762</span></p>
# <p>分享量：		<span class="label label-primary">21600</span></p>
#     '''
#     parse_text(text)
# parse_uri('#在抖音，记录美好生活#震惊世界，这么多年㊙️竟然被揭穿，我的身份证能认出我嘛，太厉害了，…#85年 http://v.douyin.com/knvKms/ 复制此链接，打开【抖音短视频】，直接观看视频！')
