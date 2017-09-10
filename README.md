# Smartdirect-web

Smartdirect is like Dropbox for URL-shorteners. Instead of files, you store links which you can update any time. So `/blogs/latest` can be updated every time you post and everyone with the link will always see your latest post!

![Demo](/doc/demo.gif)

## Related Repositories

* [Backend](https://github.com/prshreshtha/smartdirect-backend)

## Roadmap

- [X] Directory Browser
  * [X] View (**needs testing**)
  * [X] Create / delete (**needs testing**)
  * [ ] Update
  * [X] Error handling (partial / **needs testing**)
- [ ] Linkation Browser
  * [ ] View
  * [ ] Create / delete
  * [ ] Update
  * [ ] Error handling
- [ ] User profile page
  * [ ] View user info
  * [ ] Update friendly-name (backend is ready)
- [ ] UI
  * [ ] Cleaner design (Ember Paper?)
  * [ ] Mobile design
  * [ ] Error messages

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)
* [Bower](http://bower.io/)
* [Ember CLI](http://ember-cli.com/)
* [PhantomJS](http://phantomjs.org/)

## Installation

* `git clone https://github.com/prshreshtha/smartdirect-web`
* `cd smartdirect-web`
* `npm install`
* `bower install`

## Running / Development

* Set up the [backend](https://github.com/prshreshtha/smartdirect-backend) at port 3000.
* `ember serve --proxy http://localhost:3000`
* Visit your app at [http://localhost:4200](http://localhost:4200).

### Running Tests

TODO

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

TODO

## Further Reading / Useful Links

* [ember.js](http://emberjs.com/)
* [ember-cli](http://ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)

