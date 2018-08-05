paper.install(window);
paper.setup(document.getElementById('canvas-1'));
var mousePoint = view.center;
var amount = 25;
var colors = ['red', 'white', 'blue', 'white'];

for (var i = 0; i < amount; i++) {
    var rect = new Rectangle([0, 0], [25, 25]);
    rect.center = mousePoint;
    var path = new Path.Rectangle(rect, 6);
    path.fillColor = colors[i % 4];
    var scale = (1 - i / amount) * 20;
    path.scale(scale);
}

function onMouseMove(event) {
    if(event.event.which === 1) {
        mousePoint = event.point;
    }
}

var children = project.activeLayer.children;
function onFrame(event) {
    for (var i = 0, l = children.length; i < l; i++) {
        var item = children[i];
        var delta = (mousePoint.subtract(item.position)).divide(i + 5);
        item.rotate(Math.sin((event.count + i) / 10) * 7);
        if (delta.length > 0.1)
            item.position = item.position.add(delta);
    }
}

view.onMouseMove = onMouseMove;
view.onMouseDown = onMouseMove;
view.onFrame = onFrame;
