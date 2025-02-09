@css docs

<js
const package = require('../package.json')
>

# Documentation v<js package.version >

<hr>
## Get Started

### Install

- ```npm i -g mogara```
- or download latest [mogara-win.exe](https://github.com/IsmailBinMujeeb/mogara/releases)

### Create a index.mg file and paste:

```# Hello World```

### Now run this command:

```mogara index.mg```

<hr>

## Quick Access

### Headings

<table>
<thead><tr><th>Mogara</th><th>HTML</th></tr><thead>
<tbody>
<tr><td>#</td><td>h1</td></tr>
<tr><td>##</td><td>h2</td></tr>
<tr><td>###</td><td>h3</td></tr>
<tr><td>####</td><td>h4</td></tr>
<tr><td>#####</td><td>h5</td></tr>
<tr><td>######</td><td>h6</td></tr>
</tbody>
</table>

**Example :-**

```
# h1
## h2
### h3
#### h4
##### h5
###### h6
```

### Styling

<table>
<thead><tr><th>Mogara</th><th>HTML</th></tr><thead>
<tbody>
<tr><td>*Italic*</td><td>italic tag</td></tr>
<tr><td>**Bold**</td><td>Bold tag</td></tr>
<tr><td>_Underline_</td><td>Underline</td></tr>
<tr><td>~strike~</td><td>strike</td></tr>
<tr><td>^SuperText^</td><td>Superscript tag</td></tr>
<tr><td>__SubText__</td><td>Subscript tag</td></tr>
</tbody>
</table>

**Example :-**

```
*Italic*
**Bold**
_Underline_
~Strike~
^Super Script^
__Sub Script__
```

### Pre & Code

<table>
<thead><tr><th>Mogara</th><th>HTML</th></tr><thead>
<tbody>
<tr><td>``` ```</td><td>pre tag</td></tr>
<tr><td>` `</td><td>code tag</td></tr>
</tbody>
</table>

**Example :-**

```
`const a = 10;`
```
const a = 10;
```
```

### Links and images

<table>
<thead><tr><th>Mogara</th><th>HTML</th></tr><thead>
<tbody>
<tr><td>[text](href)</td><td>anchor tag</td></tr>
<tr><td>![alt](src)</td><td>image tag</td></tr>
</tbody>
</table>

**Example :-**

```
[Visit example.com](https://example.com)
![Bird Image](https://images.alphacoders.com/492/492674.jpg)
```

### Ordered and Unorder lists

<table>
<thead><tr><th>Mogara</th><th>HTML</th></tr><thead>
<tbody>
<tr><td>( -`or`*`or`+ )</td><td>unorder list tag</td></tr>
<tr><td>( 1. 2. 3. ... )</td><td>order list tag</td></tr>
</tbody>
</table>

**Example :-**

```
- Delhi
+ Mumbai
* Chennai

1. Apple
2. Mango
3. Banana
```

### Div tag container

<table>
<thead><tr><th>Mogara</th><th>HTML</th></tr><thead>
<tbody>
<tr><td><? Mogara Code Goes Here ?></td><td>div tag</td></tr>
<tr><td><? Mogara Code Goes Here ?>(class="wrapper")</td><td>div tag with attributes like class, id, styles, etc</td></tr>
</tbody>
</table>

**Example :-**

<?
This is a div tag
?>

<?
This is a div tag with class attribute
?>(class="wrapper")

## Css Styling

### Internal css

- In mogara you can write any css code in between <css style code >

**Example:- **
```
<css
body{
    color: red;
}
>
```

### External css

- In mogara you can write the path to .css in 

**Example:- **
```
<css: path/to/css >
```

### Inline css ( Only for div tag )

- In mogara you can write inline css for divs in circular braces `()`

**Example:- **
```
<?
[example.com](example.com)
?>(style="background-color: black;")
```

## Embedded JS

**Example:- **
```
<js
function sayHey(name){
    return 'Hey! ' + name;
}
>

<js sayHey("John Deo") >
```


- In mogara you can also use .js files code.

**Example:- **
```
<js: path/to/js>
```