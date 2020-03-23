# Hacker News Clone (Next.js)

A hacker news clone made with next.js. Uses server-side rendering, next/router, etc

## Live Demo

Find the live demo [here](https://hacker-news-next-beige.now.sh/top). (Deployed with [ZEIT Now](https://zeit.co))

## Audit Stats

Performance - 66
Accessibility - 96
Best Practices - 100
SEO - 100
Progressive Web App - 100

## TODO

- [x] Debug PWA functionality. (Bugs in registering service worker)
- [ ] Sort the list of posts in descending order
- [ ] Calculate accurate number of comments on the main screen
- [ ] Make it responsive on mobile screens
- [ ] Defer render blocking CSS and JS
- [x] Fix accessibility errors in google lighthouse audit
- [x] Disable browser error logging in the console
- [x] Loading indicator for page loads and routing
- [x] Global CSS with /pages/\_app.js not working

## Build Setup

Clone the repo and install dependencies

```bash
# install dependencies
npm install # or yarn

# serve in dev mode at localhost:3000
npm run dev

# build for production
npm run build

# serve in production mode
npm start
```

## License

[MIT](https://choosealicense.com/licenses/mit/)
