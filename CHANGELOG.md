# [1.4.0](https://github.com/juliomrqz/nuxt-optimized-images/compare/v1.3.0...v1.4.0) (2021-01-02)


### Bug Fixes

* **docs:** fix typo ([#231](https://github.com/juliomrqz/nuxt-optimized-images/issues/231)) ([f6d3091](https://github.com/juliomrqz/nuxt-optimized-images/commit/f6d30919261da6f7b346375212ac85143e84a997))


### Features

* **docs:** add reference of AVIF conversion ([9ea549b](https://github.com/juliomrqz/nuxt-optimized-images/commit/9ea549bc8de2cd00087e6882b02d56cc55125a89))
* **example:** add reference of AVIF conversion ([58ddf4e](https://github.com/juliomrqz/nuxt-optimized-images/commit/58ddf4ec1f098895793aa32d11640f52fe9789fd))



# [1.3.0](https://github.com/juliomrqz/nuxt-optimized-images/compare/v1.2.0...v1.3.0) (2020-08-27)


### Features

* recognize AVIF format as image ([c1bf815](https://github.com/juliomrqz/nuxt-optimized-images/commit/c1bf815964a75f94b128d446cb910dd63a1c3e46))



# [1.2.0](https://github.com/juliomrqz/nuxt-optimized-images/compare/v1.1.0...v1.2.0) (2020-08-18)


### Features

* support responsive-loader v2 ([a2cb591](https://github.com/juliomrqz/nuxt-optimized-images/commit/a2cb5912f28c15a6bfe96a11186c414c06ff33e5))



# [1.1.0](https://github.com/juliomrqz/nuxt-optimized-images/compare/v1.0.1...v1.1.0) (2020-07-19)

* dependencies updates

### Bug Fixes

* **docs:** fix invalid links in the Usage article of Docs ([3cbb0e4](https://github.com/juliomrqz/nuxt-optimized-images/commit/3cbb0e4d12bda36b27ba04281ead71927c3a1a4f))
* fix counting loaders installed ([#196](https://github.com/juliomrqz/nuxt-optimized-images/issues/196)) ([e36dcac](https://github.com/juliomrqz/nuxt-optimized-images/commit/e36dcacff4b720fb885ecf0c5195d576920136b0))

### Refactor

* update layout of docs articles ([130d851](https://github.com/juliomrqz/nuxt-optimized-images/commit/130d85179fef844cb4d479f01f9dc9d2fcea2460))
* update project owner ([29189b0](https://github.com/juliomrqz/nuxt-optimized-images/commit/29189b075f7dc096cefd0c86fb6c5b927f986a93))

## [1.0.1](https://github.com/juliomrqz/nuxt-optimized-images/compare/v1.0.0...v1.0.1) (2020-05-12)


### Bug Fixes

* fix importing for url-loader and file-loader ([c30be79](https://github.com/juliomrqz/nuxt-optimized-images/commit/c30be79fe7b61d821df8306a41c4d31a3a2dabae))



# [1.0.0](https://github.com/juliomrqz/nuxt-optimized-images/compare/v0.4.0...v1.0.0) (2020-04-12)


* refactor!: update parent company ([ad10855](https://github.com/juliomrqz/nuxt-optimized-images/commit/ad108557cb6880a9a28760750feb8ec51a80ccd5))


### BREAKING CHANGES

* **The package has been renamed from `@bazzite/nuxt-optimized-images` to `@aceforth/nuxt-optimized-images`.**



To upgrade

1. `npm install --save-dev @aceforth/nuxt-optimized-images` 

   or `yarn add --dev @aceforth/nuxt-optimized-images`

2. `npm uninstall @bazzite/nuxt-optimized-images` 

   or `yarn remove @bazzite/nuxt-optimized-images`

3. replace:

```js
{
  buildModules: [
    '@bazzite/nuxt-optimized-images',
  ],
}
```

with

```js
{
  buildModules: [
    '@aceforth/nuxt-optimized-images',
  ],
}
```


That’s it, there are no functional changes compared to `@bazzite/nuxt-optimized-images@0.4.0`.



# [0.4.0](https://github.com/juliomrqz/nuxt-optimized-images/compare/v0.3.0...v0.4.0) (2020-03-31)


### Bug Fixes

* **docs:** fix links in the Usage page and fix typos ([#159](https://github.com/juliomrqz/nuxt-optimized-images/issues/159)) ([c33702e](https://github.com/juliomrqz/nuxt-optimized-images/commit/c33702eed4b6cf53627089317a31043fca3d23aa))
* **docs:** fix typo ([#146](https://github.com/juliomrqz/nuxt-optimized-images/issues/146)) ([ff1489c](https://github.com/juliomrqz/nuxt-optimized-images/commit/ff1489cc3f18614624e845a7c81c0ff4bc7e0c5d))
* **docs:** update Installation instructions ([ef86870](https://github.com/juliomrqz/nuxt-optimized-images/commit/ef8687063565d58df362309867ee82ea30be9b33))
* **tests:** fix tests ([9bdf817](https://github.com/juliomrqz/nuxt-optimized-images/commit/9bdf8175406ac03cb08c570e5a9f82d0efe28b91))


* refactor!: drop support for Node.js 8 ([b747b41](https://github.com/juliomrqz/nuxt-optimized-images/commit/b747b41d2374b201097883b79a1d3eb074115087))


### BREAKING CHANGES

* minimum required Node.js version is 10.x



# [0.3.0](https://github.com/juliomrqz/nuxt-optimized-images/compare/v0.2.2...v0.3.0) (2019-12-19)


### Performance Improvements

* use `contenthash` for images name on production ([7ab94c0](https://github.com/juliomrqz/nuxt-optimized-images/commit/7ab94c06c1d0a092a9c93bcfc4481728017029c3))



## [0.2.2](https://github.com/juliomrqz/nuxt-optimized-images/compare/v0.2.1...v0.2.2) (2019-11-27)


### Bug Fixes

* **example:** print the nuxt debug messages when static generating the project ([4a3d69b](https://github.com/juliomrqz/nuxt-optimized-images/commit/4a3d69b34a4e4f24d3b979d24ca774730d75b3a3))
* fix the warning message when it's only used the LQIP loader ([27b920b](https://github.com/juliomrqz/nuxt-optimized-images/commit/27b920b44feac40560325326a7ea110ec3f627cd))
* **docs:** fix camel case in responsive-loader example ([#51](https://github.com/juliomrqz/nuxt-optimized-images/issues/51)) ([210ec85](https://github.com/juliomrqz/nuxt-optimized-images/commit/210ec85e248cfddc6834bf5c178b834d30201947))
* **docs:** fix typo on docs ([#99](https://github.com/juliomrqz/nuxt-optimized-images/issues/99)) ([5efce80](https://github.com/juliomrqz/nuxt-optimized-images/commit/5efce8082e93fc3ec34d429b0a6dea65cde9c244))


### Minor Changes

* **tests:** include the static generation of the example project in Travis CI ([d518ce9](https://github.com/juliomrqz/nuxt-optimized-images/commit/d518ce94a8317d73627cca3f571b4a8ee04e8c29))



## [0.2.1](https://github.com/juliomrqz/nuxt-optimized-images/compare/v0.2.0...v0.2.1) (2019-05-24)


### Bug Fixes

* **docs:** fix description of the page `/es/docs/contributing` ([1b65df6](https://github.com/juliomrqz/nuxt-optimized-images/commit/1b65df6))
* ignore the iteration of the webpack rules without a test attribute ([a73dc56](https://github.com/juliomrqz/nuxt-optimized-images/commit/a73dc56))



## [0.2.0](https://github.com/juliomrqz/nuxt-optimized-images/compare/v0.1.0...v0.2.0) (2019-05-17)


### Bug Fixes

* **package:** update raw-loader to version 2.0.0 ([e93b584](https://github.com/juliomrqz/nuxt-optimized-images/commit/e93b584))
* fix included svgs files with raw-loader@2.x ([4468716](https://github.com/juliomrqz/nuxt-optimized-images/commit/4468716))


### Features

* support `sqip-loader` ([098649](https://github.com/juliomrqz/nuxt-optimized-images/commit/098649))


## 0.1.0 (2019-03-14)

* first stable version

