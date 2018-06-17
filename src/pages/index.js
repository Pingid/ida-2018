import React, { Component } from "react";

import Diagram from "../components/Diagram";
import Axis from "../components/Axis";
import HoverGIF from "../components/HoverGIF";
import Home from "../components/Home";

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMobile: this.mobileCheck(),
      selected: null,
    };

    this.handleSelect = this.handleSelect.bind(this);
  }

  mobileCheck() {
    if (typeof window === "undefined" || !window) return false;
    if (typeof navigator === "undefined" || !navigator) return false;
    let check = false;
    (function(a) {
      if (
        /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
          a
        ) ||
        /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
          a.substr(0, 4)
        )
      )
        check = true;
    })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
  }

  componentDidMount() {
    const { isMobile } = this.state;
    if (window) {
      const _height = window.innerHeight;
      window.addEventListener("resize", () => {
        this.setState({
          isMobile: this.mobileCheck()
        });
      });
    }
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
        <div className="w100 h100" style={{ background: 'white' }}>
          { (selected && selectedGifImage && selectedGif) ? <HoverGIF selected={selected} gif={selectedGif} preload={selectedGifImage} /> : null }
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
        </div>
        <Home projects={projects} />
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
