###push to ph-pages branch

- git add dist --all
- git commit -m "Initial dist subtree commit"
- git subtree push --prefix dist origin gh-pages


-----------------------------------------------------------------------------

### Use Gulp tasks

- **gulp or gulp build** to build an optimized version of your application in /dist
- **gulp serve** to launch a browser sync server on your source files
- **gulp serve:dist** to launch a server on your optimized application
- **gulp test** to launch your unit tests with Karma
- **gulp test:auto** to launch your unit tests with Karma in watch mode
- **gulp protractor** to launch your e2e tests with Protractor
- **gulp protractor:dist** to launch your e2e tests with Protractor on the dist files
