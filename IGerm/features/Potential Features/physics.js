window.addEventListener('DOMContentLoaded', (event) => {
    var Engine = Matter.Engine,
        Render = Matter.Render,
        World = Matter.World,
        Bodies = Matter.Bodies,
        Mouse = Matter.Mouse,
        MouseConstraint = Matter.MouseConstraint;

    var engine = Engine.create(),
        world = engine.world;

    var width = document.getElementById('world').offsetWidth;
    var height = Math.min(document.documentElement.clientHeight, 500);

    var render = Render.create({
        element: document.getElementById('world'),
        engine: engine,
        options: {
            width: width,
            height: height,
            wireframes: false,
            background: 'white' 
        }
    });

    var ball = Bodies.circle(width / 2, height / 2, 20, {
        density: 0.04,
        frictionAir: 0.01,
        restitution: 0.8,
        friction: 0.01,
        render: { fillStyle: 'blue' }
    });

    var floor = Bodies.rectangle(width / 2, height + 490, width+1000, 1000, { 
        isStatic: true,
        render: { fillStyle: 'black' } 
    });

    var wallLeft = Bodies.rectangle(-490, height / 2, 1000, height, {
        isStatic: true,
        render: { fillStyle: 'black' }
    });

    var wallRight = Bodies.rectangle(width+490, height / 2, 1000, height, {
        isStatic: true,
        render: { fillStyle: 'black' }
    });

    var ceiling = Bodies.rectangle(width / 2, -990, width+1000, 2000, {
        isStatic: true,
        render: { fillStyle: 'black' }
    });

    var mouse = Mouse.create(render.canvas),
        mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                    visible: false
                }
            }
        });

    World.add(world, [ball, floor, wallLeft, wallRight, ceiling, mouseConstraint]);
    Engine.run(engine);
    Render.run(render);

    window.addEventListener('resize', function(event) {
        var width = document.getElementById('world').offsetWidth;
        var height = Math.min(document.documentElement.clientHeight, 500);

        render.canvas.width = width;
        render.canvas.height = height;
        render.options.width = width;
        render.options.height = height;

        Matter.Body.setPosition(floor, { x: width / 2, y: height + 490 });
        Matter.Body.setPosition(wallRight, { x: width+490 , y: height / 2 });
        Matter.Body.setPosition(ceiling, { x: width / 2, y: -990 });
    });
});
