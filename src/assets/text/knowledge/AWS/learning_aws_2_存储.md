1. S3  
存储总量无限制，单个对象不能大于5TB。
存储桶默认处于受保护状态，只有账户管理员或根用户有权限访问这种新创建的存储桶。


2. S3 Glacier  

3. S3 snow ball  

 

5. 数据传输  
* AWS网络内，使用控制台、AWS命令行界面或API传输  

* 从本地上传到S3存储桶  
使用控制台上传文件，最大允许上传80G大小的文件。CLI或API没有限制。

* AWS Data Sync  
可以在本地存储、S3、EFS之间传输数据

* AWS Transfer for SFTP  
支持程序通过SFTP将文件直接传输到S3

* 分段上传

4. S3 Transfer Acceleration 
