#### 1.6: unicafe step1

Like most companies, [Unicafe](https://www.unicafe.fi/#/9/4) collects feedback from its customers. Your task is to implement a web application for collecting customer feedback. There are only three options for feedback: *good*, *neutral*, and *bad*.

The application must display the total number of collected feedback for each category. Your final application could look like this:

![fullstack content](https://fullstackopen.com/static/d4fe767d6d8eb46f1dd21334f5f9e46e/5a190/13e.png)



Note that your application needs to work only during a single browser session. Once you refresh the page, the collected feedback is allowed to disappear.

It is advisable to use the same structure that is used in material and previous exercise. File *index.js* is as follows:

```js
import ReactDOM from 'react-dom'
import App from './App'

ReactDOM.render(
  <App />, 
  document.getElementById('root')
)
```

You can use the code below as a starting point for the *App.js* file:

```js
import React, { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      code here
    </div>
  )
}

export default App
```

#### 1.7: unicafe step2

Expand your application so that it shows more statistics about the gathered feedback: the total number of collected feedback, the average score (good: 1, neutral: 0, bad: -1) and the percentage of positive feedback.

![fullstack content](https://fullstackopen.com/static/0a5d15ae9f055a15cb469b9c9223df41/5a190/14e.png)



#### 1.8: unicafe step3

Refactor your application so that displaying the statistics is extracted into its own *Statistics* component. The state of the application should remain in the *App* root component.

Remember that components should not be defined inside other components:

```js
// a proper place to define a component
const Statistics = (props) => {
  // ...
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  // do not define a component within another component
  const Statistics = (props) => {
    // ...
  }

  return (
    // ...
  )
}
```

#### 1.9: unicafe step4

Change your application to display statistics only once feedback has been gathered.

![fullstack content](https://fullstackopen.com/static/b453d7533ae85dcaf3eccf342a353c58/5a190/15e.png)



#### 1.10: unicafe step5

Let's continue refactoring the application. Extract the following two components:

- *Button* for defining the buttons used for submitting feedback
- *Statistic* for displaying a single statistic, e.g. the average score.

To be clear: the *Statistic* component always displays a single statistic, meaning that the application uses multiple components for rendering all of the statistics:

```js
const Statistics = (props) => {
  /// ...
  return(
    <div>
      <Statistic text="good" value ={...} />
      <Statistic text="neutral" value ={...} />
      <Statistic text="bad" value ={...} />
      // ...
    </div>
  )
}
```

The application's state should still be kept in the root *App* component.

#### 1.11*: unicafe step6

Display the statistics in an HTML [table](https://developer.mozilla.org/en-US/docs/Learn/HTML/Tables/Basics), so that your application looks roughly like this:

![fullstack content](https://fullstackopen.com/static/a74acccc17aafb02b3801ffa1fcc0fdc/5a190/16e.png)



Remember to keep your console open at all times. If you see this warning in your console:

![fullstack content](https://fullstackopen.com/static/d6f948307449c2673f28f1077ef4d789/5a190/17a.png)



Then perform the necessary actions to make the warning disappear. Try Googling the error message if you get stuck.

*Typical source of an error `Unchecked runtime.lastError: Could not establish connection. Receiving end does not exist.`is Chrome extension. Try going to `chrome://extensions/`and try disabling them one by one and refreshing React app page; the error should eventually disappear.*

**Make sure that from now on you don't see any warnings in your console!**