import React, { Component } from "react";

import Circle from "../../utils/Circle";
import Dot from "../../utils/Dot";
import Vector from "../../utils/Vector";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.settings = {
      lineThreshold: props.lineThreshold,
      radius: 5,
      colorArray: ["#404040", "#eef2f5"]
    };
    this.mouse = { x: 0, y: 0 }

    this.circleArray = [];
    this.initCanvas = this.initCanvas.bind(this);
    this.animateCanvas = this.animateCanvas.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
  }
  componentWillUnmount() {
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.cancelAnimationFrame(this.animateCanvas);
  }
  componentDidMount() {
    window.addEventListener('mousemove', this.handleMouseMove)
    const canvas = document.getElementById("homebackground");
    const context = canvas.getContext("2d");

    const devicePixelRatio = window.devicePixelRatio || 1;
    const backingStoreRatio = context.webkitBackingStorePixelRatio ||
                        context.mozBackingStorePixelRatio ||
                        context.msBackingStorePixelRatio ||
                        context.oBackingStorePixelRatio ||
                        context.backingStorePixelRatio || 1;

    const ratio = devicePixelRatio / backingStoreRatio;
    context.scale(3, 3);
    var oldWidth = window.innerWidth;
    var oldHeight = window.innerHeight;

    canvas.width = oldWidth * ratio;
    canvas.height = oldHeight * ratio;

    canvas.style.width = oldWidth + 'px';
    canvas.style.height = oldHeight + 'px';

    // now scale the context to counter
    // the fact that we've manually scaled
    // our canvas element
    context.scale(ratio, ratio);

    const { maxRadius, minRadius } = this.settings;
    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      this.initCanvas(context);
    });
    this.initCanvas(context);
    this.animateCanvas(context);
  }
  initCanvas(context) {
    const { colorArray } = this.settings;
    const { projects, margin, width, height } = this.props;

    this.pointsArray = projects.map(project => new Dot({
          x: margin / 2 + (innerWidth - margin) * project.coordinates.x,
          y: margin / 2 + (innerHeight - margin) * project.coordinates.y
        },
        this.settings.radius,
        project
      )
    );

    this.animateCanvas = this.animateCanvas.bind(this, context);
  }
  animateCanvas(context) {
    requestAnimationFrame(this.animateCanvas);
    context.clearRect(0, 0, innerWidth, innerHeight);

    let selected = null;
    
    this.pointsArray.forEach(point1 => {
      point1.update(this.mouse);
      point1.display(context, this.active ? true : false);

      if (point1.dist < this.settings.radius) {
        // point1.changeSize(this.settings.radius * 2.5)
        selected = point1.data.slug; 
      } else { 
         // point1.changeSize(this.settings.radius) 
      }

      this.pointsArray.forEach(point2 => {
        if ((point1.pos.x === point2.pos.x) && (point1.pos.y === point2.pos.y)) return;
        if (Vector.create(point1.pos.x - point2.pos.x, point1.pos.y - point2.pos.y).length() < this.settings.lineThreshold) {

          context.beginPath();
          context.moveTo(point1.pos.x, point1.pos.y);
          context.lineTo(point2.pos.x, point2.pos.y);
          context.lineWidth = .1;
          context.strokeStyle = this.active ? 'white' : 'black';
          context.stroke();
          context.closePath();
        }
      })
    })

    this.active = selected;
    this.props.onSelect(selected);
  }
  render() {
    return (
      <section id="home" style={{ pointerEvents: 'none' }}>
        <canvas className="absolute topleft" id="homebackground" />
      </section>
    );
  }
  handleMouseMove(e) {
    this.mouse = { x: e.clientX, y: e.clientY + document.documentElement.scrollTop || document.body.scrollTop };
  }
}
