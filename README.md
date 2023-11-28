# AutoScale.js

CSS scaling is a mess.  This script gives you the ability to add an`autoscale` attribute to an HTML tag to drive automatic scaling of HTML components.

Here's [an example of the autoscaling in effect](https://htmlpreview.github.io/?https://github.com/HyperCrowd/autoscale.js/blob/main/index.html) and here is the code for it:

```html
<body>
  <!-- The autoscale attribute should be the ID of an element to scale with -->
  <div id="scaleReference">
    This div (#scaleReference) is 50% width of the body and has a p as a sibling
    <pre>&lt;p autoscale="scaleReference" scale="0.25"&gt; :</pre>
  </div>
  <p autoscale="scaleReference" scale="0.25">
    This text width is<br />
    is 25% of the <br />
    #scaleReference<br />
    sibling's 50% width 
  </p>

  <!-- The autoscale attribute without an ID will scale to the immediate parent -->
  <div id="green">
    This div contains two span's scaled to 50% of their parent
    <pre>&lt;span autoscale scale="0.5"&gt; :</pre>
    <span autoscale scale="0.5">
      This text width is 50%
    </span>
    <br />
    <span autoscale scale="0.5">
      of the green parent div
    </span>
  </div>

  <!-- The autoscale attribute also scales divs -->
  <div id="pink">
    This div contains an autoscaling div child
    <pre>&lt;div autoscale scale="0.25"&gt; :</pre>

    <div id="gray" autoscale scale="0.25">
      This div is 25% of it's pink parent 
    </div>
  </div>

  <!-- Autoscaled divs can also have the text within them automatically scaled with "scaleContents" -->
  <div id="pink">
    This div contains an autoscaling div child that is childless
    <pre>&lt;div autoscale scale="0.25" scaleContents&gt; :</pre>
    <div id="gray" autoscale scale="0.25" scaleContents>
      This div is 25% of it's pink parent<br />
      as long as it has no children
    </div>
  </div>

  <!-- Autoscaled divs can also have the text within them automatically scaled with "scaleContents" -->
  <div id="lavender">
    This div contains an autoscaling div child with scaling content
    <pre>&lt;div autoscale scale="0.5" scaleContents&gt; :</pre>
    <div id="gray" autoscale scale="0.5" scaleContents>
      <img src="https://picsum.photos/200/300">
      <br />
      <span>And tables, canvases, and other content!</span>
      <table>
        <thead>
          <th>1</th>
          <th>2</th>
        </thead>
        <tbody>
          <tr>
            <td>A</td>
            <td>B</td>
          </tr>
          <tr>
            <td>C</td>
            <td>D</td>
          </tr>
      </table>
    </div>

    <br /><br />
    And here is the above without scaling
    <pre>&lt;div&gt; :</pre>
    <div id="gray">
      <img src="https://picsum.photos/200/300">
      <br />
      <span>And tables, canvases, and other content!</span>
      <table>
        <thead>
          <th>1</th>
          <th>2</th>
        </thead>
        <tbody>
          <tr>
            <td>A</td>
            <td>B</td>
          </tr>
          <tr>
            <td>C</td>
            <td>D</td>
          </tr>
      </table>
    </div>
  </div>

  <!-- Even text in absolute divs can be scaled to other references -->
  <div id="orange">
    This div contains an absolute div that contains the below text
    <pre>
&lt;span autoscale="orange" scale="0.5"&gt;
&lt;span autoscale="orange" scale="0.5"&gt;
&lt;span autoscale="orange" scale="0.5"&gt;
&lt;span autoscale="orange" scale="0.25"&gt;
    </pre>

    <div id="absolute">
      <span autoscale="orange" scale="0.5">
        Even though this text is
      </span>
      <br />
      <span autoscale="orange"  scale="0.5">
        in an absolute positioned div,
      </span>
      <br />
      <span autoscale="orange" scale="0.5">
        it's 50% of the orange div
      </span>
      <br />
      <span autoscale="orange" scale="0.25">
        (And this is 25%)
      </span>
    </div>
  </div>

  <!-- This is needed to turn on autoscaling -->
  <script src="autoscale.js"></script>
</body>
```