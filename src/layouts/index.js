import React, { Component } from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";

import 'basscss/css/basscss.css';
import "../style/fonts.css";
import "../style/index.css";

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
    const description = siteData.description
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
                "riccardo, canella, riccardocanella, riccardo canella, on the road developer"
            }
          ]}
        >
          <meta name="Description" content={description} />
          <meta name="description" content={description} />
          <meta property="og:url" content="https://canellariccardo.it" />
          <meta property="og:title" content={title} />
          <meta property="og:site_name" content={title} />
          <meta property="og:description" content={description} />
          {/* <meta property="og:image" content={image} /> */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:creator" content="@ricanella92" />
          <meta name="twitter:title" content={title} />
          <meta name="twitter:description" content={description} />
          {/* <meta name="twitter:image" content={image} /> */}
          <script type="application/ld+json">
            {JSON.stringify(schemaOrgJSONLD)}
          </script>
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
