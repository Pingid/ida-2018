import React, { Component } from "react";
import styled from 'styled-components';
import MobileDetect from 'mobile-detect';

import Diagram from "../components/Diagram";
import Axis from "../components/Axis";
import HoverGIF from "../components/HoverGIF";
import Home from "../components/Home";
import Logo from "../components/Logo";
import Mobile from "../components/Mobile";

const DiagramWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  transition: .2s height;
  overflow: hidden;
`;

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMobile: this.mobileCheck(),
      selected: null,
    };

    this.handleSelect = this.handleSelect.bind(this);
    // this.handleScroll = this.handleScroll.bind(this);
  }

  mobileCheck() {
    // var md = new MobileDetect(window.navigator.userAgent);
    // console.log(md)
  }

  componentDidMount() {
    // const { isMobile } = this.state;
    // if (window) {
    //   const _height = window.innerHeight;
    //   window.addEventListener("resize", () => {
    //     this.setState({
    //       isMobile: this.mobileCheck()
    //     });
    //   });
    // }
  }

  render() {
    const { isMobile, selected } = this.state;
    const slideNumber = this.state.Fullpage;

    const projects = this.props.data.allDataJson.edges
      .map(x => x.node)
      .filter(x => x.coordinates);
    const selectedProject = projects.filter(x => x.slug === selected)[0] || null;
    
    const gifImages = this.props.data.gifImages.edges
      .map(x => x.node.childImageSharp)
      .filter(x => x);
    const selectedGifImage = gifImages.filter(x => new RegExp(selected).test(x.resolutions.src))[0] || null;

    const gifs = this.props.data.gifs.edges
      .map(x => x.node.base);
    const selectedGif = gifs.filter(x => new RegExp(selected).test(x))[0] || null;


    const innerWidth = typeof window === "undefined" ? 0 : window.innerWidth;
    const innerHeight = typeof window === "undefined" ? 0 : window.innerHeight;


    // console.log(selected, selectedGifImage, selectedGif)
    return (
      <div>
        <div className="hide-md">
          <DiagramWrapper closed={false}>
            <HoverGIF selected={selected} gif={selectedGif} preload={selectedGifImage} />
            <Axis 
              left={selected ? selectedProject.yourName.split(' ')[0] : 'Fiction'}
              top={selected ? selectedProject.projectName : 'Outcome-led'}
              right={selected ? selectedProject.yourName.split(' ')[1] : 'Reality'}
              bottom={selected ? selectedProject['projectType/materials'] : 'Process-led'}/>
            <Diagram
              margin={200}
              width={innerWidth}
              height={innerHeight}
              lineThreshold={innerWidth / 4}
              projects={projects}
              isMobile={isMobile}
              onSelect={this.handleSelect} />
          </DiagramWrapper>
          <Home projects={projects} />
        </div>
        <div className="show-md">
          <Mobile projects={projects} />
        </div>
      </div>
    );
  }
  handleSelect(slug) {
    const { selected } = this.state;
    if (slug !== selected) return this.setState({ selected: slug });
    return;
  }
}

export const pageQuery = graphql`
  query IndexQueryAndGifImages {
    gifs: allFile(filter: { relativeDirectory: { eq: "optimised" } }) {
      edges {
        node {
          base
        }
      }
    }
    gifImages: allFile(filter: { relativeDirectory: { eq: "gif-pic" } }) {
      edges {
        node {
          childImageSharp {
            ... on ImageSharp {
              resolutions(width: 200) {
                base64
                aspectRatio
                width
                height
                src
                srcSet
              }
            }
          }
        }
      }
    }
    allDataJson {
      edges {
        node {
          slug
          coordinates {
            x
            y
          }
          yourName
          hasGif
          projectName
        }
      }
    }
  }
`;
