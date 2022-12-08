---
title: 'Guidance to Post a Blog'
category: blog
---

<div id="post-blog-content">

## Preparation

1. Refer to <http://git.mydoc.io/?t=179267> to register Gitee account.

2. Set your primary mail box in gitee settings <https://gitee.com/profile/emails>.

3. Sign your CLA in <https://www.openeuler.org/en/other/cla>.

4. Prepare your git environment refering to <http://git.mydoc.io/?t=180692>.

## Understand blog format

The openEuler blog is written in markdown format.
You can read <https://gitee.com/openeuler/openEuler-portal/blob/master/app/en/interaction/post-blog/index.md> to get understand how the blog is designed.

The head includes the following information:

```
---
title: Sample Post
date: '2020-03-03'
category: blog
tags:
    - Sample
    - ABC
    - cccc
sig: sig-xxx
archives: '2020-03'
author:
  - openEuler Blog Maintainer
summary: Just about everything you'll need to style in the theme：headings, paragraphs, blockquotes, tables, code blocks, and more.
---

Here you can edit your blog.
```

Tips: you can copy `https://gitee.com/openeuler/openEuler-portal/blob/master/app/en/interaction/post-blog/blog_example/20220901-sample-post.md` to your folder and edit it.

## Post your blog

The blog posting follows the pull request of [Gitee](gitee.com).

1. Fork openEuler blog project <https://gitee.com/openeuler/openEuler-portal> to your own gitee. Refer to <http://git.mydoc.io/?t=153749> for detailed guidance.

2. Clone the code to your local environment.

```
git clone https://gitee.com/<your-gitee-id>/openEuler-portal
```

3. Create a branch

```
git checkout -b <branch-name>
```

4. Create a folder in the website floder
   If you are going to post a blog in English, the app/en/blog is your work path.

And if you are going to post a blog in Chinese, the app/zh/blog is your work path.

Assume that you are preparing a English blog.

```
cd app/en/blog
mkdir <your-gitee-id>
cd <your-gitee-id>
touch YEAR-MONTH-DAY-title.md
```

And You can put the resources in the same folder as your text file's, and name the resources as

```
YEAR-MONTH-DAY-title-NN.MARKUP
```

Where the YEAR, MONTH, DAY, and title are the same as your blog file, and NN is the serial number of the pictures, like 01, 02 and so on. The MARKUP is the file extension, and for pictures it is recommended to use png.
The following are one example.

```
2020-01-01-new-years-is-coming.md
2020-01-01-new-years-is-coming-01.png
2020-01-01-new-years-is-coming-02.gif
2020-01-01-new-years-is-coming-03.pdf
```

1. Commit your post

```
git add <file-path>
git commit -m "<message>"
git push origin <branch-name>:<branch-name>
```

2. Refer to <http://git.mydoc.io/?t=153749> to submit your Pull Request

3. Wait for reviewing and merging.

</div>
