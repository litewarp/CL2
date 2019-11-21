import React from "react";
import { Link } from "react-router-dom";
import Helmet from "react-helmet";
import { connect } from "react-redux";
import { fetchTest } from "../root/actions";

const Home = props => {
  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <div className="Home">
        <div className="Home-header">
          <h2>Welcome to After.js</h2>
        </div>
        <p className="Home-intro">
          To get started, edit <code>src/Home.js</code> or{" "}
          <code>src/About.js</code>and save to reload.
        </p>
        <Link to="/about">About -></Link>
      </div>
    </>
  );
};

Home.getInitialProps = async ({ store }) => {
  await store.dispatch(fetchTest());
  // u can get initial states with store.getState()
  //console.log(store.getState());
};

const mstp = ({ posts }) => ({ posts });

export default connect(
  mstp,
  { fetchTest }
)(Home);
