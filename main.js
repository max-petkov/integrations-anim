gsap.registerPlugin(MotionPathPlugin);

function IntegrationAnimation() {
    this.tl = gsap.timeline();
    this.svg = document.querySelector(".circles-integration");
    this.icons = document.querySelectorAll(".icons-integration [data-icon]");
    this.circleOne = this.svg.querySelector(".circle-1");
    this.circleTwo = this.svg.querySelector(".circle-2");
    this.circleThree = this.svg.querySelector(".circle-3");
    this.iconsCircleOne = [this.icons[0], this.icons[1], this.icons[2]];
    this.iconsCircleTwo = [this.icons[3], this.icons[4], this.icons[5]];
    this.iconsCircleThree = [this.icons[6], this.icons[7]];
}

IntegrationAnimation.prototype.animate = function() {
    this.tl
    .add(this.animateCircles({
        circle: this.circleOne,
        icons: this.iconsCircleOne,
        start: function(i) {
            if(!i) return 0.4
            else if(i === 1) return 0.1
            else return 0.9;
        },
        end: function(i) {
            if(!i) return 1.4
            else if(i === 1) return 1.2
            else return 1.9;
        },
    }), 0)
    .add(this.animateCircles({
        circle: this.circleTwo,
        icons: this.iconsCircleTwo,
        start: function(i) {
            if(!i) return 1.6
            else if(i === 1) return 1.8;
            else return 1.25;
        },
        end: function(i) {
            if(!i) return 0.6
            else if(i === 1) return 0.8
            else return 0.25;
        },
    }), 0)
    .add(this.animateCircles({
        circle: this.circleThree,
        icons: this.iconsCircleThree,
        start: function(i) {
            if(!i) return 0
            else return 0.5;
        },
        end: function(i) {
            if(!i) return 1
            else return 1.5;
        },
    }), 0)
}

IntegrationAnimation.prototype.animateCircles = function(config) {
    const tl = gsap.timeline({
        defaults: {
            repeat: -1, 
            ease: Power0.easeNone, 
            duration: !config.duration ? 280 : config.duration
        }
    });

    tl.to(config.icons, {
        motionPath: {
            path: config.circle,
            align: config.circle,
            alignOrigin: [0.5, 0.5],
            start: config.start,
            end: config.end,
        }
    });
    
    return tl;
}



const integration = new IntegrationAnimation();
integration.animate();
