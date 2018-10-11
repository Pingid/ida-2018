import React, { Component } from "react";
import styled from 'styled-components';
import classNames from 'classnames';
import MobileDetect from 'mobile-detect';

import Diagram from "../components/Diagram";
import Axis from "../components/Axis";
import HoverGIF from "../components/HoverGIF";
import Home from "../components/Home";
import Logo from "../components/Logo";
import Mobile from "../components/Mobile";
import ProjectsGrid from "../components/ProjectsGrid";

const DiagramWrapperStyles = styled.div`
  width: 100vw;
  height: 100vh;
  background: white;
  overflow: hidden;
`;

class DiagramWrapper extends Component {
  componentDidMount() {
    console.log('hello')
    this.props.mounted();
  }
  render() { return <DiagramWrapperStyles className={this.props.className}>{this.props.children}</DiagramWrapperStyles> }
}

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = { selected: null, mountedDiagram: false };

    this.handleSelect = this.handleSelect.bind(this);
  }
  render() {
    const { mountedDiagram, selected } = this.state;
    const slideNumber = this.state.Fullpage;

    const projects = this.props.data.allDataJson.edges
      .map(x => x.node)
      .filter(x => x.coordinates);
    const selectedProject = projects.filter(x => x.slug === selected)[0] || null;

    const gifImages = this.props.data.gifImages.edges
      .map(x => x.node.childImageSharp)
      .filter(x => x);

    const selectedGifImage = gifImages.filter(x => new RegExp(selected + '-\\w{10}', 'gi').test(x.resolutions.src))[0] || null;

    const gifs = this.props.data.gifs.edges
      .map(x => x.node.base);
    const selectedGif = gifs.filter(x => new RegExp(selected).test(x))[0] || null;

    const projectStills = this.props.data.projectStills.edges
      .map(x => x.node.childImageSharp)
      .filter(x => x);

    const innerWidth = typeof window === "undefined" ? 0 : window.innerWidth;
    const innerHeight = typeof window === "undefined" ? 0 : window.innerHeight;
    console.log(mountedDiagram)
    return (
      <div>
        <div className="hide-md">
          <DiagramWrapper className={classNames({ hide: !mountedDiagram, show: mountedDiagram })} mounted={() => this.setState({ mountedDiagram: true })}>
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
              onSelect={this.handleSelect} />
          </DiagramWrapper>
          <div className={classNames({ hide: !mountedDiagram, show: mountedDiagram })} style={{ zIndex: 11, margin: '0 auto', maxWidth: '50rem' }}>
            <div className="flex">
              <h1 className="c-orange m0 p2" style={{ width: '10rem' }}>Interaction Design Arts ></h1>
              <p className="border-box" style={{ paddingTop: '16rem', paddingLeft: '3rem', maxWidth: '30rem' }} >
                Interaction Design Arts is a multidisciplinary course, where students are encouraged to work across a variety of media from digital to analogue on a range of different personal and non-personal subjects. This course is perfect for those who wish to not put themselves in specific brackets as practitioners.
                <br/>
                <br/>
                It is this fluidity of IDA that the class of 2018 wishes to embrace in the show 'Liminal'. The works exhibited exist at the border of art and design, combining several introspective and extraspective voices.
              </p>

            </div>
            <h1 className="c-orange center">projects</h1>
            <h1 className="c-orange center">|</h1>
            <ProjectsGrid projects={projects} />
            <div className="my4" />
          </div>
        </div>
        <div className="show-md">
          <Mobile projects={projects} projectStills={projectStills} />
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
    projectStills: allFile(filter: { relativeDirectory: { eq: "frames" } }) {
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
