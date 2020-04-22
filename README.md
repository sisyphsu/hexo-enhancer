# hexo-enhancer

This is an feature enhancement plugin for `Hexo`.

中文文档：https://sulin.me/2019/Z726F8.html

##  Introduction

This plugin support multiple helpful features as blow (**by now**):

- Auto generate `title` by filename.
- Auto generate `abbrlink` by filename, with `base32` and `crc32` arithmetic.
- Auto generate `date` by filename, like `Jekyll`.
- Auto generate `categories` by filepath.
- Auto generate `tags` by global pre-configured `tags` and `keywords` in the `_config.yml`.

For example, without this plugin, you need write MarkDown like this:

```markdown
---
title: Title
date: 2019-03-05 12:54:57
categories: [A, B]
tags: [tag1, tag2]
---

# Title

This is a markdown file, in categories [A, B], with tags [tag1, tag2].  

```

With this graceful plugin, you don't need write boring `Front-matter` anymore.

```markdown
# Title

This is a markdown file, in categories [A, B], with tags [tag1, tag2].
```

## Installation

```
npm install hexo-enhancer --save
```

OR

```
yarn add hexo-enhancer
```

## Usage - `date` and `title` 

Like `Jekyll`, you need use formatted `filename`, which is `date + title`, `hexo-enhancer` will parse them from your filename.

The format is really flexible:
```regexp
/^.?(\d{4})[-_]?(\d{2})[-_]?(\d{2}).?[-_.@# ]*(.*)$/
```

If you are familiar with `Regexp`, you will know how flexible it is:

```
20091010-Title.md
2009-10-10_Title.md
2009-10-10-Title.md
2009/10/10#Title.md
2009/10/10@Title.md
[20091010]-Title.md
【20091010】Title.md
「20091010」-Title.md
```

All filenames above is fine, `hexo-enhancer` will parse it into:

```markdown
---
title: Title
date: 2009-10-10
---
```
## Usage - `categories`

For `categories`, you should put your `.md` file in right directory with right name, `hexo-enhancer` will use the directory name as `categories`, 
which means `_posts/problom-record/Java/20091010-Title.md` will has:

```markdown
---
categories: [problom-record, Java]
---
```

## Usage - `tags`

For `tags`, you can prepare all `candidate-tag` in `_config.yml`,  like this:

```yaml
keywords: HTML, JavaScript, Hexo
tags: Java, Golang, React, Vue
```

`hexo-enhancer` will scan your post file, auto allocate all tags which appreared in the markdown source.

Tags are case insensitive.

## Usage - `abbrlink`

`hexo-enhancer` will use `base32(crc32(title))` generate a short link for your post, you can use it in the `permlink`:

```yaml
permalink: :year/:abbrlink.html
# permalink: :year/:abbrlink
# permalink: posts/:abbrlink.html
# permalink: :year/:month/:day/:abbrlink.html
```

With abbrlink, your post's url will really clean, like `https://sulin.me/2019/Z726F8.html`

## New Features

### 2020-04-22

1. Tag searching case insensitive
2. Automaticly add "mathjax: true" if src contains $

## License

MIT
