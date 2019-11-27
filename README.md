A More Modern CourtListener
(at least the front end!)

// Stack - explanations below

Server & Webpack Configuration: After.js & Razzle

Some people like Next or Gatsby, and they're good, but
After.js really hits the sweet spot for me. First, it's based on top of Razzle, which is by far the simplest method of developing
and deploying a SSR application. It's basically create-react-app for SSR. Best part is that Razzle is agnostic as to framework, so if we want to use Vue later, we can always switch, etc. Plus no webpack configuration but we can override it if we want! Best day ever.

Rendering Framework: React

Will save for further discussion. But it's what I know, it's predictable, and it's actually supported by FB. Plus easier to find future engineers, etc.

State Management: Redux Toolkit

Here are the primary downsides: it's sometimes unecessary, it adds boilerplate, and there's a learning curve

However, once you learn it, it makes a whole lot of sense, and since everything is sequenced and logged, it is super easy to debug any problems.

I'm open to swapping out Redux for something else, but take a look at the code I've written and you'll see it's not that bad especially with some of the newer toolkit tools and hooks.

CSS Library: Grommet and Styled-Components

These are personal preferences. Grommet is just a basic framework of components with a certain style.

Styled-Components on the other hand is probably the best library I've used since writing html. Basically, you can inject the css for a component directly into the code. Or use different props to alter the css directly without having to write complicated class files. Also it allows you to override other css classes, although you can use grommet's built in themes to do so as well.

In any case, this part I probably care about the least. Many people use Material-UI, or Ant Design. I think those are too fancy for my tastes. There's also bootstrap, but like, it's not 2009 anymore.

// To Start

git clone

cd CL2

// install typescript globally if not already installed

yarn global add typescript

yarn install

yarn dev

