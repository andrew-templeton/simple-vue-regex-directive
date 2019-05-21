
# simple-vue-regex-directive

[Package on NPM](https://npmjs.org/simple-vue-regex-directive)
[Package on GitHub](https://github.com/andrew-templeton/simple-vue-regex-directive)

Simple, no-dependency way to validate textual `<input>` fields (including email and number) with Vue directives. This system works on custom components as well, so long as the custom component only has one text input within the custom definition. Has no dependencies, but must be using ES6 for the project (use Babel or comparable, which ships with Vue CLI projects).

### Use


##### JS Use

###### Globally
```javascript
//
import Vue from 'vue'
import SimpleVueRegexDirective from 'simple-vue-regex-directive'
// You can name it anything you like, will be usable with: v-regex with this val
Vue.directive('regex', SimpleVueRegexDirective({
  // Arbitrary key-value pairs for input's style. See "Locally" for the default.
  color: 'red'
}))
```

###### Locally:
```javascript
export default {
  name: 'YourComponent',
  directives: {
    // name within component, usable in component with v-regex with this value
    regex: SimpleVueRegexDirective({
      // Arbitrary styles to apply on error. This value here is the default.
      'box-shadow': '0 0 5px 5px red inset'
    })
  }
}
```


##### HTML Use:

###### Static value, only numbers
Note quad-backslash and single quotes, to escape to `\d` in `RegExp`:
```html
<input v-regex="'^\\\\d+$'"/>
```


###### Dynamic values, only numbers, as String:
```javascript
export default {
  data () {
    return {
      stringPattern: '^\\d+$',
      regexpPattern: /^\d+$/
    }
  }
}
```

```html
<input v-regex="stringPattern"/>
<any-component-with-only-one-inner-input v-regex="regexpPattern"/>
```


##### Notes:
- Passing anything but an Object for error styles makes it use the default val
- Only string values can be used as the values in the error styles object


### License: MIT
