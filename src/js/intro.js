// Background gradient
var colors = new Array(
    [255,193,7],    // amber
    [255,152,0],    // orange
    [255,87,34],    // deep orange
    [233,30,99],    // pink
    [156,39,176],   // purple
    [103,58,183],   // deep purple
    [63,81,181],    // indigo
    [13,71,161],    // dark blue
    [26,35,126]);   // dark indigo

var step = 0;
// Color table indices for: 
// Current color left
// Next color left
// Current color right
// Next color right
var colorIndices = [0,1,2,3,4,5,6,7,8];

// Transition speed
var gradientSpeed = 0.002;

function updateGradient() {
    if ( $===undefined ) return;

    var c0_0 = colors[colorIndices[0]];
    var c0_1 = colors[colorIndices[1]];
    var c1_0 = colors[colorIndices[2]];
    var c1_1 = colors[colorIndices[3]];

    var istep = 1 - step;
    var r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
    var g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
    var b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
    var color1 = "rgb("+r1+","+g1+","+b1+")";

    var r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
    var g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
    var b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
    var color2 = "rgb("+r2+","+g2+","+b2+")";

    $('body')
        //.css({background: "-webkit-gradient(linear, left top, right top, from("+color1+"), to("+color2+"))"})
        .css({background: "linear-gradient(to top right, "+color1+" 0%, "+color2+" 100%)"});

    step += gradientSpeed;
    if ( step >= 1 ) {
        step %= 1;
        colorIndices[0] = colorIndices[1];
        colorIndices[2] = colorIndices[3];

        // Pick two new target color indices
        // Do not pick the same as the current one
        colorIndices[1] = ( colorIndices[1] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
        colorIndices[3] = ( colorIndices[3] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length; 
    }
}

setInterval(updateGradient,20);
// End background gradient

// When user scrolls to the bottom of the page
$(window).scroll(function() {
    if (document.documentElement.clientHeight + $(document).scrollTop() >= document.body.offsetHeight) { 
        $('footer').css({'bottom': '1rem', 'height': 'auto'});
    }
});