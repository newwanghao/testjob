---
title:  下一代虚拟化平台StratoVirt详解
category: blog 
date: 2020-10-27
tags:
  - Virt 
  - StratoVirt
archives: 2020-10
author: Zhigang Wang
summary: Deep diive of StratoVirt
---

## 首先罗列一些问题。阅读完本文，你将会有比较清晰的答案

- StratoVirt是什么，有何产品特点？

- StratoVirt的开发背景，为何要做StratoVirt？

- StratoVirt的架构设计原原理是什么？

- StratoVirt未来在openEuler社区的开发路标和演进路线是什么？

## StratoVirt是什么

可能大家心里都会有个疑问：StratoVirt这个名字是什么意思？Strato这个单词的发音[stretə]，意思是大气层中的平流层。

大家知道，大气层地球能够诞生生命关键性因素，能够保护地球不受外太空陨石的侵害。而虚拟化技术是操作系统平台之上的隔离层，既能保护操作系统平台不被恶意应用侵害，又能给上层应用提供安全隔离的环境。

StratoVirt是计算产业中面向云数据中心的企业级虚拟化平台，实现了一套架构统一支持虚拟机、容器、Serverless三种场景，在轻量低噪、软硬协同、安全等方面具备关键技术竞争优势。Strato承载了项目的愿景与未来： 轻量、灵活、 安全和完整的保护能力。这就是StratoVirt这个名字的寓意。

因此StratoVirt项目就是要通过openEuler社区为广大用户引入最先进、最开放的虚拟化技术。

## 为何要做StratoVirt？

- Insight 1： QEMU的演进历史

提到虚拟化，咱们不得不提到qemu。qemu-kvm是整个虚拟化产业发展的基石和主线，但是在多年的发展历史中，也积累了庞大的代码基线和繁多的历史设备。

按照我们的统计，现在qemu已经有157万代码，而且其中又有很大一部分代码是用来支持legacy特性或者设备的，功能和设备严重耦合在一起，导致无法轻装上阵。

另外一个insight就是CVE，我们分析统计了过去十几年中QEMU的CVE问题，其中有将近一半是因为内存问题导致的。

做过基础设施的兄弟都应该都深有感触，碰到CVE，加班熬夜通宵都不是事，而且搞不好还是加了班还背锅，因此我们也在积极探寻一条自我救赎的道路。

我们期望这个答案是Rust。

 - Insight 2：资源隔离方案演进

还有一个insight就是如何进行资源隔离。大家都知道，一台服务器上的资源太大了，肯定要分开了用或者分开卖。咱们手里的两个有力的武器是container和虚拟机，都可以实现资源的分割。当然，从管理面上咱们可以看到K8S，openstack，libvirt这些东西。

container这玩意非常好，但是就是不够安全，所以咱们又搞了一条新的路，用虚拟机套容器（其实也就是所谓的安全容器）。安全性的问题解决了，但是又带来一个新的问题，虚拟机太重了，对于一些常驻的业务还好，对一些轻量的业务（比如serverless），那就真是要命了。向左走，还是向右走？咱们的解决方案是啥，microvm。

在轻量化场景下，openEuler在开源的解决方案做了很多探索，也尝试来解题。

第一个发现是docker太重了，对每个vm的管理开销接近100MB，因此我们有了isula。同时我们发现qemu也太重了，因此有了stratovirt。

## StratoVirt的架构设计原原理是什么？

从顶层架构上看，当前StratoVirt在软件栈中所处的位置和qemu、Firecracker类似：向下借助KVM模块实现硬件加速，例如X86的VT和鲲鹏平台的Kunpeng-V；向上通过容器引擎isula或docker对接容器生态，通过虚拟机引擎libvirt对接虚拟机生态，以此实现对端、边、云中多种应用场景的支持。

就StratoVirt本身而言，相比于Rust-VMM最大的架构特征就是组件化、可灵活配置：例如在StratoVirt中引入了device model的概念，基于此实现了CPU、扁平内存、堆叠内存、virtio设备PCI设备等多种公共组件；

针对轻量化场景，我们可以选用轻量机型主板并在此基础上增加CPU、扁平内存、Virtio设备等必要组件；

针对标准化场景不，我们可以选用标准机型主板并增加CPU、堆叠内存模型、PCI系统、Virtio设备等组件，这样便可以灵活应对各种场景的需求。

## StratoVirt的的技术路标和演进节奏？

StratoVirt会放在openEuler社区进行开发，相关的特性只要成熟就能合入主线。同时，每个每个季度也会release一个包含所有成熟特性的正式版本。