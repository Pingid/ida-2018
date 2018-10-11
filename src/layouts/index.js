import React, { Component } from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";

import "../style/fonts.css";
import "../style/index.css";
// import 'basscss/css/basscss.css';

import siteData from '../../assets/data/site.json';

class TemplateWrapper extends Component {
  render() {
    const { children } = this.props;
    const schemaOrgJSONLD = {
      "@context": "http://schema.org",
      "@type": "WebSite",
      url: siteData.url,
      name: siteData.title,
      sameAs: [
        "https://www.instagram.com/ida_degreeshow18/"
      ]
    };
    const title = siteData.title;
    const description = siteData.description;
    const image = require('../imgs/icon.png')
    return (
      <div>
        <noscript>Your browser does not support JavaScript!</noscript>
        <Helmet
          htmlAttributes={{
            lang: "en"
          }}
          title={title}
          meta={[
            { name: "description", content: description },
            {
              name: "keywords",
              content:
                "ida, liminal, liminal show, interaction design arts, BA exhibition"
            }
          ]}
        >
          <meta name="Description" content={description} />
          <meta name="description" content={description} />
          <meta property="og:url" content="https://liminal2018.com" />
          <meta property="og:title" content={title} />
          <meta property="og:site_name" content={title} />
          <meta property="og:description" content={description} />
          <meta property="og:image" content={image} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:creator" content="@dmbeaven" />
          <meta name="twitter:title" content={title} />
          <meta name="twitter:description" content={description} />
          <meta name="twitter:image" content={image} />
          <script type="application/ld+json">
            {JSON.stringify(schemaOrgJSONLD)}
          </script>
          <link href="https://unpkg.com/basscss@8.0.2/css/basscss.min.css" rel="stylesheet" />
        </Helmet>
        {children()}
      </div>
    );
  }
}
TemplateWrapper.propTypes = {
  children: PropTypes.func
};

export default TemplateWrapper;
