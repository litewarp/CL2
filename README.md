# A More Modern CourtListener

## Now with 100% less Redux!!

## Stack - explanations below

### Server & Webpack Configuration: [After.js](https://github.com/@jaredpalmer/after.js)

Some people like Next or Gatsby, and they're good, but
After.js really hits the sweet spot for me. First, it's based on top of Razzle, which is by far the simplest method of developing
and deploying a SSR application. It's basically create-react-app for SSR. Best part is that Razzle is agnostic as to framework, so if we want to use Vue later, we can always switch, etc. Plus no webpack configuration but we can override it if we want! Best day ever.

### Rendering Framework: React / Typescript

Will save for further discussion. But it's what I know, it's predictable, and it's actually supported by FB. Plus easier to find future engineers, etc.

Also typescript is great.

### State Management: React Context and React-Query (for data fetching)

If the only state changes we really need to keep track of are (i) router (i.e. which page or view the should render, (ii) layout (i.e. which style and/or layout should be applied to the render), and (iii) asynchronous data requests (to/from localStorage or API), then we can accomplish all of those without Redux.

The router state is managed by React-Router. The Layout State is managed by a custom ThemeContextProvider based on React Context, and data requests are handled by React-Query.

No need for anything fancy or cumbersome.

### CSS Library: [Grommet](https://v2.grommet.io) and Styled-Components

These are personal preferences. Grommet is just a basic framework of components with a certain style.

Styled-Components on the other hand is probably the best library I've used since writing html. Basically, you can inject the css for a component directly into the code. Or use different props to alter the css directly without having to write complicated class files. Also it allows you to override other css classes, although you can use grommet's built in themes to do so as well.

In any case, this part I probably care about the least. Many people use Material-UI, or Ant Design. I think those are too fancy for my tastes. There's also bootstrap, but like, it's not 2009 anymore.

## To Start

    git clone
    cd court_listener_2
    yarn global add typescript
    yarn
    yarn dev
