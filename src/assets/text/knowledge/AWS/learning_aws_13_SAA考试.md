# AWS Inspector
AWS Inspector是一项自动安全评估项目，有助于提高在AWS上部署的应用程序的安全性与合规性。
AWS Inspector安全评估可帮助您检查 Amazon EC2 实例是否存在意外的网络可访问性和漏洞。

# AWS Macie
AWS Macie是一项完全托管的数据安全和数据隐私服务，它利用机器学习和模式匹配来发现和保护AWS中的敏感数据。
可以大规模自动发现敏感数据，同时降低保护数据的成本。
Macie 会自动提供 Amazon S3 存储桶的清单，包括未加密的存储桶、可公开访问的存储桶以及与 AWS 账户共享的存储桶的列表。
Macie 将机器学习和模式匹配技术应用于您选择的存储桶，以识别敏感数据，并向您发出警报，例如个人身份信息 (PII)。

# AWS GuardDuty，WAF，Shield Advanced
* GuardDuty是一项威胁检测服务，持续监控AWS账户和工作负载的恶意活动，并提供详细的安全侦查结果以实现可见性和补救。
  停止使用未经授权的凭证、S3中的异常访问、来自恶意IP地址的API调用等；持续监控和分析。

* WAF是一项应用程序防火墙，可以部署到CloudFront、ALB、API Gateway、Appsync上。WAF自带Shield Standard。
  可以阻止指定请求（指定IP段，SQL注入，XSS）

* Shield Advanced防范DDoS攻击。包括基础设施攻击（如UDP泛洪）、状态表耗尽攻击（TCP SYN泛洪）、应用程序攻击（HTTP GET或POST泛洪），Shield Advanced可为EC2实例、ELB、CloudFront、Route53提供扩展版DDoS攻击保护。

Shield Advanced负责缓解第3层和第4层DDoS攻击（UDP和TCP SYN泛洪），对于应用程序层（第7层），可以使用WAF缓解攻击。

# EC2实例类型

# S3类型
S3 standard 频繁访问。
S3 Standard-IA，不频繁访问，但访问时可以立即响应。
S3 Standard-单区-IA 不频繁访问，但访问时可以立即响应。其他存储类将数据存储在至少3个可用区，单区IA只存储在一个可用区内，成本低。
S3 intelligent Tiering 智能分层，当访问模式和响应模式未知时，可以在两个存储类之间自动切换来优化存储成本。需要额外收费。
S3 Glacier 长期存储不频繁访问和不需要立即响应的数据，加速检索1到5分钟，标准检索3到5小时，批量检索5到12小时。
S3 Glacier Deep Archive 成本最低的存储，适用于长期存储不长访问的数据，在12个小时内可以检索。

# Aurora

# ELB，ALB，NLB，GLB，CLB，目标组
ELB可以在一个或多个可用区中的多个目标（EC2实例、容器、IP）之间自动分配传入的流量。它会自动监控目标的状况，将流量传输到运行状况良好的目标。

* ALB
    支持第7层协议（HTTP/HTTPS/WebSocket），不支持第4层协议（TCP/UDP）。
* NLB
    支持第4层协议（TCP/UDP）。
* GLB
    支持第3层协议。
* CLB
    支持4层协议（TCP/UDP）和7层协议(HTTP/HTTPS)。

* 目标组
每个目标组均用于将请求路由到一个或多个已注册的目标。在创建每个侦听器规则时，可以指定目标组和条件。满足规则条件时，流量会转发到相应的目标组。

# Storage Gateway
文件网关
卷网关
磁带网关

# Lambda@Edge

# Kinesis
Amazon Kinesis 可让您轻松收集、处理和分析实时流数据
* Kinesis Data Stream
    Amazon Kinesis Data Streams 是一种可大规模扩展、高度持久的数据提取和处理服务，针对流数据进行了优化。您可以配置数以万计的数据创建器，连续不断地将数据传输到 Kinesis 数据流。数据将在几毫秒内传输到您的 Amazon Kinesis 应用程序，这些应用程序将按生成顺序接收数据记录。
* Kinesis Data Firehose
    用于实时提供流数据到目标如 Amazon S3、Amazon Redshift、Amazon OpenSearch服务。
* Kinesis Data Analytics
    通过 SQL 或 Apache Flink 实时处理数据流。

Kinesis Data Stream：捕获数据
Kinesis Data Firehose：捕获、转换数据到AWS存储
Kinesis Data Analytics：对流数据进行处理分析

# AWS Redshift
跨数据仓库、运营数据库和数据湖分析所有数据类型使用标准的 SQL 运行查询和部署机器学习 (ML) 模型。
在您的组织内外共享实时数据，以改进协作，隔离关键工作负载，加速开发，并支持实时洞察。

# ElasticSearch
Elasticsearch 是一款流行的开源搜索和分析引擎，适用于日志分析、实时应用程序监控、点击流分析等使用案例。

# AWS Glue
Amazon Glue 是一项完全托管的 ETL（提取、转换和加载）服务，使您能够轻松而经济高效地对数据进行分类、清理和扩充，并在各种数据存储和数据流之间可靠地移动数据。


# AWS EMR

# DynamoDB是否有只读副本，全局表

# KMS和Secret Manager

# 堡垒主机

# Global Accelerator创建端点
端点可以为EC2实例、NLB、ALB、弹性IP地址。

# 数据传输


配置TLS侦听器，并在NLB上添加服务器证书。
FSx for windows，支持SMB协议
Spot fleet实例对大数据分析，机器学习，高性能计算工作负载非常有效，并能节约成本。
Snowball Edge Storage Optimized可以将数据直接传送到S3或EFS、FSx上。
Snowball 不能直接将数据传输到S3 Glacier。
Storage Gateway 可以将文件存储在S3 Glacier中。
ELB支持IPv4和IPv6，但不能同时支持。