# ubuntu更新apt-get源，设置apt代理
sudo gedit /etc/apt/apt.conf ，在文件中追加Acquire::http::Proxy "http://address:port";  

# 安装docker-engine：
1.移除旧版本：sudo apt-get remove docker docker-engine docker.io containerd runc
2.更新apt-get：sudo apt-get update
3.安装前提依赖：sudo apt-get install \
    ca-certificates \
    curl \
    gnupg \
    lsb-release
4.追加docker官方GPG key：
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
5.设置安装源仓库
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
6.更新apt-get，安装docker-engine：
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin

# ubuntu安装docker-desktop（可视化工具）：
1.移除旧版本：
sudo apt remove docker-desktop
rm -r $HOME/.docker/desktop
sudo rm /usr/local/bin/com.docker.cli
sudo apt purge docker-desktop
2.从官方下载docker-desktop的deb安装包
3.更新apt-get，安装docker-desktop：
sudo apt-get update
sudo apt-get install {path}/docker-desktop-<version>-<arch>.deb

# ubuntu设置docker client代理
没有设置docker的代理时，docker从官方镜像源拉取镜像失败。
1.创建配置文件
sudo mkdir -p /etc/systemd/system/docker.service.d
sudo gedit /etc/systemd/system/docker.service.d/http-proxy.conf
2.添加配置
[Service]
Environment="HTTP_PROXY=http://address:port"
Environment="HTTPS_PROXY=http://address:port"
3.重启docker容器
sudo systemctl daemon-reload
sudo systemctl restart docker