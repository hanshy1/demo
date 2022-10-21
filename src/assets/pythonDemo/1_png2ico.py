import os
from PIL import Image

# 依赖pillow库
# 脚本和输入的文件放在同一个文件夹下
# 生成的ico文件在output中


def png2ico(path):
    # image is not found
    if not os.path.exists(path):
        print("path is not found")
        return
    
    img = Image.open(path)
    icon_name = os.path.basename(path).split(".")[0]
    icon_sizes = [(16,16), (32,32), (48,48), (64,64),(128,128)]

    # make output dir if it not exist
    if not os.path.exists(os.path.abspath(".\\output")):
        os.mkdir("output")
    if not os.path.exists(os.path.abspath(".\\output\\" + icon_name)):
        os.mkdir(os.path.abspath(".\\output\\" + icon_name))

    # save image as ico
    img.save(os.path.abspath(".\\output\\" + icon_name + "\\logo.ico"), sizes=icon_sizes)

    # print ico sizes
    print(Image.open(os.path.abspath(".\\output\\" + icon_name + "\\logo.ico")).info["sizes"])


png2ico(os.path.abspath(".\\test_7.png"))

