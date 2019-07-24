import subprocess, time, sys
# 检测的频率
TIME = 60*5
# 要重启的脚本文件
MONITOR_FILE = './caughtImg.py'

class AutoRun:
    """docstring forAutoRun."""
    def __init__(self, sleep_time, m_file):
        self.sleep_time = sleep_time
        self.m_file = m_file
        self.suffix = m_file.split('.')[-1].lower()
        # 初始运行正常
        self.process = None
        # 打开文件先重启一遍脚本
        self.run()
        try:
            while 1:
                # 挂起，延迟
                time.sleep(sleep_time)
                # 获取脚本运行状态
                self.poll = self.process.poll()
                # 值为None代表正常运行，其它一律出错
                if self.poll is None:
                    print('运行正常')
                else:
                    print('未检测到程序运行, 试图重启脚本')
                    self.run()
        except KeyboardInterrupt  as e:
            self.process.kill()

    def run(self):
        # 打开脚本文件
        self.process = subprocess.Popen(['python',self.m_file], stdin = sys.stdin, stdout = sys.stdout, stderr = sys.stderr, shell = False)
        print('重启成功')

AutoRun(TIME, MONITOR_FILE)
